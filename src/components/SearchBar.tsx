import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTags: string[];
  availableTags: string[];
  onTagToggle: (tag: string) => void;
  onClearTags: () => void;
}

const SearchBar = ({
  searchQuery,
  onSearchChange,
  selectedTags,
  availableTags,
  onTagToggle,
  onClearTags,
}: SearchBarProps) => {
  return (
    <div className="mb-6 space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-input border-border focus:border-primary"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">Tags:</span>
        {availableTags.slice(0, 12).map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className={cn(
              "cursor-pointer transition-all text-xs",
              selectedTags.includes(tag)
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border hover:border-primary text-muted-foreground hover:text-foreground"
            )}
            onClick={() => onTagToggle(tag)}
          >
            {tag}
          </Badge>
        ))}
        {selectedTags.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearTags}
            className="text-xs text-muted-foreground hover:text-foreground h-6 px-2"
          >
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
