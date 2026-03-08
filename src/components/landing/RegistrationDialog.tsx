import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DanceClass, SINGLE_PRICE, PUNCH_CARD_PRICE, PUNCH_CARD_ENTRIES } from '@/lib/types';
import { useState } from 'react';
import { Check } from 'lucide-react';

interface Props {
  danceClass: DanceClass | null;
  onClose: () => void;
}

const RegistrationDialog = ({ danceClass, onClose }: Props) => {
  const [selected, setSelected] = useState<'single' | 'punch_card' | null>(null);

  const handleClose = () => {
    setSelected(null);
    onClose();
  };

  if (!danceClass) return null;

  return (
    <Dialog open={!!danceClass} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{danceClass.name}</DialogTitle>
          <DialogDescription>
            {new Date(danceClass.date).toLocaleDateString('he-IL', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}{' '}
            | {danceClass.time} | {danceClass.location}
          </DialogDescription>
        </DialogHeader>

        {selected ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <Check className="h-7 w-7 text-success" />
            </div>
            {selected === 'single' ? (
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
        ) : (
          <div className="space-y-4 py-4">
            <p className="text-muted-foreground text-center">איך את מגיעה?</p>
            <Button
              variant="outline"
              className="w-full h-auto py-4 flex flex-col items-center gap-1 rounded-xl border-2 hover:border-primary"
              onClick={() => setSelected('single')}
            >
              <span className="font-bold text-lg">כניסה חד-פעמית</span>
              <span className="text-primary font-display text-xl">{SINGLE_PRICE} ฿</span>
            </Button>
            <Button
              className="w-full h-auto py-4 flex flex-col items-center gap-1 rounded-xl"
              onClick={() => setSelected('punch_card')}
            >
              <span className="font-bold text-lg">אני בכרטיסיה 🎫</span>
              <span className="font-display text-xl">{PUNCH_CARD_ENTRIES} כניסות | {PUNCH_CARD_PRICE} ฿</span>
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationDialog;
