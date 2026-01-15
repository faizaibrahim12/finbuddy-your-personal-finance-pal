import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Smartphone, Monitor, Share, PlusSquare, MoreVertical, Download } from 'lucide-react';

interface DownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DownloadDialog({ open, onOpenChange }: DownloadDialogProps) {
  // Replace these with your actual hosted installer links
  const windowsLink = 'https://drive.google.com/uc?export=download&id=WINDOWS_FILE_ID';
  const macLink = 'https://drive.google.com/uc?export=download&id=MAC_FILE_ID';
  const androidLink = 'https://drive.google.com/uc?export=download&id=ANDROID_FILE_ID';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-income/10 flex items-center justify-center">
            <Download className="w-8 h-8 text-income" />
          </div>
          <DialogTitle className="text-xl">Install FinBuddy</DialogTitle>
          <DialogDescription className="text-base">
            Add FinBuddy to your device or download the installer for offline use
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Real Installer Downloads */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Monitor className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">Desktop / Mobile Download</h3>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => window.open(windowsLink, '_blank')}
                className="w-full bg-income hover:bg-income/90 text-income-foreground"
              >
                Download Windows Installer
              </Button>
              <Button
                onClick={() => window.open(macLink, '_blank')}
                className="w-full bg-income hover:bg-income/90 text-income-foreground"
              >
                Download Mac Installer
              </Button>
              <Button
                onClick={() => window.open(androidLink, '_blank')}
                className="w-full bg-income hover:bg-income/90 text-income-foreground"
              >
                Download Android APK
              </Button>
            </div>
          </div>

          {/* iOS Instructions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">iPhone / iPad (Safari)</h3>
            </div>
            <ol className="space-y-2 pl-7 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-foreground">1</span>
                Tap the <Share className="w-4 h-4 inline mx-1 text-foreground" /> Share button
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-foreground">2</span>
                Scroll down and tap <PlusSquare className="w-4 h-4 inline mx-1 text-foreground" /> "Add to Home Screen"
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-foreground">3</span>
                Tap "Add" to confirm
              </li>
            </ol>
          </div>

          {/* Android Instructions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">Android (Chrome)</h3>
            </div>
            <ol className="space-y-2 pl-7 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-foreground">1</span>
                Tap the <MoreVertical className="w-4 h-4 inline mx-1 text-foreground" /> menu (three dots)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-foreground">2</span>
                Tap "Add to Home screen" or "Install app"
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-foreground">3</span>
                Tap "Add" to confirm
              </li>
            </ol>
          </div>

          {/* Desktop Instructions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Monitor className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">Desktop (Chrome / Edge)</h3>
            </div>
            <ol className="space-y-2 pl-7 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-foreground">1</span>
                Click the install icon in the address bar
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-foreground">2</span>
                Click "Install" to add to your desktop
              </li>
            </ol>
          </div>
        </div>

        <Button 
          onClick={() => onOpenChange(false)} 
          className="w-full bg-income hover:bg-income/90 text-income-foreground mt-4"
        >
          Got it!
        </Button>
      </DialogContent>
    </Dialog>
  );
}
