import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useSiteContent, useUpdateSiteContent } from '@/hooks/use-site-content';
import { toast } from '@/hooks/use-toast';
import { Save, Loader2 } from 'lucide-react';

const FIELDS = [
  { key: 'who_am_i_intro', label: 'כותרת משנה (למשל "אני יוגב.")', rows: 1 },
  { key: 'who_am_i_paragraph_1', label: 'פסקה ראשונה', rows: 3 },
  { key: 'who_am_i_paragraph_2', label: 'פסקה שנייה', rows: 3 },
  { key: 'who_am_i_highlight', label: 'משפט מודגש (מסקנה)', rows: 2 },
];

const AdminContent = () => {
  const { data: content, isLoading } = useSiteContent();
  const updateMutation = useUpdateSiteContent();
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (content) {
      setValues(content);
    }
  }, [content]);

  const handleSave = async () => {
    const items = FIELDS.map((f) => ({
      key: f.key,
      value: values[f.key] || '',
    }));
    try {
      await updateMutation.mutateAsync(items);
      toast({ title: 'נשמר בהצלחה ✓', description: 'התוכן עודכן באתר.' });
    } catch {
      toast({ title: 'שגיאה', description: 'לא הצלחנו לשמור. נסי שוב.', variant: 'destructive' });
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-nehama text-[28px] md:text-[32px] text-foreground">עריכת תוכן — מי אני</h1>
        <Button
          onClick={handleSave}
          disabled={updateMutation.isPending}
          className="rounded-xl gap-2"
        >
          {updateMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          שמור
        </Button>
      </div>

      <Card className="rounded-xl border-border/60 shadow-[0_6px_16px_rgba(0,0,0,0.05)]">
        <CardHeader>
          <CardTitle className="font-nehama text-[22px]">סקשן ״מי אני״</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {FIELDS.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label className="font-body text-sm font-medium text-foreground">{field.label}</Label>
              <Textarea
                value={values[field.key] || ''}
                onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                rows={field.rows}
                className="font-body text-base resize-none"
                dir="rtl"
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminContent;
