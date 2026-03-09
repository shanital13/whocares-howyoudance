import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DanceClass, SINGLE_PRICE, PUNCH_CARD_PRICE, PUNCH_CARD_ENTRIES } from '@/lib/types';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-right">{danceClass.name}</DialogTitle>
          <DialogDescription>
            {new Date(danceClass.date).toLocaleDateString('he-IL', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}{' '}
            | {danceClass.time} | {danceClass.location}
          </DialogDescription>
        </DialogHeader>

        {step === 'details' && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">שם מלא</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="השם המלא שלך"
                maxLength={100}
                dir="rtl"
              />
              {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">טלפון</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0501234567"
                maxLength={11}
                dir="ltr"
              />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">אימייל</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                maxLength={255}
                dir="ltr"
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>
            <Button className="w-full rounded-xl py-5 text-lg" onClick={handleSubmitDetails}>
              המשך
            </Button>
          </div>
        )}

        {step === 'entry_type' && (
          <div className="space-y-4 py-4">
            <p className="text-muted-foreground text-center">איך את מגיעה?</p>
            <Button
              variant="outline"
              className="w-full h-auto py-4 flex flex-col items-center gap-1 rounded-xl border-2 hover:border-primary"
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
          </div>
        )}

        {step === 'confirmation' && (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <Check className="h-7 w-7 text-success" />
            </div>
            {entryType === 'single' ? (
              <>
                <p className="font-display text-xl text-foreground mb-2">כניסה חד-פעמית</p>
                <p className="text-muted-foreground">יש לשלם <span className="font-bold text-foreground">{SINGLE_PRICE} ฿</span> במזומן בשיעור</p>
              </>
            ) : (
              <>
                <p className="font-display text-xl text-foreground mb-2">כרטיסיה — {PUNCH_CARD_ENTRIES} כניסות 🎫</p>
                <p className="text-muted-foreground">
                  אם יש לך כרטיסיה פעילה — מעולה, אין צורך בתשלום!
                </p>
                <p className="text-muted-foreground mt-1">
                  אם את מתחילה כרטיסיה חדשה — יש לשלם <span className="font-bold text-foreground">{PUNCH_CARD_PRICE} ฿</span> במזומן בשיעור
                </p>
              </>
            )}
            <p className="text-sm text-muted-foreground mt-4">נתראה בשיעור! 💃</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationDialog;
