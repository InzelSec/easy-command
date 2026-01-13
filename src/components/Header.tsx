import { DollarSign, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

interface HeaderProps {
  onToggleSidebar: () => void;
  onLogoClick: () => void;
}

const Header = ({ onToggleSidebar, onLogoClick }: HeaderProps) => {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <button
          onClick={onLogoClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <img src={logo} alt="InzelSec Logo" className="h-8 w-8" />
          <span className="text-sm font-semibold gradient-text">InzelSec</span>
        </button>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Easy Command</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="border-border hover:border-primary hover:bg-muted gap-2"
          onClick={() => window.open("https://ko-fi.com/inzelsec", "_blank")}
        >
          <DollarSign className="h-4 w-4" />
          <span className="hidden sm:inline">Donate</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
