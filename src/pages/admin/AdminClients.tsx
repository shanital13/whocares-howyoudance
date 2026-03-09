import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { useProfiles, usePunchCards, usePayments, useClasses, useRegistrations } from '@/hooks/use-supabase-data';
import { ChevronLeft, Search, Pencil, Minus, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

const AdminClients = () => {
  const { data: profiles = [], isLoading } = useProfiles();
  const { data: punchCards = [] } = usePunchCards();
  const { data: payments = [] } = usePayments();
  const { data: allRegistrations = [] } = useRegistrations();
  const { data: classes = [] } = useClasses();
  const queryClient = useQueryClient();

  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editPunchCardId, setEditPunchCardId] = useState<string | null>(null);
  const [editEntries, setEditEntries] = useState<number>(0);
  const [saving, setSaving] = useState(false);

  const filteredProfiles = profiles.filter((profile) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      profile.full_name.toLowerCase().includes(query) ||
      (profile.phone && profile.phone.includes(query))
    );
  });

  const selectedClient = profiles.find((p) => p.id === selectedClientId);
  const clientRegistrations = allRegistrations.filter((r) => r.user_id === selectedClientId);
  const registeredClasses = clientRegistrations.map((r) => {
    const danceClass = classes.find((c) => c.id === r.class_id);
    return { ...r, class: danceClass };
  });

  const openEditPunchCard = (cardId: string, current: number) => {
    setEditPunchCardId(cardId);
    setEditEntries(current);
  };

  const savePunchCardEntries = async () => {
    if (!editPunchCardId) return;
    setSaving(true);
    const { error } = await supabase
      .from('punch_cards')
      .update({ entries_remaining: editEntries, is_active: editEntries > 0 })
      .eq('id', editPunchCardId);
    setSaving(false);
    if (error) {
      toast({ title: 'שגיאה', description: 'לא ניתן לעדכן ניקובים', variant: 'destructive' });
    } else {
      queryClient.invalidateQueries({ queryKey: ['punch_cards'] });
      toast({ title: 'עודכן בהצלחה', description: `נשארו ${editEntries} כניסות` });
      setEditPunchCardId(null);
    }
  };

  if (isLoading) {
    return <AdminLayout><p className="text-muted-foreground font-body text-center py-8">טוען לקוחות...</p></AdminLayout>;
  }

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="font-nehama text-[28px] md:text-[32px] text-foreground">מאגר לקוחות</h1>
        <div className="relative w-full sm:w-72">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
          <Input
            placeholder="חיפוש לפי שם או טלפון..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 h-11 rounded-[10px] border-border/60 focus:border-primary font-body"
          />
        </div>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filteredProfiles.length === 0 && (
          <p className="text-center text-muted-foreground py-8 font-body">לא נמצאו לקוחות</p>
        )}
        {filteredProfiles.map((profile) => {
          const punchCard = punchCards.find(
            (pc) => pc.user_id === profile.id && pc.is_active && pc.entries_remaining > 0
          );
          const totalPaid = payments
            .filter((p) => p.user_id === profile.id)
            .reduce((sum, p) => sum + p.amount, 0);
          const registrationCount = allRegistrations.filter(
            (r) => r.user_id === profile.id
          ).length;

          return (
            <Card key={profile.id} className="rounded-xl border-border/60 shadow-[0_6px_16px_rgba(0,0,0,0.05)]">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-body font-semibold text-base text-foreground">{profile.full_name}</p>
                    <p className="text-sm font-body text-muted-foreground">{profile.phone || '—'}</p>
                    <p className="text-xs font-body text-muted-foreground">{profile.email}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {punchCard ? (
                      <Badge className="bg-success text-success-foreground shrink-0 font-body">
                        {punchCard.entries_remaining} כניסות
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground shrink-0 font-body">אין כרטיסיה</Badge>
                    )}
                    {punchCard && (
                      <button
                        onClick={() => openEditPunchCard(punchCard.id, punchCard.entries_remaining)}
                        className="p-1 rounded hover:bg-muted transition-colors"
                      >
                        <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <span className="font-body font-bold text-success">{totalPaid.toLocaleString()} ₪</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedClientId(profile.id)}
                    className="text-primary hover:text-primary-foreground hover:bg-primary font-body"
                  >
                    {registrationCount} שיעורים
                    <ChevronLeft className="h-4 w-4 mr-1" strokeWidth={1.8} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Desktop table */}
      <Card className="hidden md:block rounded-xl border-border/60 shadow-[0_6px_16px_rgba(0,0,0,0.05)]">
        <CardHeader>
          <CardTitle className="font-nehama text-[22px]">
            {searchQuery ? `תוצאות חיפוש (${filteredProfiles.length})` : `כל הלקוחות (${profiles.length})`}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-[hsl(0,0%,95%)] hover:bg-[hsl(0,0%,95%)]">
                <TableHead className="text-right font-body">שם</TableHead>
                <TableHead className="text-right font-body">טלפון</TableHead>
                <TableHead className="text-right font-body">אימייל</TableHead>
                <TableHead className="text-right font-body">הצטרפה</TableHead>
                <TableHead className="text-right font-body">כרטיסיה</TableHead>
                <TableHead className="text-right font-body">סה"כ שילמה</TableHead>
                <TableHead className="text-right font-body">פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProfiles.map((profile) => {
                const punchCard = punchCards.find(
                  (pc) => pc.user_id === profile.id && pc.is_active && pc.entries_remaining > 0
                );
                const totalPaid = payments
                  .filter((p) => p.user_id === profile.id)
                  .reduce((sum, p) => sum + p.amount, 0);
                const registrationCount = allRegistrations.filter(
                  (r) => r.user_id === profile.id
                ).length;

                return (
                  <TableRow key={profile.id} className="align-middle hover:bg-[hsl(0,0%,97%)] transition-colors">
                    <TableCell className="font-body font-medium align-middle">{profile.full_name}</TableCell>
                    <TableCell className="font-body text-muted-foreground align-middle">{profile.phone || '—'}</TableCell>
                    <TableCell className="font-body text-muted-foreground align-middle">{profile.email}</TableCell>
                    <TableCell className="font-body align-middle">{new Date(profile.created_at).toLocaleDateString('he-IL')}</TableCell>
                    <TableCell className="align-middle">
                      <div className="flex items-center gap-1.5">
                        {punchCard ? (
                          <Badge className="bg-success text-success-foreground font-body">
                            {punchCard.entries_remaining} כניסות
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-muted-foreground font-body">אין</Badge>
                        )}
                        {punchCard && (
                          <button
                            onClick={() => openEditPunchCard(punchCard.id, punchCard.entries_remaining)}
                            className="p-1 rounded hover:bg-muted transition-colors"
                            title="ערוך ניקובים"
                          >
                            <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                          </button>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-body font-bold align-middle">{totalPaid.toLocaleString()} ₪</TableCell>
                    <TableCell className="align-middle">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedClientId(profile.id)}
                        className="text-primary hover:text-primary-foreground hover:bg-primary font-body"
                      >
                        {registrationCount} שיעורים
                        <ChevronLeft className="h-4 w-4 mr-1" strokeWidth={1.8} />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Registrations dialog */}
      <Dialog open={!!selectedClientId} onOpenChange={() => setSelectedClientId(null)}>
        <DialogContent className="w-[95vw] max-w-2xl rounded-xl">
          <DialogHeader>
            <DialogTitle className="font-nehama text-[22px]">
              היסטוריית שיעורים - {selectedClient?.full_name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {registeredClasses.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[hsl(0,0%,95%)] hover:bg-[hsl(0,0%,95%)]">
                      <TableHead className="text-right font-body">שם השיעור</TableHead>
                      <TableHead className="text-right font-body">תאריך</TableHead>
                      <TableHead className="text-right hidden sm:table-cell font-body">מיקום</TableHead>
                      <TableHead className="text-right font-body">סוג כניסה</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registeredClasses.map((item) => (
                      <TableRow key={item.id} className="hover:bg-[hsl(0,0%,97%)]">
                        <TableCell className="font-body font-medium">{item.class?.name || '—'}</TableCell>
                        <TableCell className="font-body">
                          {item.class ? new Date(item.class.date).toLocaleDateString('he-IL', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          }) : '—'}
                        </TableCell>
                        <TableCell className="font-body text-muted-foreground hidden sm:table-cell">{item.class?.location || '—'}</TableCell>
                        <TableCell className="font-body">{item.entry_type === 'punch_card' ? 'כרטיסיה' : 'חד-פעמי'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground font-body">
                לא נרשמה לשיעורים עדיין
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit punch card dialog */}
      <Dialog open={!!editPunchCardId} onOpenChange={() => setEditPunchCardId(null)}>
        <DialogContent className="w-[90vw] max-w-sm rounded-xl">
          <DialogHeader>
            <DialogTitle className="font-nehama text-[20px]">עריכת ניקובים בכרטיסיה</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 py-2">
            <Label className="font-body text-sm text-right block">כמות כניסות שנשארו</Label>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setEditEntries((v) => Math.max(0, v - 1))}
                className="w-10 h-10 rounded-full border-2 border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="font-nehama text-4xl w-12 text-center">{editEntries}</span>
              <button
                onClick={() => setEditEntries((v) => v + 1)}
                className="w-10 h-10 rounded-full border-2 border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <p className="font-body text-xs text-muted-foreground text-center">
              {editEntries === 0 ? 'הכרטיסיה תסגר אוטומטית' : `הכרטיסיה פעילה — ${editEntries} כניסות`}
            </p>
            <Button
              className="w-full rounded-[10px] bg-primary hover:bg-primary/90 font-body"
              onClick={savePunchCardEntries}
              disabled={saving}
            >
              {saving ? 'שומר...' : 'שמור שינויים'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminClients;
