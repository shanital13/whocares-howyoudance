import { useState, useMemo } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockPayments, mockProfiles } from '@/lib/mock-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp } from 'lucide-react';

type FilterPeriod = 'week' | 'month' | 'custom';

const AdminRevenue = () => {
  const [period, setPeriod] = useState<FilterPeriod>('month');
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');

  const filteredPayments = useMemo(() => {
    const now = new Date();
    let fromDate: Date;
    let toDate = now;
    if (period === 'week') { fromDate = new Date(now); fromDate.setDate(fromDate.getDate() - 7); }
    else if (period === 'month') { fromDate = new Date(now); fromDate.setMonth(fromDate.getMonth() - 1); }
    else { fromDate = customFrom ? new Date(customFrom) : new Date(0); toDate = customTo ? new Date(customTo) : now; }
    return mockPayments.filter((p) => { const d = new Date(p.created_at); return d >= fromDate && d <= toDate; });
  }, [period, customFrom, customTo]);

  const totalRevenue = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
  const singleCount = filteredPayments.filter((p) => p.payment_type === 'single').length;
  const punchCardCount = filteredPayments.filter((p) => p.payment_type === 'punch_card').length;

  const chartData = useMemo(() => {
    const grouped: Record<string, number> = {};
    filteredPayments.forEach((p) => {
      const date = p.created_at.split('T')[0];
      grouped[date] = (grouped[date] || 0) + p.amount;
    });
    return Object.entries(grouped)
      .map(([date, amount]) => ({ date: new Date(date).toLocaleDateString('he-IL', { day: 'numeric', month: 'short' }), amount }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [filteredPayments]);

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl md:text-3xl mb-6">דשבורד הכנסות</h1>

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-2 mb-6">
        {(['week', 'month', 'custom'] as FilterPeriod[]).map((p) => (
          <Button key={p} variant={period === p ? 'default' : 'outline'} size="sm" className="rounded-full" onClick={() => setPeriod(p)}>
            {p === 'week' ? 'שבוע אחרון' : p === 'month' ? 'חודש אחרון' : 'תקופה מותאמת'}
          </Button>
        ))}
        {period === 'custom' && (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div>
              <Label className="text-xs">מתאריך</Label>
              <Input type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} className="w-full sm:w-40" />
            </div>
            <div>
              <Label className="text-xs">עד תאריך</Label>
              <Input type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} className="w-full sm:w-40" />
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">סה"כ הכנסות</CardTitle>
            <DollarSign className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-success">{totalRevenue.toLocaleString()} ₪</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">כניסות חד-פעמיות</CardTitle>
            <TrendingUp className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent><p className="text-3xl font-bold">{singleCount}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">כרטיסיות שנמכרו</CardTitle>
            <TrendingUp className="h-5 w-5 text-warning" />
          </CardHeader>
          <CardContent><p className="text-3xl font-bold">{punchCardCount}</p></CardContent>
        </Card>
      </div>

      {/* Chart */}
      {chartData.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-display">הכנסות לאורך זמן</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 md:h-64" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(v: number) => [`${v} ₪`, 'הכנסה']} />
                  <Bar dataKey="amount" fill="hsl(320, 70%, 50%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payments list */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">פירוט תשלומים</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Mobile cards */}
          <div className="md:hidden divide-y">
            {filteredPayments.map((payment) => {
              const profile = mockProfiles.find((p) => p.id === payment.user_id);
              return (
                <div key={payment.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">{profile?.full_name}</p>
                    <p className="text-xs text-muted-foreground">{new Date(payment.created_at).toLocaleDateString('he-IL')}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={payment.payment_type === 'single' ? 'outline' : 'default'}>
                      {payment.payment_type === 'single' ? 'חד-פעמי' : 'כרטיסיה'}
                    </Badge>
                    <span className="font-bold">{payment.amount} ₪</span>
                  </div>
                </div>
              );
            })}
            {filteredPayments.length === 0 && (
              <p className="text-center text-muted-foreground py-8">אין תשלומים בתקופה זו</p>
            )}
          </div>
          {/* Desktop table */}
          <Table className="hidden md:table">
            <TableHeader>
              <TableRow>
                <TableHead>תאריך</TableHead>
                <TableHead>לקוחה</TableHead>
                <TableHead>סוג</TableHead>
                <TableHead>סכום</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => {
                const profile = mockProfiles.find((p) => p.id === payment.user_id);
                return (
                  <TableRow key={payment.id}>
                    <TableCell>{new Date(payment.created_at).toLocaleDateString('he-IL')}</TableCell>
                    <TableCell className="font-medium">{profile?.full_name}</TableCell>
                    <TableCell>
                      <Badge variant={payment.payment_type === 'single' ? 'outline' : 'default'}>
                        {payment.payment_type === 'single' ? 'חד-פעמי' : 'כרטיסיה'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-bold">{payment.amount} ₪</TableCell>
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

export default AdminRevenue;
