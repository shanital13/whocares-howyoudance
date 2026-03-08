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
import { Plus, Edit, Trash2, Users } from 'lucide-react';
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
    setForm({
      name: cls.name,
      level: cls.level,
      location: cls.location,
      date: cls.date,
      time: cls.time,
      is_recurring: cls.is_recurring,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editingClass) {
      setClasses((prev) =>
        prev.map((c) => (c.id === editingClass.id ? { ...c, ...form } : c))
      );
    } else {
      const newClass: DanceClass = {
        id: Date.now().toString(),
        ...form,
        created_at: new Date().toISOString(),
      };
      setClasses((prev) => [...prev, newClass]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setClasses((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl">ניהול שיעורים</h1>
        <Button onClick={openNew} className="rounded-full">
          <Plus className="h-4 w-4 ml-1" />
          שיעור חדש
        </Button>
      </div>

      <Card>
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
                  <TableCell>
                    <Badge variant="outline">{LEVEL_LABELS[cls.level]}</Badge>
                  </TableCell>
                  <TableCell>{cls.location}</TableCell>
                  <TableCell>{new Date(cls.date).toLocaleDateString('he-IL')}</TableCell>
                  <TableCell>{cls.time}</TableCell>
                  <TableCell>
                    {cls.is_recurring ? (
                      <Badge variant="secondary">שבועי</Badge>
                    ) : (
                      <Badge variant="outline">חד-פעמי</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" asChild title="רשימת משתתפות">
                        <Link to={`/admin/class/${cls.id}`}>
                          <Users className="h-4 w-4" />
                        </Link>
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
        <DialogContent>
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
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
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
