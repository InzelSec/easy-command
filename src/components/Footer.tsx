import { DollarSign } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30 py-4 px-6">
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <span>If this tool helped you, consider supporting:</span>
        <a
          href="https://ko-fi.com/inzelsec"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors font-medium"
        >
          <DollarSign className="h-4 w-4" />
          <span>Buy me a coffee</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
