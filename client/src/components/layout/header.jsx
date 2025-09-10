import { Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";


export function Header({ 
  title, 
  subtitle, 
  showAddButton = false, 
  onAddClick, 
  addButtonText = "Add" 
}) {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
            data-testid="notifications-button"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          {showAddButton && (
            <Button 
              onClick={onAddClick}
              data-testid="add-button"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              {addButtonText}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
