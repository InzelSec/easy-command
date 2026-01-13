import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface InputValues {
  lhost: string;
  rhost: string;
  port: string;
  url: string;
  wordlistPath: string;
}

interface InputPanelProps {
  values: InputValues;
  onChange: (values: InputValues) => void;
  showWordlistPath?: boolean;
}

const InputPanel = ({ values, onChange, showWordlistPath = false }: InputPanelProps) => {
  const handleChange = (field: keyof InputValues, value: string) => {
    onChange({ ...values, [field]: value });
  };

  const handleReset = () => {
    onChange({ lhost: "", rhost: "", port: "", url: "", wordlistPath: "" });
    toast({
      title: "Inputs cleared",
      description: "All values have been reset.",
    });
  };

  return (
    <div className="cyber-card p-4 mb-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[140px]">
          <Label htmlFor="lhost" className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
            LHOST
          </Label>
          <Input
            id="lhost"
            placeholder="10.10.14.1"
            value={values.lhost}
            onChange={(e) => handleChange("lhost", e.target.value)}
            className="bg-input border-border focus:border-primary font-mono text-sm"
          />
        </div>

        <div className="flex-1 min-w-[140px]">
          <Label htmlFor="rhost" className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
            RHOST
          </Label>
          <Input
            id="rhost"
            placeholder="10.10.10.1"
            value={values.rhost}
            onChange={(e) => handleChange("rhost", e.target.value)}
            className="bg-input border-border focus:border-primary font-mono text-sm"
          />
        </div>

        <div className="flex-1 min-w-[100px]">
          <Label htmlFor="port" className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
            PORT
          </Label>
          <Input
            id="port"
            placeholder="4444"
            value={values.port}
            onChange={(e) => handleChange("port", e.target.value)}
            className="bg-input border-border focus:border-primary font-mono text-sm"
          />
        </div>

        <div className="flex-1 min-w-[180px]">
          <Label htmlFor="url" className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
            URL
          </Label>
          <Input
            id="url"
            placeholder="target.com"
            value={values.url}
            onChange={(e) => handleChange("url", e.target.value)}
            className="bg-input border-border focus:border-primary font-mono text-sm"
          />
        </div>

        {showWordlistPath && (
          <div className="flex-1 min-w-[200px]">
            <Label htmlFor="wordlistPath" className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
              WORDLIST PATH
            </Label>
            <Input
              id="wordlistPath"
              placeholder="/path/to/wordlist.txt"
              value={values.wordlistPath}
              onChange={(e) => handleChange("wordlistPath", e.target.value)}
              className="bg-input border-border focus:border-primary font-mono text-sm"
            />
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleReset}
            className="border-border hover:border-primary hover:bg-muted"
            title="Reset all inputs"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InputPanel;
