import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { mockClasses } from '@/lib/mock-data';
import { DanceClass, LEVEL_LABELS, ClassLevel } from '@/lib/types';
import { Plus, Edit, Trash2, Users, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminClasses = () => {
  const [classes, setClasses] = useState<DanceClass[]>(mockClasses);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<DanceClass | null>(null);

  const [form, setForm] = useState({
    name: '',
    level: 'all' as ClassLevel,
    location: '',
    date: '',
    time: '',
    is_recurring: false,
  });

  const openNew = () => {
    setEditingClass(null);
    setForm({ name: '', level: 'all', location: '', date: '', time: '', is_recurring: false });
    setDialogOpen(true);
  };

  const openEdit = (cls: DanceClass) => {
    setEditingClass(cls);
    setForm({ name: cls.name, level: cls.level, location: cls.location, date: cls.date, time: cls.time, is_recurring: cls.is_recurring });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editingClass) {
      setClasses((prev) => prev.map((c) => (c.id === editingClass.id ? { ...c, ...form } : c)));
    } else {
      setClasses((prev) => [...prev, { id: Date.now().toString(), ...form, created_at: new Date().toISOString() }]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => setClasses((prev) => prev.filter((c) => c.id !== id));

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl md:text-3xl">ניהול שיעורים</h1>
        <Button onClick={openNew} className="rounded-full" size="sm">
          <Plus className="h-4 w-4 ml-1" />
          שיעור חדש
        </Button>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {classes.map((cls) => (
          <Card key={cls.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold">{cls.name}</p>
                  <Badge variant="outline" className="mt-1 text-xs">{LEVEL_LABELS[cls.level]}</Badge>
                </div>
                {cls.is_recurring
                  ? <Badge variant="secondary">שבועי</Badge>
                  : <Badge variant="outline">חד-פעמי</Badge>
                }
              </div>
              <div className="space-y-1 text-sm text-muted-foreground mt-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  <span>{new Date(cls.date).toLocaleDateString('he-IL')} | {cls.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{cls.location}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-3 pt-3 border-t">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link to={`/admin/class/${cls.id}`}>
                    <Users className="h-4 w-4 ml-1" />
                    משתתפות
                  </Link>
                </Button>
                <Button variant="outline" size="sm" onClick={() => openEdit(cls)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(cls.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop table */}
      <Card className="hidden md:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>שם השיעור</TableHead>
                <TableHead>רמה</TableHead>
                <TableHead>מיקום</TableHead>
                <TableHead>תאריך</TableHead>
                <TableHead>שעה</TableHead>
                <TableHead>סוג</TableHead>
                <TableHead>פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell className="font-medium">{cls.name}</TableCell>
                  <TableCell><Badge variant="outline">{LEVEL_LABELS[cls.level]}</Badge></TableCell>
                  <TableCell>{cls.location}</TableCell>
                  <TableCell>{new Date(cls.date).toLocaleDateString('he-IL')}</TableCell>
                  <TableCell>{cls.time}</TableCell>
                  <TableCell>
                    {cls.is_recurring ? <Badge variant="secondary">שבועי</Badge> : <Badge variant="outline">חד-פעמי</Badge>}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" asChild title="רשימת משתתפות">
                        <Link to={`/admin/class/${cls.id}`}><Users className="h-4 w-4" /></Link>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openEdit(cls)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(cls.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[95vw] max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {editingClass ? 'עריכת שיעור' : 'שיעור חדש'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>שם השיעור</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <Label>רמה</Label>
              <Select value={form.level} onValueChange={(v) => setForm({ ...form, level: v as ClassLevel })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(LEVEL_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>מיקום</Label>
              <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>תאריך</Label>
                <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
              <div>
                <Label>שעה</Label>
                <Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="recurring"
                checked={form.is_recurring}
                onChange={(e) => setForm({ ...form, is_recurring: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="recurring">שיעור שבועי קבוע</Label>
            </div>
            <Button className="w-full" onClick={handleSave}>
              {editingClass ? 'שמור שינויים' : 'צור שיעור'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminClasses;
