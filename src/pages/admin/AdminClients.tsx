import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { useProfiles, usePunchCards, usePayments, useAttendance, useClasses, useRegistrations } from '@/hooks/use-supabase-data';
import { ChevronLeft, Search } from 'lucide-react';

const AdminClients = () => {
  const { data: profiles = [], isLoading } = useProfiles();
  const { data: punchCards = [] } = usePunchCards();
  const { data: payments = [] } = usePayments();
  const { data: allRegistrations = [] } = useRegistrations();
  const { data: classes = [] } = useClasses();

  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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
                  {punchCard ? (
                    <Badge className="bg-success text-success-foreground shrink-0 font-body">
                      {punchCard.entries_remaining} כניסות
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground shrink-0 font-body">אין כרטיסיה</Badge>
                  )}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <span className="font-body font-bold text-success">{totalPaid.toLocaleString()} ₪</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedClientId(profile.id)}
                    className="text-primary hover:text-primary-foreground hover:bg-primary font-body"
                  >
                    {attendanceCount} שיעורים
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
                const attendanceCount = attendanceData.filter(
                  (a) => a.user_id === profile.id && a.attended
                ).length;

                return (
                  <TableRow key={profile.id} className="align-middle hover:bg-[hsl(0,0%,97%)] transition-colors">
                    <TableCell className="font-body font-medium align-middle">{profile.full_name}</TableCell>
                    <TableCell className="font-body text-muted-foreground align-middle">{profile.phone || '—'}</TableCell>
                    <TableCell className="font-body text-muted-foreground align-middle">{profile.email}</TableCell>
                    <TableCell className="font-body align-middle">{new Date(profile.created_at).toLocaleDateString('he-IL')}</TableCell>
                    <TableCell className="align-middle">
                      {punchCard ? (
                        <Badge className="bg-success text-success-foreground font-body">
                          {punchCard.entries_remaining} כניסות
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground font-body">אין</Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-body font-bold align-middle">{totalPaid.toLocaleString()} ₪</TableCell>
                    <TableCell className="align-middle">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedClientId(profile.id)}
                        className="text-primary hover:text-primary-foreground hover:bg-primary font-body"
                      >
                        {attendanceCount} שיעורים
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

      <Dialog open={!!selectedClientId} onOpenChange={() => setSelectedClientId(null)}>
        <DialogContent className="w-[95vw] max-w-2xl rounded-xl">
          <DialogHeader>
            <DialogTitle className="font-nehama text-[22px]">
              היסטוריית שיעורים - {selectedClient?.full_name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {attendedClasses.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[hsl(0,0%,95%)] hover:bg-[hsl(0,0%,95%)]">
                      <TableHead className="text-right font-body">שם השיעור</TableHead>
                      <TableHead className="text-right font-body">תאריך</TableHead>
                      <TableHead className="text-right hidden sm:table-cell font-body">מיקום</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendedClasses.map((item) => (
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground font-body">
                אין רישומי השתתפות עדיין
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminClients;
