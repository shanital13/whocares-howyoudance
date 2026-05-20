import { useEffect, useState } from 'react';
import { Accessibility, AArrowUp, AArrowDown, Contrast, Focus, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type Settings = {
  textSize: 'normal' | 'lg' | 'xl';
  contrast: boolean;
  focus: boolean;
};

const STORAGE_KEY = 'a11y-settings';
const DEFAULTS: Settings = { textSize: 'normal', contrast: false, focus: false };

function load(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {}
  return DEFAULTS;
}

function apply(s: Settings) {
  const html = document.documentElement;
  html.classList.toggle('a11y-text-lg', s.textSize === 'lg');
  html.classList.toggle('a11y-text-xl', s.textSize === 'xl');
  html.classList.toggle('a11y-contrast', s.contrast);
  html.classList.toggle('a11y-focus', s.focus);
}

const AccessibilityWidget = () => {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  useEffect(() => {
    const s = load();
    setSettings(s);
    apply(s);
  }, []);

  const update = (patch: Partial<Settings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    apply(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  const cycleText = (dir: 1 | -1) => {
    const order: Settings['textSize'][] = ['normal', 'lg', 'xl'];
    const idx = order.indexOf(settings.textSize);
    const next = order[Math.max(0, Math.min(order.length - 1, idx + dir))];
    update({ textSize: next });
  };

  const reset = () => update(DEFAULTS);

  return (
    <div className="fixed bottom-4 left-4 z-[60] print:hidden">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            aria-label="פתח תפריט נגישות"
            className="h-12 w-12 rounded-full shadow-lg"
          >
            <Accessibility className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top" align="start" className="w-64 p-4" role="dialog" aria-label="הגדרות נגישות">
          <div className="space-y-3">
            <h3 className="text-sm font-bold">נגישות</h3>

            <div className="flex items-center justify-between gap-2">
              <span className="text-sm">גודל טקסט</span>
              <div className="flex gap-1">
                <Button size="icon" variant="outline" aria-label="הקטן טקסט" onClick={() => cycleText(-1)}>
                  <AArrowDown className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" aria-label="הגדל טקסט" onClick={() => cycleText(1)}>
                  <AArrowUp className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              variant={settings.contrast ? 'default' : 'outline'}
              className="w-full justify-start gap-2"
              onClick={() => update({ contrast: !settings.contrast })}
              aria-pressed={settings.contrast}
            >
              <Contrast className="h-4 w-4" />
              ניגודיות גבוהה
            </Button>

            <Button
              variant={settings.focus ? 'default' : 'outline'}
              className="w-full justify-start gap-2"
              onClick={() => update({ focus: !settings.focus })}
              aria-pressed={settings.focus}
            >
              <Focus className="h-4 w-4" />
              הדגשת מיקוד מקלדת
            </Button>

            <Button variant="ghost" className="w-full justify-start gap-2" onClick={reset} aria-label="איפוס הגדרות נגישות">
              <RotateCcw className="h-4 w-4" />
              איפוס
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AccessibilityWidget;
