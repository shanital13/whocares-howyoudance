import { useParams } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockClasses, mockRegistrations, mockProfiles, mockPunchCards, mockAttendance } from '@/lib/mock-data';
import { LEVEL_LABELS, SINGLE_PRICE, PUNCH_CARD_PRICE } from '@/lib/types';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const AdminClassDetail = () => {
  const { id } = useParams<{ id: string }>();
  const danceClass = mockClasses.find((c) => c.id === id);
  const registrations = mockRegistrations.filter((r) => r.class_id === id);

  const [attendanceMap, setAttendanceMap] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    mockAttendance
      .filter((a) => a.class_id === id)
      .forEach((a) => {
        map[a.user_id] = a.attended;
      });
    return map;
  });

  const [paymentMap, setPaymentMap] = useState<Record<string, string>>({});

  if (!danceClass) {
    return (
      <AdminLayout>
        <p className="text-muted-foreground">שיעור לא נמצא</p>
      </AdminLayout>
    );
  }

  const toggleAttendance = (userId: string) => {
    const newVal = !attendanceMap[userId];
    setAttendanceMap((prev) => ({ ...prev, [userId]: newVal }));

    const punchCard = mockPunchCards.find((pc) => pc.user_id === userId && pc.is_active);
    if (newVal && punchCard && punchCard.entries_remaining > 0) {
      toast({
        title: 'ניקוב כרטיסיה',
        description: `נוקבה כניסה מהכרטיסיה. נשארו ${punchCard.entries_remaining - 1} כניסות`,
      });
    }
  };

  const markPayment = (userId: string, amount: string) => {
    setPaymentMap((prev) => ({ ...prev, [userId]: amount }));
    toast({ title: 'תשלום סומן', description: `${amount} ฿` });
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="font-display text-3xl">{danceClass.name}</h1>
          <Badge variant="outline">{LEVEL_LABELS[danceClass.level]}</Badge>
        </div>
        <p className="text-muted-foreground">
          {new Date(danceClass.date).toLocaleDateString('he-IL', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}{' '}
          | {danceClass.time} | {danceClass.location}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display">נרשמות לשיעור ({registrations.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>שם</TableHead>
                <TableHead>סוג כניסה</TableHead>
                <TableHead>כרטיסיה פעילה</TableHead>
                <TableHead>השתתפה</TableHead>
                <TableHead>תשלום</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrations.map((reg) => {
                const profile = mockProfiles.find((p) => p.id === reg.user_id);
                const punchCard = mockPunchCards.find(
                  (pc) => pc.user_id === reg.user_id && pc.is_active && pc.entries_remaining > 0
                );
                const hasPunchCard = !!punchCard;

                return (
                  <TableRow key={reg.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{profile?.full_name}</p>
                        <p className="text-xs text-muted-foreground">{profile?.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={reg.entry_type === 'punch_card' ? 'default' : 'outline'}>
                        {reg.entry_type === 'punch_card' ? 'כרטיסיה' : 'חד-פעמי'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {hasPunchCard ? (
                        <Badge className="bg-success text-success-foreground">
                          פעילה ({punchCard.entries_remaining} כניסות)
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">אין</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={attendanceMap[reg.user_id] || false}
                        onCheckedChange={() => toggleAttendance(reg.user_id)}
                      />
                    </TableCell>
                    <TableCell>
                      {hasPunchCard ? (
                        <span className="text-sm text-success font-medium">כרטיסיה פעילה ✓</span>
                      ) : (
                        <Select
                          value={paymentMap[reg.user_id] || ''}
                          onValueChange={(v) => markPayment(reg.user_id, v)}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="סמן תשלום" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={SINGLE_PRICE.toString()}>
                              {SINGLE_PRICE} ฿ (חד-פעמי)
                            </SelectItem>
                            <SelectItem value={PUNCH_CARD_PRICE.toString()}>
                              {PUNCH_CARD_PRICE} ฿ (כרטיסיה)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              {registrations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
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
