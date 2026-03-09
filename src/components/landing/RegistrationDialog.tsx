import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DanceClass, SINGLE_PRICE, PUNCH_CARD_PRICE, PUNCH_CARD_ENTRIES, LEVEL_LABELS } from '@/lib/types';
import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  danceClass: DanceClass | null;
  isWaitlist?: boolean;
  onClose: () => void;
}

interface LevelContent {
  title: string;
  description: string;
  forWhom: string;
}

const levelContent: Record<string, LevelContent> = {
  beginner: {
    title: 'מתחילות ונהנות',
    description: 'שיעורי מחול מודרני לשחרור ביקורת עצמית ומלא פאן.',
    forWhom: 'קצב לימוד נעים, חזרות מרובות, כוראיגרפיות אינטואיטיביות לגוף, דגש על ביטחון והנאה.',
  },
  advanced: {
    title: 'מתקדמות או לא להיות',
    description: 'שיעורי מחול מודרני לשחרור ביקורת עצמית תנועה ומלא פאן.',
    forWhom: 'קומבנציות מורכבות יותר, קצב לימוד מהיר, פחות חזרות ועצירות, עבודה על רצפים ארוכים ודינמיים.',
  },
  intermediate: {
    title: 'מתחילות ונהנות',
    description: 'שיעורי מחול מודרני לשחרור ביקורת עצמית ומלא פאן.',
    forWhom: 'קצב לימוד בינוני. כוראגרפיות עם קצת יותר אתגר ושילובים מאתגרים, פחות חזרות, עבודה על רצפים ארוכים יותר וזרימה בין חלקים.',
  },
  all: {
    title: 'לכולן',
    description: 'שיעורי מחול מודרני לשחרור ביקורת עצמית ומלא פאן.',
    forWhom: 'מתאים לכל רמה — בואי כמו שאת ונרקוד ביחד.',
  },
};

const defaultContent: LevelContent = {
  title: 'שיעור מחול',
  description: 'שיעורי מחול מודרני לשחרור ביקורת עצמית ומלא פאן.',
  forWhom: 'מתאים לכל מי שרוצה לרקוד ולהנות.',
};

const RegistrationDialog = ({ danceClass, isWaitlist = false, onClose }: Props) => {
  const [entryType, setEntryType] = useState<'single' | 'punch_card' | null>(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const handleClose = () => {
    setEntryType(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setErrors({});
    setSubmitted(false);
    setSubmitting(false);
    onClose();
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) newErrors.fullName = 'נא להזין שם מלא';
    if (!phone.trim() || !/^\+?[\d\s\-]{7,15}$/.test(phone.trim())) newErrors.phone = 'נא להזין מספר טלפון תקין';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) newErrors.email = 'נא להזין כתובת מייל תקינה';
    if (!entryType) newErrors.entryType = 'נא לבחור סוג כניסה';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate() || !danceClass) return;
    setSubmitting(true);
    try {
      // Check if profile exists by email
      const { data: existing } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email.trim())
        .maybeSingle();

      let userId: string;

      if (existing) {
        userId = existing.id;
        // Update name/phone if needed
        await supabase.from('profiles').update({
          full_name: fullName.trim(),
          phone: phone.trim() || null,
        }).eq('id', userId);

        // Check if already registered for this class
        const { data: existingReg } = await supabase
          .from('registrations')
          .select('id')
          .eq('user_id', userId)
          .eq('class_id', danceClass.id)
          .maybeSingle();

        if (existingReg) {
          setErrors({ submit: 'כבר נרשמת לשיעור הזה! 💃' });
          setSubmitting(false);
          return;
        }
      } else {
        // Create new profile
        userId = crypto.randomUUID();
        const { error: profileErr } = await supabase.from('profiles').insert({
          id: userId,
          full_name: fullName.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
        });
        if (profileErr) throw profileErr;
      }

      // Create registration
      const { error: regErr } = await supabase.from('registrations').insert({
        user_id: userId,
        class_id: danceClass.id,
        entry_type: entryType!,
      });
      if (regErr) throw regErr;

      queryClient.invalidateQueries({ queryKey: ['registrations'] });
      queryClient.invalidateQueries({ queryKey: ['profiles'] });

      // Send webhook with registration details
      try {
        await fetch('https://hook.eu2.make.com/miyvfiv1ru7thsy7lix5ty11xpxb5an7', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            full_name: fullName.trim(),
            phone: phone.trim(),
            class_name: danceClass.name,
            class_level: LEVEL_LABELS[danceClass.level] || danceClass.level,
            class_location: danceClass.location,
            class_date: danceClass.date,
            class_time: danceClass.time,
            arrival_instructions: danceClass.arrival_instructions || '',
            entry_type: entryType,
          }),
        });
      } catch (webhookErr) {
        console.warn('Webhook failed (non-blocking):', webhookErr);
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Registration error:', err);
      setErrors({ submit: 'שגיאה בהרשמה, נסי שוב' });
    } finally {
      setSubmitting(false);
    }
  };

  if (!danceClass) return null;

  const content = levelContent[danceClass.level] ?? defaultContent;

  return (
    <Dialog open={!!danceClass} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm p-0 overflow-hidden border-0 shadow-2xl rounded-3xl bg-background">
        {/* Decorative top blob */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-secondary/8 blur-3xl pointer-events-none" />

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="relative p-4"
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 left-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-10"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Title */}
              <div className="mb-3 text-right">
                <div className="text-xl mb-0.5">💃</div>
                <h2 className="font-nehama text-xl text-foreground leading-tight mb-0.5">
                  {content.title}
                </h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  {content.description}
                </p>
              </div>

              {/* למי מתאים */}
              <div className="mb-3 bg-peach rounded-xl p-2.5 text-right">
                <p className="font-body font-medium text-foreground text-xs mb-0.5">למי מתאים?</p>
                <p className="font-body text-muted-foreground text-xs leading-relaxed">
                  {content.forWhom}
                </p>
              </div>

              {/* Pricing */}
              <div className="mb-3 text-right space-y-0.5">
                <div className="flex justify-between items-center">
                  <span className="font-body font-semibold text-foreground text-xs">₿ {SINGLE_PRICE}</span>
                  <span className="font-body text-xs text-foreground">כניסה חד פעמית</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body font-semibold text-foreground text-xs">₿ {PUNCH_CARD_PRICE}</span>
                  <span className="font-body text-xs text-foreground">כרטיסיה של {PUNCH_CARD_ENTRIES} כניסות</span>
                </div>
                <p className="font-body text-[11px] text-muted-foreground pt-0.5">
                  התשלום במזומן בבאט בהגעה לשיעור
                </p>
              </div>

              {/* Form */}
              <div className="space-y-2 mb-3">
                <div>
                  <Label className="text-right block text-xs font-medium mb-0.5">
                    שם מלא <span className="text-primary">*</span>
                  </Label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="השם שלך"
                    dir="rtl"
                    required
                    maxLength={100}
                    className={`h-9 text-sm rounded-xl text-right border-border/60 focus:border-primary ${errors.fullName ? 'border-destructive' : ''}`}
                  />
                  {errors.fullName && <p className="text-[11px] text-destructive text-right mt-0.5">{errors.fullName}</p>}
                </div>
                <div>
                  <Label className="text-right block text-xs font-medium mb-0.5">
                    טלפון <span className="text-primary">*</span>
                  </Label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0501234567"
                    dir="ltr"
                    required
                    maxLength={15}
                    className={`h-9 text-sm rounded-xl border-border/60 focus:border-primary ${errors.phone ? 'border-destructive' : ''}`}
                  />
                  {errors.phone && <p className="text-[11px] text-destructive text-right mt-0.5">{errors.phone}</p>}
                </div>
                <div>
                  <Label className="text-right block text-xs font-medium mb-0.5">
                    מייל <span className="text-primary">*</span>
                  </Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    dir="ltr"
                    required
                    maxLength={255}
                    className={`h-9 text-sm rounded-xl border-border/60 focus:border-primary ${errors.email ? 'border-destructive' : ''}`}
                  />
                  {errors.email && <p className="text-[11px] text-destructive text-right mt-0.5">{errors.email}</p>}
                </div>
              </div>

              {/* Entry type selector */}
              <div className="mb-3">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setEntryType('single')}
                    className={`relative rounded-xl border-2 py-2 px-3 text-center transition-all duration-200 font-body text-xs font-medium
                      ${entryType === 'single'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border/50 bg-background text-foreground hover:border-primary/50'
                      }`}
                  >
                    {entryType === 'single' && (
                      <span className="absolute top-1 left-1.5 w-3.5 h-3.5 bg-primary rounded-full flex items-center justify-center">
                        <Check className="h-2 w-2 text-white" strokeWidth={3} />
                      </span>
                    )}
                    כניסה חד פעמית
                  </button>
                  <button
                    onClick={() => setEntryType('punch_card')}
                    className={`relative rounded-xl border-2 py-2 px-3 text-center transition-all duration-200 font-body text-xs font-medium
                      ${entryType === 'punch_card'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border/50 bg-background text-foreground hover:border-primary/50'
                      }`}
                  >
                    {entryType === 'punch_card' && (
                      <span className="absolute top-1 left-1.5 w-3.5 h-3.5 bg-primary rounded-full flex items-center justify-center">
                        <Check className="h-2 w-2 text-white" strokeWidth={3} />
                      </span>
                    )}
                    אני בכרטיסיה! 🎫
                  </button>
                </div>
                {errors.entryType && <p className="text-[11px] text-destructive text-right mt-1">{errors.entryType}</p>}
              </div>

              {errors.submit && (
                <p className="text-base font-semibold text-destructive text-center mb-2 font-body">{errors.submit}</p>
              )}

              {/* Submit button */}
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full py-2.5 rounded-full font-nehama text-base text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-xl active:scale-100 disabled:opacity-60 disabled:pointer-events-none"
                style={{ background: isWaitlist ? 'hsl(var(--foreground))' : 'hsl(var(--primary))' }}
              >
                {submitting ? 'שומרת...' : isWaitlist ? 'הרשמה לרשימת המתנה 📋' : 'שומרת מקום ✨'}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, type: 'spring' }}
              className="relative p-10 text-center"
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 left-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-6"
              >
                <Check className="h-10 w-10 text-success" strokeWidth={2.5} />
              </motion.div>

              <h2 className="font-nehama text-4xl text-foreground mb-3">
                {isWaitlist ? 'נרשמת לרשימת המתנה! 📋' : 'המקום שמור! 🎉'}
              </h2>
              <p className="font-body text-muted-foreground text-base leading-relaxed mb-2">
                {isWaitlist
                  ? `${fullName.trim()}, נעדכן אותך ברגע שיתפנה מקום 💛`
                  : `${fullName.trim()}, נתראה בשיעור!`
                }
              </p>
              <p className="font-body text-sm text-muted-foreground">
                {entryType === 'single'
                  ? `לשלם ${SINGLE_PRICE} ₿ במזומן בהגעה`
                  : `${PUNCH_CARD_ENTRIES} כניסות — ${PUNCH_CARD_PRICE} ₿ במזומן`
                }
              </p>
              <p className="font-body text-3xl mt-6">💃</p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationDialog;
