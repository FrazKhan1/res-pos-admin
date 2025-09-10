import { AlertTriangle } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  variant?: "destructive" | "default";
}

export function ConfirmationModal({
  open,
  onOpenChange,
  title,
  message,
  onConfirm,
  confirmText = "Confirm",
  variant = "destructive"
}: ConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center mr-3">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <h3 className="text-lg font-semibold" data-testid="confirmation-title">{title}</h3>
        </div>
        
        <p className="text-muted-foreground mb-6" data-testid="confirmation-message">
          {message}
        </p>
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
            data-testid="button-cancel-confirmation"
          >
            Cancel
          </Button>
          <Button
            variant={variant}
            className="flex-1"
            onClick={handleConfirm}
            data-testid="button-confirm"
          >
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
