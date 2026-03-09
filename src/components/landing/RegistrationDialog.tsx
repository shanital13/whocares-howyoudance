import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DanceClass, SINGLE_PRICE, PUNCH_CARD_PRICE, PUNCH_CARD_ENTRIES } from '@/lib/types';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface Props {
  danceClass: DanceClass | null;
  onClose: () => void;
}

type Step = 'details' | 'entry_type' | 'confirmation';

const RegistrationDialog = ({ danceClass, onClose }: Props) => {
  const [step, setStep] = useState<Step>('details');
  const [entryType, setEntryType] = useState<'single' | 'punch_card' | null>(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleClose = () => {
    setStep('details');
    setEntryType(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setErrors({});
    onClose();
  };

  const validateDetails = () => {
    const newErrors: Record<string, string> = {};
    const trimmedName = fullName.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || trimmedName.length < 2) {
      newErrors.fullName = 'נא להזין שם מלא';
    }
    if (!trimmedPhone || !/^0\d{8,9}$/.test(trimmedPhone)) {
      newErrors.phone = 'נא להזין מספר טלפון תקין (למשל 0501234567)';
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = 'נא להזין כתובת אימייל תקינה';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitDetails = () => {
    if (validateDetails()) {
      setStep('entry_type');
    }
  };

  const handleSelectEntry = (type: 'single' | 'punch_card') => {
    setEntryType(type);
    setStep('confirmation');
    toast({
      title: 'נרשמת בהצלחה! 🎉',
      description: `${fullName.trim()}, נתראה בשיעור!`,
    });
  };

  if (!danceClass) return null;

  return (
    <Dialog open={!!danceClass} onOpenChange={handleClose}>
      <DialogContent className="max-w-md sm:max-w-lg overflow-hidden p-0">
        <div className="relative w-full" style={{ minHeight: '500px', perspective: '1000px' }}>
          <motion.div
            className="w-full"
            initial={false}
            animate={{ rotateY: step === 'details' ? 0 : 180 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* FRONT: פרטים אישיים */}
            <div
              className="w-full p-6"
              style={{
                backfaceVisibility: 'hidden',
                position: step === 'details' ? 'relative' : 'absolute',
                top: 0,
                left: 0,
                right: 0,
              }}
            >
              <div className="mb-6 text-center">
                <div className="mb-4 text-5xl">💃</div>
                <h2 className="font-display text-2xl text-foreground text-right mb-2">{danceClass.name}</h2>
                <p className="text-muted-foreground text-sm text-right">
                  {new Date(danceClass.date).toLocaleDateString('he-IL', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}{' '}
                  | {danceClass.time}
                </p>
                <p className="text-muted-foreground text-sm text-right">{danceClass.location}</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-right block">שם מלא</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="השם המלא שלך"
                    maxLength={100}
                    dir="rtl"
                    className="text-right"
                  />
                  {errors.fullName && <p className="text-sm text-destructive text-right">{errors.fullName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-right block">טלפון</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0501234567"
                    maxLength={11}
                    dir="ltr"
                  />
                  {errors.phone && <p className="text-sm text-destructive text-right">{errors.phone}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-right block">אימייל</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    maxLength={255}
                    dir="ltr"
                  />
                  {errors.email && <p className="text-sm text-destructive text-right">{errors.email}</p>}
                </div>
                <Button className="w-full rounded-xl py-5 text-lg" onClick={handleSubmitDetails}>
                  המשך
                </Button>
              </div>
            </div>

            {/* BACK: בחירת סוג כניסה + אישור */}
            <div
              className="w-full p-6"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                position: step !== 'details' ? 'relative' : 'absolute',
                top: 0,
                left: 0,
                right: 0,
              }}
            >
              {step === 'entry_type' && (
                <>
                  <div className="mb-6 text-center">
                    <div className="mb-4 text-5xl">🎫</div>
                    <h2 className="font-display text-2xl text-foreground mb-2">איך את מגיעה?</h2>
                    <p className="text-muted-foreground text-sm">בחרי את סוג הכניסה המתאימה לך</p>
                  </div>

                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full h-auto py-4 flex flex-col items-center gap-1 rounded-xl border-2 hover:border-primary transition-all"
                      onClick={() => handleSelectEntry('single')}
                    >
                      <span className="font-bold text-lg">כניסה חד-פעמית</span>
                      <span className="text-primary font-display text-xl">{SINGLE_PRICE} ฿</span>
                    </Button>
                    <Button
                      className="w-full h-auto py-4 flex flex-col items-center gap-1 rounded-xl"
                      onClick={() => handleSelectEntry('punch_card')}
                    >
                      <span className="font-bold text-lg">אני בכרטיסיה 🎫</span>
                      <span className="font-display text-xl">{PUNCH_CARD_ENTRIES} כניסות | {PUNCH_CARD_PRICE} ฿</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => setStep('details')}
                    >
                      חזרה
                    </Button>
                  </div>
                </>
              )}

              {step === 'confirmation' && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <Check className="h-8 w-8 text-success" />
                  </div>
                  {entryType === 'single' ? (
                    <>
                      <p className="font-display text-2xl text-foreground mb-3">כניסה חד-פעמית</p>
                      <p className="text-muted-foreground">יש לשלם <span className="font-bold text-foreground text-lg">{SINGLE_PRICE} ฿</span> במזומן בשיעור</p>
                    </>
                  ) : (
                    <>
                      <p className="font-display text-2xl text-foreground mb-3">כרטיסיה — {PUNCH_CARD_ENTRIES} כניסות 🎫</p>
                      <p className="text-muted-foreground mb-2">
                        אם יש לך כרטיסיה פעילה — מעולה, אין צורך בתשלום!
                      </p>
                      <p className="text-muted-foreground">
                        אם את מתחילה כרטיסיה חדשה — יש לשלם <span className="font-bold text-foreground text-lg">{PUNCH_CARD_PRICE} ฿</span> במזומן בשיעור
                      </p>
                    </>
                  )}
                  <p className="text-sm text-muted-foreground mt-6 font-medium">נתראה בשיעור! 💃</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationDialog;
