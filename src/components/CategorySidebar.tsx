import { useState } from "react";
import { ChevronRight, Terminal, TrendingUp, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories, type Category, type Subcategory } from "@/data/templates";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Terminal,
  TrendingUp,
  Globe,
};

interface CategorySidebarProps {
  isOpen: boolean;
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  onSelectCategory: (categoryId: string) => void;
  onSelectSubcategory: (subcategoryId: string) => void;
}

const CategorySidebar = ({
  isOpen,
  selectedCategory,
  selectedSubcategory,
  onSelectCategory,
  onSelectSubcategory,
}: CategorySidebarProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: Category) => {
    if (expandedCategory === category.id) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category.id);
    }
    onSelectCategory(category.id);
  };

  const handleSubcategoryClick = (subcategory: Subcategory, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectSubcategory(subcategory.id);
  };

  if (!isOpen) return null;

  return (
    <aside className="w-64 border-r border-border bg-sidebar shrink-0 overflow-y-auto animate-slide-in-left">
      <nav className="p-3">
        <h2 className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-3 py-2">
          Categories
        </h2>
        <ul className="space-y-1">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Terminal;
            const isExpanded = expandedCategory === category.id;
            const isSelected = selectedCategory === category.id;

            return (
              <li key={category.id}>
                <button
                  onClick={() => handleCategoryClick(category)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all",
                    "hover:bg-sidebar-accent",
                    (isSelected || (selectedSubcategory && category.subcategories.some(s => s.id === selectedSubcategory))) &&
                      "bg-sidebar-accent text-primary"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1 text-left truncate">{category.name}</span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 shrink-0 transition-transform duration-200",
                      isExpanded && "rotate-90"
                    )}
                  />
                </button>

                {isExpanded && (
                  <ul className="ml-4 pl-4 border-l border-border mt-1 space-y-1 animate-fade-in">
                    {category.subcategories.map((sub) => (
                      <li key={sub.id}>
                        <button
                          onClick={(e) => handleSubcategoryClick(sub, e)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-md text-sm transition-all",
                            "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent",
                            selectedSubcategory === sub.id && "text-primary bg-sidebar-accent"
                          )}
                        >
                          {sub.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default CategorySidebar;
