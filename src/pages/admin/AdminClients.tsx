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
import { mockProfiles, mockPunchCards, mockPayments, mockAttendance, mockClasses } from '@/lib/mock-data';
import { ChevronLeft, Search } from 'lucide-react';

const AdminClients = () => {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProfiles = mockProfiles.filter((profile) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      profile.full_name.toLowerCase().includes(query) ||
      (profile.phone && profile.phone.includes(query))
    );
  });

  const selectedClient = mockProfiles.find((p) => p.id === selectedClientId);
  const clientAttendance = mockAttendance.filter((a) => a.user_id === selectedClientId && a.attended);
  const attendedClasses = clientAttendance.map((a) => {
    const danceClass = mockClasses.find((c) => c.id === a.class_id);
    return { ...a, class: danceClass };
  });

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="font-display text-2xl md:text-3xl">מאגר לקוחות</h1>
        <div className="relative w-full sm:w-72">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="חיפוש לפי שם או טלפון..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
        </div>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filteredProfiles.length === 0 && (
          <p className="text-center text-muted-foreground py-8">לא נמצאו לקוחות</p>
        )}
        {filteredProfiles.map((profile) => {
          const punchCard = mockPunchCards.find(
            (pc) => pc.user_id === profile.id && pc.is_active && pc.entries_remaining > 0
          );
          const totalPaid = mockPayments
            .filter((p) => p.user_id === profile.id)
            .reduce((sum, p) => sum + p.amount, 0);
          const attendanceCount = mockAttendance.filter(
            (a) => a.user_id === profile.id && a.attended
          ).length;

          return (
            <Card key={profile.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-base">{profile.full_name}</p>
                    <p className="text-sm text-muted-foreground">{profile.phone || '—'}</p>
                    <p className="text-xs text-muted-foreground">{profile.email}</p>
                  </div>
                  {punchCard ? (
                    <Badge className="bg-success text-success-foreground shrink-0">
                      {punchCard.entries_remaining} כניסות
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground shrink-0">אין כרטיסיה</Badge>
                  )}
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="font-bold text-success">{totalPaid.toLocaleString()} ₪</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedClientId(profile.id)}
                    className="text-primary"
                  >
                    {attendanceCount} שיעורים
                    <ChevronLeft className="h-4 w-4 mr-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Desktop table */}
      <Card className="hidden md:block">
        <CardHeader>
          <CardTitle className="font-display">
            {searchQuery ? `תוצאות חיפוש (${filteredProfiles.length})` : `כל הלקוחות (${mockProfiles.length})`}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">שם</TableHead>
                <TableHead className="text-right">טלפון</TableHead>
                <TableHead className="text-right">אימייל</TableHead>
                <TableHead className="text-right">הצטרפה</TableHead>
                <TableHead className="text-right">כרטיסיה</TableHead>
                <TableHead className="text-right">סה"כ שילמה</TableHead>
                <TableHead className="text-right">פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProfiles.map((profile) => {
                const punchCard = mockPunchCards.find(
                  (pc) => pc.user_id === profile.id && pc.is_active && pc.entries_remaining > 0
                );
                const totalPaid = mockPayments
                  .filter((p) => p.user_id === profile.id)
                  .reduce((sum, p) => sum + p.amount, 0);
                const attendanceCount = mockAttendance.filter(
                  (a) => a.user_id === profile.id && a.attended
                ).length;

                return (
                  <TableRow key={profile.id} className="align-middle">
                    <TableCell className="font-medium align-middle">{profile.full_name}</TableCell>
                    <TableCell className="text-muted-foreground align-middle">{profile.phone || '—'}</TableCell>
                    <TableCell className="text-muted-foreground align-middle">{profile.email}</TableCell>
                    <TableCell className="align-middle">{new Date(profile.created_at).toLocaleDateString('he-IL')}</TableCell>
                    <TableCell className="align-middle">
                      {punchCard ? (
                        <Badge className="bg-success text-success-foreground">
                          {punchCard.entries_remaining} כניסות
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">אין</Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-bold align-middle">{totalPaid.toLocaleString()} ₪</TableCell>
                    <TableCell className="align-middle">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedClientId(profile.id)}
                        className="text-primary hover:text-primary/80"
                      >
                        {attendanceCount} שיעורים
                        <ChevronLeft className="h-4 w-4 mr-1" />
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
        <DialogContent className="w-[95vw] max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              היסטוריית שיעורים - {selectedClient?.full_name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {attendedClasses.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">שם השיעור</TableHead>
                      <TableHead className="text-right">תאריך</TableHead>
                      <TableHead className="text-right hidden sm:table-cell">מיקום</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendedClasses.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.class?.name || '—'}</TableCell>
                        <TableCell>
                          {item.class ? new Date(item.class.date).toLocaleDateString('he-IL', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          }) : '—'}
                        </TableCell>
                        <TableCell className="text-muted-foreground hidden sm:table-cell">{item.class?.location || '—'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
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
