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
import { usePayments, useProfiles } from '@/hooks/use-supabase-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp } from 'lucide-react';

type FilterPeriod = 'week' | 'month' | 'custom';

const AdminRevenue = () => {
  const { data: payments = [] } = usePayments();
  const { data: profiles = [] } = useProfiles();

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
    return payments.filter((p) => { const d = new Date(p.created_at); return d >= fromDate && d <= toDate; });
  }, [period, customFrom, customTo, payments]);

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
      <h1 className="font-nehama text-[28px] md:text-[32px] mb-6 text-foreground">דשבורד הכנסות</h1>

      <div className="flex flex-wrap items-end gap-2 mb-6">
        {(['week', 'month', 'custom'] as FilterPeriod[]).map((p) => (
          <Button
            key={p}
            variant={period === p ? 'default' : 'outline'}
            size="sm"
            className={`rounded-[10px] font-body ${period === p ? 'bg-primary hover:bg-primary/90' : 'border-border/60'}`}
            onClick={() => setPeriod(p)}
          >
            {p === 'week' ? 'שבוע אחרון' : p === 'month' ? 'חודש אחרון' : 'תקופה מותאמת'}
          </Button>
        ))}
        {period === 'custom' && (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div>
              <Label className="text-xs font-body">מתאריך</Label>
              <Input type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} className="w-full sm:w-40 h-11 rounded-[10px] border-border/60 font-body" />
            </div>
            <div>
              <Label className="text-xs font-body">עד תאריך</Label>
              <Input type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} className="w-full sm:w-40 h-11 rounded-[10px] border-border/60 font-body" />
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <Card className="rounded-xl border-border/60 shadow-[0_6px_16px_rgba(0,0,0,0.05)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-body font-medium text-muted-foreground">סה"כ הכנסות</CardTitle>
            <DollarSign className="h-5 w-5 text-success" strokeWidth={1.8} />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-body font-bold text-success">{totalRevenue.toLocaleString()} ₪</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-border/60 shadow-[0_6px_16px_rgba(0,0,0,0.05)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-body font-medium text-muted-foreground">כניסות חד-פעמיות</CardTitle>
            <TrendingUp className="h-5 w-5 text-primary" strokeWidth={1.8} />
          </CardHeader>
          <CardContent><p className="text-3xl font-body font-bold">{singleCount}</p></CardContent>
        </Card>
        <Card className="rounded-xl border-border/60 shadow-[0_6px_16px_rgba(0,0,0,0.05)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-body font-medium text-muted-foreground">כרטיסיות שנמכרו</CardTitle>
            <TrendingUp className="h-5 w-5 text-warning" strokeWidth={1.8} />
          </CardHeader>
          <CardContent><p className="text-3xl font-body font-bold">{punchCardCount}</p></CardContent>
        </Card>
      </div>

      {chartData.length > 0 && (
        <Card className="mb-6 rounded-xl border-border/60 shadow-[0_6px_16px_rgba(0,0,0,0.05)]">
          <CardHeader>
            <CardTitle className="font-nehama text-[22px]">הכנסות לאורך זמן</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 md:h-64" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,92%)" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fontFamily: 'Rubik' }} />
                  <YAxis tick={{ fontSize: 12, fontFamily: 'Rubik' }} />
                  <Tooltip formatter={(v: number) => [`${v} ₪`, 'הכנסה']} />
                  <Bar dataKey="amount" fill="hsl(351, 100%, 68%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="rounded-xl border-border/60 shadow-[0_6px_16px_rgba(0,0,0,0.05)]">
        <CardHeader>
          <CardTitle className="font-nehama text-[22px]">פירוט תשלומים</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="md:hidden divide-y divide-border/50">
            {filteredPayments.map((payment) => {
              const profile = profiles.find((p) => p.id === payment.user_id);
              return (
                <div key={payment.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-body font-medium text-foreground">{profile?.full_name || '—'}</p>
                    <p className="text-xs font-body text-muted-foreground">{new Date(payment.created_at).toLocaleDateString('he-IL')}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={payment.payment_type === 'single' ? 'outline' : 'default'} className="font-body">
                      {payment.payment_type === 'single' ? 'חד-פעמי' : 'כרטיסיה'}
                    </Badge>
                    <span className="font-body font-bold">{payment.amount} ₪</span>
                  </div>
                </div>
              );
            })}
            {filteredPayments.length === 0 && (
              <p className="text-center text-muted-foreground py-8 font-body">אין תשלומים בתקופה זו</p>
            )}
          </div>
          <Table className="hidden md:table">
            <TableHeader>
              <TableRow className="bg-[hsl(0,0%,95%)] hover:bg-[hsl(0,0%,95%)]">
                <TableHead className="font-body text-right">תאריך</TableHead>
                <TableHead className="font-body text-right">לקוחה</TableHead>
                <TableHead className="font-body text-right">סוג</TableHead>
                <TableHead className="font-body text-right">סכום</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => {
                const profile = profiles.find((p) => p.id === payment.user_id);
                return (
                  <TableRow key={payment.id} className="hover:bg-[hsl(0,0%,97%)] transition-colors">
                    <TableCell className="font-body">{new Date(payment.created_at).toLocaleDateString('he-IL')}</TableCell>
                    <TableCell className="font-body font-medium">{profile?.full_name || '—'}</TableCell>
                    <TableCell>
                      <Badge variant={payment.payment_type === 'single' ? 'outline' : 'default'} className="font-body">
                        {payment.payment_type === 'single' ? 'חד-פעמי' : 'כרטיסיה'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-body font-bold">{payment.amount} ₪</TableCell>
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
