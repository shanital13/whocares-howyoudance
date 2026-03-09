import { useParams } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useClasses, useRegistrations, useProfiles, usePunchCards, useAttendance, useUpsertAttendance, useCreatePayment } from '@/hooks/use-supabase-data';
import { LEVEL_LABELS, SINGLE_PRICE, PUNCH_CARD_PRICE } from '@/lib/types';
import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { Check, X, Save } from 'lucide-react';

const AdminClassDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: classes = [] } = useClasses();
  const { data: registrations = [] } = useRegistrations(id);
  const { data: profiles = [] } = useProfiles();
  const { data: punchCards = [] } = usePunchCards();
  const { data: attendanceData = [] } = useAttendance(id);
  const upsertAttendance = useUpsertAttendance();
  const createPayment = useCreatePayment();

  const danceClass = classes.find((c) => c.id === id);

  const [entryTypeMap, setEntryTypeMap] = useState<Record<string, string>>({});
  const [saveIndicator, setSaveIndicator] = useState(false);

  const showSaved = useCallback(() => {
    setSaveIndicator(true);
    setTimeout(() => setSaveIndicator(false), 1500);
  }, []);

  if (!danceClass) {
    return <AdminLayout><p className="text-muted-foreground font-body">שיעור לא נמצא</p></AdminLayout>;
  }

  const attendanceMap: Record<string, boolean> = {};
  attendanceData.forEach((a) => { attendanceMap[a.user_id] = a.attended; });

  const toggleAttendance = async (userId: string) => {
    const newVal = !attendanceMap[userId];
    await upsertAttendance.mutateAsync({ user_id: userId, class_id: id!, attended: newVal });
    const punchCard = punchCards.find((pc) => pc.user_id === userId && pc.is_active && pc.entries_remaining > 0);
    if (newVal && punchCard) {
      toast({ title: 'ניקוב כרטיסיה', description: `נשארו ${punchCard.entries_remaining - 1} כניסות` });
    }
    showSaved();
  };

  const markPayment = async (userId: string, amount: string) => {
    const amountNum = parseInt(amount);
    await createPayment.mutateAsync({
      user_id: userId,
      amount: amountNum,
      payment_type: amountNum === PUNCH_CARD_PRICE ? 'punch_card' : 'single',
      class_id: id,
    });
    showSaved();
  };

  const changeEntryType = (userId: string, type: string) => {
    setEntryTypeMap((prev) => ({ ...prev, [userId]: type }));
    showSaved();
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="font-nehama text-[28px] md:text-[32px] text-foreground">{danceClass.name}</h1>
          <Badge variant="outline" className="font-body">{LEVEL_LABELS[danceClass.level] || danceClass.level}</Badge>
        </div>
        <p className="text-muted-foreground text-sm font-body">
          {new Date(danceClass.date).toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long' })}
          {' '} | {danceClass.time} | {danceClass.location}
        </p>
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
                  {hasPunchCard ? (
                    <Badge className="bg-success text-success-foreground shrink-0 font-body">
                      {punchCard.entries_remaining} כניסות
                    </Badge>
                  ) : (
                    <Select onValueChange={(v) => markPayment(reg.user_id, v)}>
                      <SelectTrigger className="flex-1 h-9 text-xs rounded-[10px] border-border/60 font-body">
                        <SelectValue placeholder="תשלום" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={SINGLE_PRICE.toString()} className="font-body">{SINGLE_PRICE} ₪</SelectItem>
                        <SelectItem value={PUNCH_CARD_PRICE.toString()} className="font-body">{PUNCH_CARD_PRICE} ₪</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
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
                <TableHead className="text-right font-body">שם</TableHead>
                <TableHead className="text-right font-body">סוג כניסה</TableHead>
                <TableHead className="text-right font-body">כרטיסיה פעילה</TableHead>
                <TableHead className="text-center font-body">השתתפה</TableHead>
                <TableHead className="text-right font-body">תשלום</TableHead>
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
                      {hasPunchCard && currentEntryType === 'punch_card' ? (
                        <span className="text-sm text-success font-body font-medium">כרטיסיה פעילה ✓</span>
                      ) : (
                        <Select onValueChange={(v) => markPayment(reg.user_id, v)}>
                          <SelectTrigger className="w-40 h-9 rounded-[10px] border-border/60 font-body"><SelectValue placeholder="סמן תשלום" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value={SINGLE_PRICE.toString()} className="font-body">{SINGLE_PRICE} ₪ (חד-פעמי)</SelectItem>
                            <SelectItem value={PUNCH_CARD_PRICE.toString()} className="font-body">{PUNCH_CARD_PRICE} ₪ (כרטיסיה)</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              {registrations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8 font-body">
                    אין נרשמות לשיעור זה עדיין
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminClassDetail;
