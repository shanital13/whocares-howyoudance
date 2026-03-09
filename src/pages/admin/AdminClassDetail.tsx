import { useParams } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useClasses, useRegistrations, useProfiles, usePunchCards, useAttendance, useUpsertAttendance, useCreatePayment, useCreateRegistration } from '@/hooks/use-supabase-data';
import { LEVEL_LABELS, SINGLE_PRICE, PUNCH_CARD_PRICE } from '@/lib/types';
import { useState, useCallback, useMemo } from 'react';
import { toast } from '@/hooks/use-toast';
import { Check, X, Save, Plus, UserPlus, Search, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';

const AdminClassDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: classes = [] } = useClasses();
  const { data: registrations = [] } = useRegistrations(id);
  const { data: profiles = [] } = useProfiles();
  const { data: punchCards = [] } = usePunchCards();
  const { data: attendanceData = [] } = useAttendance(id);
  const upsertAttendance = useUpsertAttendance();
  const createPayment = useCreatePayment();
  const createRegistration = useCreateRegistration();
  const queryClient = useQueryClient();

  const danceClass = classes.find((c) => c.id === id);

  const [entryTypeMap, setEntryTypeMap] = useState<Record<string, string>>({});
  const [saveIndicator, setSaveIndicator] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addMode, setAddMode] = useState<'select' | 'new'>('select');
  const [searchQuery, setSearchQuery] = useState('');
  const [newParticipant, setNewParticipant] = useState({ full_name: '', phone: '', email: '' });

  const showSaved = useCallback(() => {
    setSaveIndicator(true);
    setTimeout(() => setSaveIndicator(false), 1500);
  }, []);

  // Profiles not already registered
  const registeredUserIds = useMemo(() => new Set(registrations.map((r) => r.user_id)), [registrations]);
  const availableProfiles = useMemo(() => {
    return profiles.filter((p) => !registeredUserIds.has(p.id));
  }, [profiles, registeredUserIds]);

  const filteredProfiles = useMemo(() => {
    if (!searchQuery.trim()) return availableProfiles;
    const q = searchQuery.trim().toLowerCase();
    return availableProfiles.filter(
      (p) => p.full_name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q) || (p.phone && p.phone.includes(q))
    );
  }, [availableProfiles, searchQuery]);

  if (!danceClass) {
    return <AdminLayout><p className="text-muted-foreground font-body">שיעור לא נמצא</p></AdminLayout>;
  }

  const attendanceMap: Record<string, boolean> = {};
  attendanceData.forEach((a) => { attendanceMap[a.user_id] = a.attended; });

  const toggleAttendance = async (userId: string) => {
    const wasAttended = !!attendanceMap[userId];
    const newVal = !wasAttended;

    await upsertAttendance.mutateAsync({ user_id: userId, class_id: id!, attended: newVal });

    const registration = registrations.find((r) => r.user_id === userId);
    const currentEntryType = entryTypeMap[userId] || registration?.entry_type || 'single';
    const activePunchCard = punchCards.find((pc) => pc.user_id === userId && pc.is_active);

    if (currentEntryType === 'punch_card' && activePunchCard) {
      const diff = newVal ? -1 : 1;
      const nextEntries = Math.max(activePunchCard.entries_remaining + diff, 0);

      const { error: punchCardErr } = await supabase
        .from('punch_cards')
        .update({
          entries_remaining: nextEntries,
          is_active: nextEntries > 0,
        })
        .eq('id', activePunchCard.id);

      if (punchCardErr) {
        toast({ title: 'שגיאה', description: 'לא ניתן לעדכן ניקובים בכרטיסיה', variant: 'destructive' });
      } else {
        queryClient.invalidateQueries({ queryKey: ['punch_cards'] });
        toast({
          title: newVal ? 'ניקוב כרטיסיה' : 'הוחזר ניקוב',
          description: `נשארו ${nextEntries} כניסות`,
        });
      }
    }

    showSaved();
  };

  const markPayment = async (userId: string, amount: string) => {
    if (amount === 'existing_card') {
      setEntryTypeMap((prev) => ({ ...prev, [userId]: 'punch_card' }));
      toast({ title: 'כרטיסיה קיימת', description: 'הלקוחה תסומן ככרטיסיה קיימת ללא חיוב נוסף' });
      showSaved();
      return;
    }

    const amountNum = parseInt(amount, 10);
    const isPunchCard = amountNum === PUNCH_CARD_PRICE;
    const existingActiveCard = punchCards.find((pc) => pc.user_id === userId && pc.is_active && pc.entries_remaining > 0);

    if (isPunchCard && existingActiveCard) {
      setEntryTypeMap((prev) => ({ ...prev, [userId]: 'punch_card' }));
      toast({ title: 'כרטיסיה כבר קיימת', description: 'אי אפשר לחייב כרטיסיה נוספת לפני שהקיימת מסתיימת' });
      showSaved();
      return;
    }

    await createPayment.mutateAsync({
      user_id: userId,
      amount: amountNum,
      payment_type: isPunchCard ? 'punch_card' : 'single',
      class_id: id,
    });

    if (isPunchCard) {
      await supabase.from('punch_cards').insert({
        user_id: userId,
        entries_remaining: 4,
        is_active: true,
      });
      setEntryTypeMap((prev) => ({ ...prev, [userId]: 'punch_card' }));
      queryClient.invalidateQueries({ queryKey: ['punch_cards'] });
    }

    showSaved();
  };

  const changeEntryType = (userId: string, type: string) => {
    setEntryTypeMap((prev) => ({ ...prev, [userId]: type }));
    showSaved();
  };

  const handleDeleteRegistration = async (regId: string, name: string) => {
    if (!confirm(`למחוק את ${name} מהשיעור?`)) return;
    try {
      const { error } = await supabase.from('registrations').delete().eq('id', regId);
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ['registrations'] });
      toast({ title: 'נמחקה', description: `${name} הוסרה מהשיעור` });
    } catch (err: any) {
      toast({ title: 'שגיאה', description: err?.message || 'לא ניתן למחוק', variant: 'destructive' });
    }
  };

  const handleAddExisting = async (userId: string) => {
    try {
      await createRegistration.mutateAsync({ user_id: userId, class_id: id!, entry_type: 'single' });
      toast({ title: 'נוספה בהצלחה', description: 'המשתתפת נוספה לשיעור' });
      setAddDialogOpen(false);
      setSearchQuery('');
    } catch (err: any) {
      toast({ title: 'שגיאה', description: err?.message || 'לא ניתן להוסיף', variant: 'destructive' });
    }
  };

  const handleAddNew = async () => {
    const { full_name, phone, email } = newParticipant;
    if (!full_name.trim() || !email.trim()) {
      toast({ title: 'שגיאה', description: 'נא למלא שם ומייל', variant: 'destructive' });
      return;
    }

    try {
      // Create profile directly
      const newId = crypto.randomUUID();
      const { error: profileError } = await supabase.from('profiles').insert({
        id: newId,
        full_name: full_name.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
      });
      if (profileError) throw profileError;

      // Register to class
      await createRegistration.mutateAsync({ user_id: newId, class_id: id!, entry_type: 'single' });
      queryClient.invalidateQueries({ queryKey: ['profiles'] });

      toast({ title: 'נוספה בהצלחה', description: `${full_name.trim()} נוספה לשיעור` });
      setAddDialogOpen(false);
      setNewParticipant({ full_name: '', phone: '', email: '' });
    } catch (err: any) {
      toast({ title: 'שגיאה', description: err?.message || 'לא ניתן להוסיף', variant: 'destructive' });
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="font-nehama text-[28px] md:text-[32px] text-foreground">{danceClass.name}</h1>
              <Badge variant="outline" className="font-body">{LEVEL_LABELS[danceClass.level] || danceClass.level}</Badge>
            </div>
            <p className="text-muted-foreground text-sm font-body">
              {new Date(danceClass.date).toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long' })}
              {' '} | {danceClass.time.slice(0, 5)} | {danceClass.location}
            </p>
          </div>
          <Button onClick={() => { setAddDialogOpen(true); setAddMode('select'); setSearchQuery(''); }} size="sm" className="rounded-[10px] bg-primary hover:bg-primary/90 font-body">
            <Plus className="h-4 w-4 ml-1" />
            הוספת משתתפת
          </Button>
        </div>
        <div className={`mt-2 flex items-center gap-1.5 text-xs font-body transition-opacity duration-300 ${saveIndicator ? 'opacity-100' : 'opacity-0'}`}>
          <Save className="h-3.5 w-3.5 text-success" strokeWidth={2} />
          <span className="text-success font-medium">נשמר אוטומטית</span>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        <p className="text-sm font-body font-medium text-muted-foreground">נרשמות ({registrations.length})</p>
        {registrations.map((reg) => {
          const profile = profiles.find((p) => p.id === reg.user_id);
          const currentEntryType = entryTypeMap[reg.user_id] || reg.entry_type;
          const punchCard = punchCards.find((pc) => pc.user_id === reg.user_id && pc.is_active && pc.entries_remaining > 0);
          const hasPunchCard = !!punchCard;
          const attended = attendanceMap[reg.user_id] || false;

          return (
            <Card key={reg.id} className="rounded-xl border-border/60 shadow-[0_6px_16px_rgba(0,0,0,0.05)]">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-body font-semibold text-foreground">{profile?.full_name || '—'}</p>
                    <p className="text-xs font-body text-muted-foreground">{profile?.phone || '—'}</p>
                  </div>
                   <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleAttendance(reg.user_id)}
                        className={`flex items-center justify-center w-8 h-8 rounded-[10px] border-2 transition-colors ${
                          attended
                            ? 'bg-primary border-primary text-primary-foreground'
                            : 'bg-background border-border hover:border-muted-foreground/50'
                        }`}
                      >
                        {attended ? <Check className="h-4 w-4" /> : <X className="h-4 w-4 text-muted-foreground/30" />}
                      </button>
                      <button
                        onClick={() => handleDeleteRegistration(reg.id, profile?.full_name || '—')}
                        className="flex items-center justify-center w-8 h-8 rounded-[10px] border-2 border-border hover:border-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                </div>
                <div className="flex gap-2">
                  <Select value={currentEntryType} onValueChange={(v) => changeEntryType(reg.user_id, v)}>
                    <SelectTrigger className="flex-1 h-9 text-xs rounded-[10px] border-border/60 font-body">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="punch_card" className="font-body">כרטיסיה</SelectItem>
                      <SelectItem value="single" className="font-body">חד-פעמי</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex-1 space-y-1">
                    {hasPunchCard && (
                      <Badge className="bg-success text-success-foreground shrink-0 font-body w-full justify-center">
                        כרטיסיה קיימת ({punchCard.entries_remaining} כניסות)
                      </Badge>
                    )}
                    <Select onValueChange={(v) => markPayment(reg.user_id, v)}>
                      <SelectTrigger className="flex-1 h-9 text-xs rounded-[10px] border-border/60 font-body w-full">
                        <SelectValue placeholder="תשלום" />
                      </SelectTrigger>
                      <SelectContent>
                        {hasPunchCard && <SelectItem value="existing_card" className="font-body">כרטיסיה קיימת</SelectItem>}
                        <SelectItem value={SINGLE_PRICE.toString()} className="font-body">{SINGLE_PRICE} ₪</SelectItem>
                        {!hasPunchCard && <SelectItem value={PUNCH_CARD_PRICE.toString()} className="font-body">{PUNCH_CARD_PRICE} ₪</SelectItem>}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {registrations.length === 0 && (
          <p className="text-center text-muted-foreground py-8 font-body">אין נרשמות לשיעור זה עדיין</p>
        )}
      </div>

      {/* Desktop table */}
      <Card className="hidden md:block rounded-xl border-border/60 shadow-[0_6px_16px_rgba(0,0,0,0.05)]">
        <CardHeader>
          <CardTitle className="font-nehama text-[22px]">נרשמות לשיעור ({registrations.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-[hsl(0,0%,95%)] hover:bg-[hsl(0,0%,95%)]">
                <TableHead className="text-right font-body w-[22%]">שם</TableHead>
                <TableHead className="text-right font-body w-[16%]">סוג כניסה</TableHead>
                <TableHead className="text-right font-body w-[16%]">כרטיסיה פעילה</TableHead>
                <TableHead className="text-center font-body w-[10%]">השתתפה</TableHead>
                <TableHead className="text-right font-body w-[22%]">תשלום</TableHead>
                <TableHead className="text-center font-body w-[8%]">פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrations.map((reg) => {
                const profile = profiles.find((p) => p.id === reg.user_id);
                const currentEntryType = entryTypeMap[reg.user_id] || reg.entry_type;
                const punchCard = punchCards.find((pc) => pc.user_id === reg.user_id && pc.is_active && pc.entries_remaining > 0);
                const hasPunchCard = !!punchCard;
                const attended = attendanceMap[reg.user_id] || false;

                return (
                  <TableRow key={reg.id} className="align-middle hover:bg-[hsl(0,0%,97%)] transition-colors">
                    <TableCell className="align-middle">
                      <div>
                        <p className="font-body font-medium text-foreground">{profile?.full_name || '—'}</p>
                        <p className="text-xs font-body text-muted-foreground">{profile?.phone || '—'}</p>
                      </div>
                    </TableCell>
                    <TableCell className="align-middle">
                      <Select value={currentEntryType} onValueChange={(v) => changeEntryType(reg.user_id, v)}>
                        <SelectTrigger className="w-32 h-9 rounded-[10px] border-border/60 font-body"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="punch_card" className="font-body">כרטיסיה</SelectItem>
                          <SelectItem value="single" className="font-body">חד-פעמי</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="align-middle">
                      {hasPunchCard ? (
                        <Badge className="bg-success text-success-foreground font-body">פעילה ({punchCard.entries_remaining} כניסות)</Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground font-body">אין</Badge>
                      )}
                    </TableCell>
                    <TableCell className="align-middle text-center">
                      <button
                        onClick={() => toggleAttendance(reg.user_id)}
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-lg border-2 transition-colors ${
                          attended
                            ? 'bg-primary border-primary text-primary-foreground'
                            : 'bg-background border-border text-transparent hover:border-muted-foreground/50'
                        }`}
                      >
                        {attended ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                      </button>
                    </TableCell>
                    <TableCell className="align-middle">
                      <Select onValueChange={(v) => markPayment(reg.user_id, v)}>
                        <SelectTrigger className="w-44 h-9 rounded-[10px] border-border/60 font-body"><SelectValue placeholder="סמן תשלום" /></SelectTrigger>
                        <SelectContent>
                          {hasPunchCard && <SelectItem value="existing_card" className="font-body">כרטיסיה קיימת ({punchCard.entries_remaining} כניסות)</SelectItem>}
                          <SelectItem value={SINGLE_PRICE.toString()} className="font-body">{SINGLE_PRICE} ₪ (חד-פעמי)</SelectItem>
                          {!hasPunchCard && <SelectItem value={PUNCH_CARD_PRICE.toString()} className="font-body">{PUNCH_CARD_PRICE} ₪ (כרטיסיה)</SelectItem>}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="align-middle text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDeleteRegistration(reg.id, profile?.full_name || '—')}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" strokeWidth={1.8} />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {registrations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8 font-body">
                    אין נרשמות לשיעור זה עדיין
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Participant Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="w-[95vw] max-w-lg rounded-xl">
          <DialogHeader>
            <DialogTitle className="font-nehama text-[22px]">הוספת משתתפת</DialogTitle>
          </DialogHeader>

          {/* Mode tabs */}
          <div className="flex gap-2 mb-4">
            <Button
              variant={addMode === 'select' ? 'default' : 'outline'}
              size="sm"
              className="flex-1 rounded-[10px] font-body"
              onClick={() => setAddMode('select')}
            >
              <Search className="h-4 w-4 ml-1" strokeWidth={1.8} />
              בחירה מרשימה
            </Button>
            <Button
              variant={addMode === 'new' ? 'default' : 'outline'}
              size="sm"
              className="flex-1 rounded-[10px] font-body"
              onClick={() => setAddMode('new')}
            >
              <UserPlus className="h-4 w-4 ml-1" strokeWidth={1.8} />
              משתתפת חדשה
            </Button>
          </div>

          {addMode === 'select' ? (
            <div className="space-y-3">
              <Input
                placeholder="חיפוש לפי שם, מייל או טלפון..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 rounded-[10px] border-border/60 focus:border-primary font-body"
              />
              <div className="max-h-[300px] overflow-y-auto space-y-2">
                {filteredProfiles.length > 0 ? (
                  filteredProfiles.map((profile) => (
                    <button
                      key={profile.id}
                      onClick={() => handleAddExisting(profile.id)}
                      className="w-full flex items-center justify-between p-3 rounded-[10px] border border-border/60 bg-background hover:bg-muted/50 transition-colors text-right"
                    >
                      <div>
                        <p className="font-body font-medium text-foreground text-sm">{profile.full_name}</p>
                        <p className="font-body text-xs text-muted-foreground">
                          {profile.phone || profile.email}
                        </p>
                      </div>
                      <Plus className="h-4 w-4 text-primary shrink-0" strokeWidth={2} />
                    </button>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground font-body text-sm py-6">
                    {searchQuery ? 'לא נמצאו תוצאות' : 'אין לקוחות זמינים'}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label className="font-body text-sm">שם מלא *</Label>
                <Input
                  value={newParticipant.full_name}
                  onChange={(e) => setNewParticipant({ ...newParticipant, full_name: e.target.value })}
                  className="h-11 rounded-[10px] border-border/60 focus:border-primary font-body"
                  maxLength={100}
                />
              </div>
              <div>
                <Label className="font-body text-sm">מייל *</Label>
                <Input
                  type="email"
                  value={newParticipant.email}
                  onChange={(e) => setNewParticipant({ ...newParticipant, email: e.target.value })}
                  className="h-11 rounded-[10px] border-border/60 focus:border-primary font-body"
                  dir="ltr"
                  maxLength={255}
                />
              </div>
              <div>
                <Label className="font-body text-sm">טלפון</Label>
                <Input
                  type="tel"
                  value={newParticipant.phone}
                  onChange={(e) => setNewParticipant({ ...newParticipant, phone: e.target.value })}
                  className="h-11 rounded-[10px] border-border/60 focus:border-primary font-body"
                  dir="ltr"
                  maxLength={15}
                />
              </div>
              <Button
                className="w-full h-10 rounded-[10px] bg-primary hover:bg-primary/90 font-body font-medium"
                onClick={handleAddNew}
              >
                הוספה לשיעור
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminClassDetail;
