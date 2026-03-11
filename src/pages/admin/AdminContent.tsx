import { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useSiteContent, useUpdateSiteContent } from '@/hooks/use-site-content';
import { toast } from '@/hooks/use-toast';
import { Save, Loader2, Upload, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const FIELDS = [
  { key: 'who_am_i_title', label: 'כותרת הסקשן (למשל "מי אני?")', rows: 1 },
  { key: 'who_am_i_intro', label: 'כותרת משנה (למשל "אני יוגב.")', rows: 1 },
  { key: 'who_am_i_paragraph_1', label: 'פסקה ראשונה', rows: 3 },
  { key: 'who_am_i_paragraph_2', label: 'פסקה שנייה', rows: 3 },
  { key: 'who_am_i_highlight', label: 'משפט מודגש (מסקנה)', rows: 2 },
];

const MEDIA_KEY = 'who_am_i_media_url';

const AdminContent = () => {
  const { data: content, isLoading } = useSiteContent();
  const updateMutation = useUpdateSiteContent();
  const [values, setValues] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    // Also save media URL if it exists
    if (values[MEDIA_KEY]) {
      items.push({ key: MEDIA_KEY, value: values[MEDIA_KEY] });
    }
    try {
      await updateMutation.mutateAsync(items);
      toast({ title: 'נשמר בהצלחה ✓', description: 'התוכן עודכן באתר.' });
    } catch {
      toast({ title: 'שגיאה', description: 'לא הצלחנו לשמור. נסי שוב.', variant: 'destructive' });
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');
    if (!isVideo && !isImage) {
      toast({ title: 'שגיאה', description: 'יש להעלות קובץ וידאו או תמונה בלבד.', variant: 'destructive' });
      return;
    }

    setUploading(true);
    const ext = file.name.split('.').pop();
    const filePath = `who-am-i/media.${ext}`;

    // Delete old file if exists
    await supabase.storage.from('site-media').remove([filePath]);

    const { error } = await supabase.storage
      .from('site-media')
      .upload(filePath, file, { upsert: true });

    if (error) {
      toast({ title: 'שגיאה בהעלאה', description: error.message, variant: 'destructive' });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from('site-media')
      .getPublicUrl(filePath);

    // Add cache-busting param
    const publicUrl = `${urlData.publicUrl}?t=${Date.now()}`;
    setValues((prev) => ({ ...prev, [MEDIA_KEY]: publicUrl }));
    setUploading(false);
    toast({ title: 'הקובץ הועלה ✓', description: 'לחצי שמור כדי לעדכן באתר.' });

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveMedia = () => {
    setValues((prev) => ({ ...prev, [MEDIA_KEY]: '' }));
  };

  const mediaUrl = values[MEDIA_KEY];
  const isVideoUrl = mediaUrl && (mediaUrl.includes('.mp4') || mediaUrl.includes('.webm') || mediaUrl.includes('.mov'));

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

      {/* Media Upload Card */}
      <Card className="rounded-xl border-border/60 shadow-[0_6px_16px_rgba(0,0,0,0.05)] mb-6">
        <CardHeader>
          <CardTitle className="font-nehama text-[22px]">וידאו / תמונה</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4">
            {mediaUrl && (
              <div className="relative w-48 h-64 rounded-xl overflow-hidden border border-border bg-muted">
                {isVideoUrl ? (
                  <video src={mediaUrl} className="w-full h-full object-cover" muted autoPlay loop playsInline />
                ) : (
                  <img src={mediaUrl} alt="תצוגה מקדימה" className="w-full h-full object-cover" />
                )}
                <button
                  onClick={handleRemoveMedia}
                  className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 shadow-md hover:opacity-90"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*,image/*"
                onChange={handleUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="rounded-xl gap-2"
              >
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                {uploading ? 'מעלה...' : 'העלאת וידאו / תמונה'}
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                {!mediaUrl && 'כרגע מוצג הוידאו ברירת המחדל. העלה קובץ חדש כדי להחליף אותו.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Text Fields Card */}
      <Card className="rounded-xl border-border/60 shadow-[0_6px_16px_rgba(0,0,0,0.05)]">
        <CardHeader>
          <CardTitle className="font-nehama text-[22px]">טקסטים</CardTitle>
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
