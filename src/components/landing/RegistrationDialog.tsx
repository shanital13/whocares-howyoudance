import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DanceClass, SINGLE_PRICE, PUNCH_CARD_PRICE, PUNCH_CARD_ENTRIES } from '@/lib/types';
import { mockPunchCards } from '@/lib/mock-data';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Check } from 'lucide-react';

interface Props {
  danceClass: DanceClass | null;
  onClose: () => void;
}

const RegistrationDialog = ({ danceClass, onClose }: Props) => {
  const { user } = useAuth();
  const [registered, setRegistered] = useState(false);

  // Check if user has active punch card
  const activePunchCard = user
    ? mockPunchCards.find((pc) => pc.user_id === user.id && pc.is_active && pc.entries_remaining > 0)
    : null;

  const handleRegister = (type: 'punch_card_existing' | 'single' | 'new_punch_card') => {
    setRegistered(true);
    const msg =
      type === 'punch_card_existing'
        ? `נרשמת בהצלחה עם הכרטיסיה הקיימת! נשארו ${(activePunchCard?.entries_remaining ?? 1) - 1} כניסות`
        : type === 'single'
        ? `נרשמת בהצלחה! יש לשלם ${SINGLE_PRICE} ฿ במזומן בשיעור`
        : `נרשמת בהצלחה עם כרטיסיה חדשה! יש לשלם ${PUNCH_CARD_PRICE} ฿ במזומן`;
    toast({ title: '🎉 נרשמת!', description: msg });
  };

  const handleClose = () => {
    setRegistered(false);
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

        {registered ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-success" />
            </div>
            <p className="font-display text-xl text-foreground mb-2">נרשמת בהצלחה! 💃</p>
            <p className="text-muted-foreground">נתראה בשיעור</p>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <p className="text-muted-foreground text-center">בחרי סוג כניסה:</p>
            <Button
              variant="outline"
              className="w-full h-auto py-4 flex flex-col items-center gap-1 rounded-xl border-2 hover:border-primary"
              onClick={() => handleRegister('single')}
            >
              <span className="font-bold text-lg">כניסה חד-פעמית</span>
              <span className="text-primary font-display text-xl">{SINGLE_PRICE} ฿</span>
              <span className="text-xs text-muted-foreground">תשלום במזומן בשיעור</span>
            </Button>
            <Button
              className="w-full h-auto py-4 flex flex-col items-center gap-1 rounded-xl"
              onClick={() => handleRegister('new_punch_card')}
            >
              <span className="font-bold text-lg">אני בכרטיסיה 🎫</span>
              <span className="font-display text-xl">{PUNCH_CARD_PRICE} ฿</span>
              <span className="text-xs text-primary-foreground/80">{PUNCH_CARD_ENTRIES} כניסות | תשלום במזומן</span>
              {activePunchCard && (
                <Badge className="bg-success text-success-foreground mt-1">
                  יש לך כרטיסיה פעילה — נשארו {activePunchCard.entries_remaining} כניסות
                </Badge>
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationDialog;
