import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockClasses, mockProfiles, mockPayments, mockPunchCards } from '@/lib/mock-data';
import { Calendar, Users, DollarSign, CreditCard } from 'lucide-react';

const AdminDashboard = () => {
  const totalRevenue = mockPayments.reduce((sum, p) => sum + p.amount, 0);
  const activePunchCards = mockPunchCards.filter((pc) => pc.is_active).length;

  const stats = [
    { label: 'שיעורים קרובים', value: mockClasses.length, icon: Calendar, color: 'text-primary' },
    { label: 'לקוחות רשומות', value: mockProfiles.length, icon: Users, color: 'text-secondary' },
    { label: 'הכנסות (฿)', value: totalRevenue.toLocaleString(), icon: DollarSign, color: 'text-success' },
    { label: 'כרטיסיות פעילות', value: activePunchCards, icon: CreditCard, color: 'text-warning' },
  ];

  return (
    <AdminLayout>
      <h1 className="font-display text-3xl mb-8">דשבורד</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-display">שיעורים קרובים</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockClasses.slice(0, 3).map((cls) => (
              <div key={cls.id} className="flex justify-between items-center py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{cls.name}</p>
                  <p className="text-sm text-muted-foreground">{cls.location}</p>
                </div>
                <div className="text-left">
                  <p className="text-sm">{new Date(cls.date).toLocaleDateString('he-IL')}</p>
                  <p className="text-sm text-muted-foreground">{cls.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display">תשלומים אחרונים</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockPayments.slice(0, 5).map((payment) => {
              const profile = mockProfiles.find((p) => p.id === payment.user_id);
              return (
                <div key={payment.id} className="flex justify-between items-center py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{profile?.full_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {payment.payment_type === 'single' ? 'כניסה חד-פעמית' : 'כרטיסיה'}
                    </p>
                  </div>
                  <p className="font-bold text-success">{payment.amount} ฿</p>
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
