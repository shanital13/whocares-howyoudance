import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockProfiles, mockPunchCards, mockPayments } from '@/lib/mock-data';

const AdminClients = () => {
  return (
    <AdminLayout>
      <h1 className="font-display text-3xl mb-8">מאגר לקוחות</h1>

      <Card>
        <CardHeader>
          <CardTitle className="font-display">כל הלקוחות ({mockProfiles.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>שם</TableHead>
                <TableHead>אימייל</TableHead>
                <TableHead>הצטרפה</TableHead>
                <TableHead>כרטיסיה</TableHead>
                <TableHead>סה"כ שילמה</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProfiles.map((profile) => {
                const punchCard = mockPunchCards.find(
                  (pc) => pc.user_id === profile.id && pc.is_active && pc.entries_remaining > 0
                );
                const totalPaid = mockPayments
                  .filter((p) => p.user_id === profile.id)
                  .reduce((sum, p) => sum + p.amount, 0);

                return (
                  <TableRow key={profile.id}>
                    <TableCell className="font-medium">{profile.full_name}</TableCell>
                    <TableCell className="text-muted-foreground">{profile.email}</TableCell>
                    <TableCell>{new Date(profile.created_at).toLocaleDateString('he-IL')}</TableCell>
                    <TableCell>
                      {punchCard ? (
                        <Badge className="bg-success text-success-foreground">
                          {punchCard.entries_remaining} כניסות
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">אין</Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-bold">{totalPaid.toLocaleString()} ฿</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminClients;
