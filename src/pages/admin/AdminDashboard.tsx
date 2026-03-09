import { useMemo } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockClasses, mockProfiles, mockPayments, mockPunchCards } from '@/lib/mock-data';
import { Calendar, Users, DollarSign, CreditCard } from 'lucide-react';

const AdminDashboard = () => {
  // Current month revenue
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthlyRevenue = mockPayments
    .filter((p) => new Date(p.created_at) >= monthStart)
    .reduce((sum, p) => sum + p.amount, 0);

  // Classes in the next 7 days
  const nextWeekEnd = new Date(now);
  nextWeekEnd.setDate(nextWeekEnd.getDate() + 7);
  const upcomingClasses = useMemo(() =>
    mockClasses.filter((cls) => {
      const d = new Date(cls.date);
      return d >= now && d <= nextWeekEnd;
    }),
    []
  );

  const activePunchCards = mockPunchCards.filter((pc) => pc.is_active).length;

  // Last 10 payments
  const recentPayments = useMemo(() =>
    [...mockPayments]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 10),
    []
  );

  const stats = [
    { label: 'שיעורים קרובים (שבוע)', value: upcomingClasses.length, icon: Calendar, color: 'text-primary' },
    { label: 'לקוחות רשומות', value: mockProfiles.length, icon: Users, color: 'text-secondary' },
    { label: 'הכנסות (חודש נוכחי)', value: `${monthlyRevenue.toLocaleString()} ₪`, icon: DollarSign, color: 'text-success' },
    { label: 'כרטיסיות פעילות', value: activePunchCards, icon: CreditCard, color: 'text-warning' },
  ];

  return (
    <AdminLayout>
      <h1 className="font-nehama text-[28px] md:text-[32px] mb-8 text-foreground">דשבורד</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="rounded-xl border-border/60 shadow-[0_6px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-body font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} strokeWidth={1.8} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold font-body">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="rounded-xl border-border/60 shadow-[0_6px_16px_rgba(0,0,0,0.05)]">
          <CardHeader>
            <CardTitle className="font-nehama text-[22px]">שיעורים קרובים</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingClasses.length === 0 && (
              <p className="text-muted-foreground font-body text-sm text-center py-4">אין שיעורים בשבוע הקרוב</p>
            )}
            {upcomingClasses.map((cls) => (
              <div key={cls.id} className="flex justify-between items-center py-2.5 border-b border-border/50 last:border-0">
                <div>
                  <p className="font-body font-medium text-foreground">{cls.name}</p>
                  <p className="text-sm font-body text-muted-foreground">{cls.location}</p>
                </div>
                <div className="text-left">
                  <p className="text-sm font-body text-foreground">
                    {new Date(cls.date).toLocaleDateString('he-IL', { weekday: 'short', day: 'numeric', month: 'short' })}
                  </p>
                  <p className="text-sm font-body text-muted-foreground">{cls.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-xl border-border/60 shadow-[0_6px_16px_rgba(0,0,0,0.05)]">
          <CardHeader>
            <CardTitle className="font-nehama text-[22px]">תשלומים אחרונים</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentPayments.map((payment) => {
              const profile = mockProfiles.find((p) => p.id === payment.user_id);
              return (
                <div key={payment.id} className="flex justify-between items-center py-2.5 border-b border-border/50 last:border-0">
                  <div>
                    <p className="font-body font-medium text-foreground">{profile?.full_name}</p>
                    <p className="text-sm font-body text-muted-foreground">
                      {payment.payment_type === 'single' ? 'כניסה חד-פעמית' : 'כרטיסיה'}
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="font-body font-bold text-success">{payment.amount} ₪</p>
                    <p className="text-xs font-body text-muted-foreground">
                      {new Date(payment.created_at).toLocaleDateString('he-IL', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
