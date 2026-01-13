import { useState } from "react";
import { Copy, Check, Plus, Minus, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ExtraOption } from "@/data/templates";

interface TemplateCardProps {
  title: string;
  description: string;
  template: string;
  tags: string[];
  renderedTemplate: string;
  extraOptions?: ExtraOption[];
  isBrowser?: boolean;
}

const TemplateCard = ({ title, tags, renderedTemplate, extraOptions, isBrowser }: TemplateCardProps) => {
  const [copied, setCopied] = useState(false);
  const [showExtras, setShowExtras] = useState(false);
  const [addedParams, setAddedParams] = useState<string[]>([]);

  const currentCommand = addedParams.length > 0
    ? `${renderedTemplate} ${addedParams.join(" ")}`
    : renderedTemplate;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddParam = (param: string) => {
    if (!addedParams.includes(param)) {
      setAddedParams([...addedParams, param]);
    }
  };

  const handleRemoveParam = (param: string) => {
    setAddedParams(addedParams.filter(p => p !== param));
  };

  // Highlight placeholders that weren't replaced
  const highlightTemplate = (text: string) => {
    const parts = text.split(/({{[A-Z_]+}})/g);
    return parts.map((part, index) => {
      if (part.match(/{{[A-Z_]+}}/)) {
        return (
          <span key={index} className="text-primary bg-primary/20 px-1 rounded">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="cyber-card p-4 animate-fade-in">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-medium text-foreground">{title}</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className={cn(
            "shrink-0 gap-1.5 border-border hover:border-primary transition-all",
            copied && "border-green-500 text-green-500 animate-copy-success"
          )}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </Button>
      </div>

      {isBrowser && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Globe className="h-4 w-4" />
          <span className="font-medium">Browser:</span>
        </div>
      )}

      <div className="bg-background rounded-md p-3 font-mono text-sm overflow-x-auto border border-border">
        <code className="text-foreground whitespace-pre-wrap break-all">
          {highlightTemplate(renderedTemplate)}
          {addedParams.length > 0 && (
            <span className="text-green-400"> {addedParams.join(" ")}</span>
          )}
        </code>
      </div>

      <div className="flex flex-wrap gap-1 mt-3 pr-8">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="text-[9px] px-1 py-0 h-3.5 bg-muted/60 text-muted-foreground hover:bg-muted/80"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {extraOptions && extraOptions.length > 0 && (
        <div className="flex justify-end mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowExtras(!showExtras)}
            className="h-7 px-3 gap-1.5 bg-muted/80 hover:bg-primary/20 border border-border hover:border-primary text-xs font-medium"
          >
            {showExtras ? (
              <>
                <Minus className="h-3.5 w-3.5" />
                Fechar
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" />
                Extras
              </>
            )}
          </Button>
        </div>
      )}

      {showExtras && extraOptions && extraOptions.length > 0 && (
        <div className="mt-3 bg-muted/30 rounded-md p-3 border border-border animate-fade-in">
          <p className="text-xs text-muted-foreground mb-2 font-medium">Extra Parameters:</p>
          <div className="space-y-1.5">
            {extraOptions.map((opt, idx) => {
              const isAdded = addedParams.includes(opt.param);
              return (
                <div key={idx} className="flex items-center gap-2 text-xs">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => isAdded ? handleRemoveParam(opt.param) : handleAddParam(opt.param)}
                    className={cn(
                      "h-5 w-5 shrink-0",
                      isAdded
                        ? "bg-green-500/20 text-green-500 hover:bg-red-500/20 hover:text-red-500"
                        : "bg-muted hover:bg-primary/20"
                    )}
                  >
                    {isAdded ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                  </Button>
                  <code className={cn(
                    "font-mono px-1.5 py-0.5 rounded shrink-0",
                    isAdded ? "text-green-400 bg-green-500/10" : "text-primary bg-primary/10"
                  )}>
                    {opt.param}
                  </code>
                  <span className="text-muted-foreground">{opt.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateCard;
