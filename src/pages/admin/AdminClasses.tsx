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
import { useClasses, useCreateClass, useUpdateClass, useDeleteClass } from '@/hooks/use-supabase-data';
import { LEVEL_LABELS, ClassLevel } from '@/lib/types';
import { Plus, Edit, Trash2, Users, MapPin, Clock, Tag, X, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminClasses = () => {
  const { data: classes = [], isLoading } = useClasses();
  const createClass = useCreateClass();
  const updateClass = useUpdateClass();
  const deleteClass = useDeleteClass();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingClassId, setEditingClassId] = useState<string | null>(null);
  const [customLevels, setCustomLevels] = useState<Record<string, string>>({});
  const [levelDialogOpen, setLevelDialogOpen] = useState(false);
  const [newLevelForm, setNewLevelForm] = useState({ key: '', label: '' });
  const [hiddenLevels, setHiddenLevels] = useState<string[]>([]);
  const [editingLevelKey, setEditingLevelKey] = useState<string | null>(null);
  const [editingLevelLabel, setEditingLevelLabel] = useState('');

  const [form, setForm] = useState({
    name: '',
    level: 'all' as ClassLevel,
    description: '',
    location: '',
    date: '',
    time: '',
    is_recurring: false,
    max_participants: '' as string | number,
    arrival_instructions: '',
  });

  // Merge defaults (minus hidden) with custom overrides
  const allLevels: Record<string, string> = {};
  for (const [key, label] of Object.entries(LEVEL_LABELS)) {
    if (!hiddenLevels.includes(key)) {
      allLevels[key] = customLevels[key] || label;
    }
  }
  for (const [key, label] of Object.entries(customLevels)) {
    if (!(key in LEVEL_LABELS)) {
      allLevels[key] = label;
    }
  }

  const openNew = () => {
    setEditingClassId(null);
    setForm({ name: '', level: 'all', description: '', location: '', date: '', time: '', is_recurring: false, max_participants: '', arrival_instructions: '' });
    setDialogOpen(true);
  };

  const openEdit = (cls: any) => {
    setEditingClassId(cls.id);
    setForm({ name: cls.name, level: cls.level, description: cls.description || '', location: cls.location, date: cls.date, time: cls.time, is_recurring: cls.is_recurring, max_participants: cls.max_participants ?? '', arrival_instructions: cls.arrival_instructions || '' });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      const maxP = form.max_participants === '' ? null : Number(form.max_participants);
      const payload = { name: form.name, level: form.level, description: form.description, location: form.location, date: form.date, time: form.time, is_recurring: form.is_recurring, recurring_day: null, max_participants: maxP, arrival_instructions: form.arrival_instructions };
      if (editingClassId) {
        await updateClass.mutateAsync({ id: editingClassId, ...payload });
      } else {
        await createClass.mutateAsync(payload);
      }
      setDialogOpen(false);
    } catch (err: any) {
      console.error('Save error:', err);
      alert('שגיאה בשמירה: ' + (err?.message || 'Unknown error'));
    }
  };

  const handleDelete = (id: string) => deleteClass.mutate(id);

  const handleDuplicate = async (cls: any) => {
    await createClass.mutateAsync({
      name: `${cls.name} (עותק)`,
      level: cls.level,
      description: cls.description || '',
      location: cls.location,
      date: cls.date,
      time: cls.time,
      is_recurring: cls.is_recurring,
      recurring_day: cls.recurring_day,
      max_participants: cls.max_participants,
    });
  };

  const handleAddLevel = () => {
    if (newLevelForm.key && newLevelForm.label) {
      const key = newLevelForm.key.toLowerCase().replace(/\s+/g, '_');
      setCustomLevels((prev) => ({ ...prev, [key]: newLevelForm.label }));
      setNewLevelForm({ key: '', label: '' });
      setLevelDialogOpen(false);
    }
  };

  const handleDeleteLevel = (key: string) => {
    setCustomLevels((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  if (isLoading) {
    return <AdminLayout><p className="text-muted-foreground font-body text-center py-8">טוען שיעורים...</p></AdminLayout>;
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-nehama text-[28px] md:text-[32px] text-foreground">ניהול שיעורים</h1>
        <div className="flex gap-2">
          <Button onClick={() => setLevelDialogOpen(true)} variant="outline" size="sm" className="rounded-[10px] border-border/60 font-body">
            <Tag className="h-4 w-4 ml-1" strokeWidth={1.8} />
            רמות
          </Button>
          <Button onClick={openNew} size="sm" className="rounded-[10px] bg-primary hover:bg-primary/90 font-body">
            <Plus className="h-4 w-4 ml-1" />
            שיעור חדש
          </Button>
        </div>
      </div>

      {Object.keys(customLevels).length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {Object.entries(customLevels).map(([key, label]) => (
            <Badge key={key} variant="secondary" className="gap-2 font-body">
              {label}
              <button onClick={() => handleDeleteLevel(key)} className="hover:text-destructive">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {classes.map((cls) => (
          <Card key={cls.id} className="rounded-xl border-border/60 shadow-[0_6px_16px_rgba(0,0,0,0.05)]">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-body font-semibold text-foreground">{cls.name}</p>
                  <Badge variant="outline" className="mt-1 text-xs font-body">{allLevels[cls.level] || cls.level}</Badge>
                </div>
                {cls.is_recurring
                  ? <Badge variant="secondary" className="font-body">שבועי</Badge>
                  : <Badge variant="outline" className="font-body">חד-פעמי</Badge>
                }
              </div>
              <div className="space-y-1 text-sm text-muted-foreground mt-3 font-body">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} />
                  <span>{new Date(cls.date).toLocaleDateString('he-IL')} | {cls.time.slice(0, 5)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} />
                  <span className="truncate">{cls.location}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-3 pt-3 border-t border-border/50">
                <Button variant="outline" size="sm" className="flex-1 rounded-[10px] font-body" asChild>
                  <Link to={`/admin/class/${cls.id}`}>
                    <Users className="h-4 w-4 ml-1" strokeWidth={1.8} />
                    משתתפות
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="rounded-[10px]" onClick={() => openEdit(cls)}>
                  <Edit className="h-4 w-4" strokeWidth={1.8} />
                </Button>
                <Button variant="outline" size="sm" className="rounded-[10px]" onClick={() => handleDuplicate(cls)} title="שכפל שיעור">
                  <Copy className="h-4 w-4" strokeWidth={1.8} />
                </Button>
                <Button variant="outline" size="sm" className="rounded-[10px]" onClick={() => handleDelete(cls.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" strokeWidth={1.8} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop table */}
      <Card className="hidden md:block rounded-xl border-border/60 shadow-[0_6px_16px_rgba(0,0,0,0.05)]">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-[hsl(0,0%,95%)] hover:bg-[hsl(0,0%,95%)]">
                <TableHead className="font-body">שם השיעור</TableHead>
                <TableHead className="font-body">רמה</TableHead>
                <TableHead className="font-body">מיקום</TableHead>
                <TableHead className="font-body">תאריך</TableHead>
                <TableHead className="font-body">שעה</TableHead>
                <TableHead className="font-body">סוג</TableHead>
                <TableHead className="font-body">פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((cls) => (
                <TableRow key={cls.id} className="hover:bg-[hsl(0,0%,97%)] transition-colors">
                  <TableCell className="font-body font-medium">{cls.name}</TableCell>
                  <TableCell><Badge variant="outline" className="font-body">{allLevels[cls.level] || cls.level}</Badge></TableCell>
                  <TableCell className="font-body">{cls.location}</TableCell>
                  <TableCell className="font-body">{new Date(cls.date).toLocaleDateString('he-IL')}</TableCell>
                  <TableCell className="font-body">{cls.time.slice(0, 5)}</TableCell>
                  <TableCell>
                    {cls.is_recurring ? <Badge variant="secondary" className="font-body">שבועי</Badge> : <Badge variant="outline" className="font-body">חד-פעמי</Badge>}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" asChild title="רשימת משתתפות" className="h-8 w-8">
                        <Link to={`/admin/class/${cls.id}`}><Users className="h-4 w-4" strokeWidth={1.8} /></Link>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openEdit(cls)} className="h-8 w-8">
                        <Edit className="h-4 w-4" strokeWidth={1.8} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDuplicate(cls)} className="h-8 w-8" title="שכפל שיעור">
                        <Copy className="h-4 w-4" strokeWidth={1.8} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(cls.id)} className="h-8 w-8">
                        <Trash2 className="h-4 w-4 text-destructive" strokeWidth={1.8} />
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
        <DialogContent className="w-[95vw] max-w-lg rounded-xl">
          <DialogHeader>
            <DialogTitle className="font-nehama text-[22px]">
              {editingClassId ? 'עריכת שיעור' : 'שיעור חדש'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="font-body text-sm">שם השיעור</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-11 rounded-[10px] border-border/60 focus:border-primary font-body" />
            </div>
            <div>
              <Label className="font-body text-sm">טקסט לשיעור</Label>
              <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="הטקסט שיופיע בכרטיס השיעור בעמוד הבית" className="h-11 rounded-[10px] border-border/60 focus:border-primary font-body" />
            </div>
            <div>
              <Label className="font-body text-sm">רמה</Label>
              <Select value={form.level} onValueChange={(v) => setForm({ ...form, level: v as ClassLevel })}>
                <SelectTrigger className="h-11 rounded-[10px] border-border/60 font-body"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(allLevels).map(([key, label]) => (
                    <SelectItem key={key} value={key} className="font-body">{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="font-body text-sm">מיקום</Label>
              <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="h-11 rounded-[10px] border-border/60 focus:border-primary font-body" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-body text-sm">תאריך</Label>
                <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="h-11 rounded-[10px] border-border/60 focus:border-primary font-body" />
              </div>
              <div>
                <Label className="font-body text-sm">שעה</Label>
                <Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="h-11 rounded-[10px] border-border/60 focus:border-primary font-body" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="recurring"
                checked={form.is_recurring}
                onChange={(e) => setForm({ ...form, is_recurring: e.target.checked })}
                className="rounded accent-primary"
              />
              <Label htmlFor="recurring" className="font-body text-sm">שיעור שבועי קבוע</Label>
            </div>
            <div>
              <Label className="font-body text-sm">מקסימום משתתפות</Label>
              <Input
                type="number"
                min={1}
                value={form.max_participants}
                onChange={(e) => setForm({ ...form, max_participants: e.target.value })}
                placeholder="ללא הגבלה"
                className="h-11 rounded-[10px] border-border/60 focus:border-primary font-body"
              />
            </div>
            <Button className="w-full h-10 rounded-[10px] bg-primary hover:bg-primary/90 font-body font-medium" onClick={handleSave}>
              {editingClassId ? 'שמור שינויים' : 'צור שיעור'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={levelDialogOpen} onOpenChange={setLevelDialogOpen}>
        <DialogContent className="w-[95vw] max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle className="font-nehama text-[22px]">ניהול רמות</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Existing levels */}
            <div className="space-y-2">
              <Label className="font-body text-sm font-medium text-muted-foreground">רמות קיימות</Label>
              {Object.entries(allLevels).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between py-2 px-3 rounded-[10px] border border-border/60 bg-background">
                    {editingLevelKey === key ? (
                      <div className="flex items-center gap-2 flex-1">
                        <Input
                          value={editingLevelLabel}
                          onChange={(e) => setEditingLevelLabel(e.target.value)}
                          className="h-8 rounded-[10px] border-border/60 focus:border-primary font-body text-sm flex-1"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setCustomLevels((prev) => ({ ...prev, [key]: editingLevelLabel }));
                              setEditingLevelKey(null);
                            } else if (e.key === 'Escape') {
                              setEditingLevelKey(null);
                            }
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-primary"
                          onClick={() => {
                            setCustomLevels((prev) => ({ ...prev, [key]: editingLevelLabel }));
                            setEditingLevelKey(null);
                          }}
                        >
                          <Plus className="h-3.5 w-3.5 rotate-45" strokeWidth={1.8} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => setEditingLevelKey(null)}
                        >
                          <X className="h-3.5 w-3.5" strokeWidth={1.8} />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <span className="font-body text-sm font-medium">{label}</span>
                          <span className="text-xs text-muted-foreground font-body">({key})</span>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => {
                              setEditingLevelKey(key);
                              setEditingLevelLabel(label);
                            }}
                          >
                            <Edit className="h-3.5 w-3.5" strokeWidth={1.8} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive"
                            onClick={() => {
                              if (key in LEVEL_LABELS) {
                                setCustomLevels((prev) => {
                                  const updated = { ...prev };
                                  delete updated[key];
                                  return updated;
                                });
                                setHiddenLevels((prev) => [...prev, key]);
                              } else {
                                handleDeleteLevel(key);
                              }
                            }}
                          >
                            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.8} />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
            </div>

            {/* Add new level */}
            <div className="pt-3 border-t border-border/50 space-y-3">
              <Label className="font-body text-sm font-medium text-muted-foreground">הוספת רמה חדשה</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="שם (בעברית)"
                  value={newLevelForm.label}
                  onChange={(e) => setNewLevelForm({ ...newLevelForm, label: e.target.value })}
                  className="h-10 rounded-[10px] border-border/60 focus:border-primary font-body text-sm"
                />
                <Input
                  placeholder="מזהה (באנגלית)"
                  value={newLevelForm.key}
                  onChange={(e) => setNewLevelForm({ ...newLevelForm, key: e.target.value })}
                  className="h-10 rounded-[10px] border-border/60 focus:border-primary font-body text-sm"
                />
              </div>
              <Button
                className="w-full h-9 rounded-[10px] bg-primary hover:bg-primary/90 font-body font-medium text-sm"
                onClick={handleAddLevel}
                disabled={!newLevelForm.key || !newLevelForm.label}
              >
                <Plus className="h-4 w-4 ml-1" />
                הוסף רמה
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminClasses;
