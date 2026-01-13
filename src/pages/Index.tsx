import { useState, useMemo } from "react";
import { ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import InputPanel from "@/components/InputPanel";
import CategorySidebar from "@/components/CategorySidebar";
import TemplateCard from "@/components/TemplateCard";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";
import { getTemplatesByFilter, searchTemplates, getAllTags, categories } from "@/data/templates";
import { Button } from "@/components/ui/button";

interface InputValues {
  lhost: string;
  rhost: string;
  port: string;
  url: string;
  wordlistPath: string;
}

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [inputValues, setInputValues] = useState<InputValues>({
    lhost: "",
    rhost: "",
    port: "",
    url: "",
    wordlistPath: "",
  });

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
  };

  const handleSubcategorySelect = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
  };

  const handleLogoClick = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSearchQuery("");
    setSelectedTags([]);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const renderTemplate = (template: string): string => {
    let rendered = template;
    rendered = rendered.replace(/{{LHOST}}/g, inputValues.lhost || "{{LHOST}}");
    rendered = rendered.replace(/{{RHOST}}/g, inputValues.rhost || "{{RHOST}}");
    rendered = rendered.replace(/{{PORT}}/g, inputValues.port || "{{PORT}}");
    rendered = rendered.replace(/{{URL}}/g, inputValues.url || "{{URL}}");
    rendered = rendered.replace(/{{WORDLIST_PATH}}/g, inputValues.wordlistPath || "{{WORDLIST_PATH}}");
    return rendered;
  };

  const filteredTemplates = useMemo(() => {
    // Don't show any templates on initial state (no category/subcategory selected)
    if (!selectedCategory && !selectedSubcategory && !searchQuery && selectedTags.length === 0) {
      return [];
    }

    let templates = getTemplatesByFilter(
      selectedCategory || undefined,
      selectedSubcategory || undefined
    );

    if (searchQuery) {
      templates = searchTemplates(searchQuery, templates);
    }

    if (selectedTags.length > 0) {
      templates = templates.filter((t) =>
        selectedTags.every((tag) => t.tags.includes(tag))
      );
    }

    return templates;
  }, [selectedCategory, selectedSubcategory, searchQuery, selectedTags]);

  const availableTags = useMemo(() => getAllTags(), []);

  // Get the current subcategory data
  const currentSubcategory = useMemo(() => {
    if (!selectedCategory || !selectedSubcategory) return null;
    const category = categories.find(c => c.id === selectedCategory);
    return category?.subcategories.find(s => s.id === selectedSubcategory) || null;
  }, [selectedCategory, selectedSubcategory]);

  // Check if Web Enumeration is selected
  const showWordlistPath = selectedCategory === "web-enumeration";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onLogoClick={handleLogoClick} />

      <div className="flex flex-1 overflow-hidden">
        <CategorySidebar
          isOpen={sidebarOpen}
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          onSelectCategory={handleCategorySelect}
          onSelectSubcategory={handleSubcategorySelect}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <InputPanel
            values={inputValues}
            onChange={setInputValues}
            showWordlistPath={showWordlistPath}
          />

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedTags={selectedTags}
            availableTags={availableTags}
            onTagToggle={handleTagToggle}
            onClearTags={() => setSelectedTags([])}
          />

          {/* Subcategory title */}
          {currentSubcategory && (
            <div className="mb-4 mt-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-foreground">
                  {currentSubcategory.name}
                </h2>
                {currentSubcategory.infoUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="gap-1.5"
                  >
                    <a
                      href={currentSubcategory.infoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      More Info
                    </a>
                  </Button>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {filteredTemplates.length} template{filteredTemplates.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}

          {!selectedCategory && !selectedSubcategory && !searchQuery && selectedTags.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Select a category to view commands.</p>
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No templates found matching your criteria.</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your filters or search query.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  title={template.title}
                  description={template.description}
                  template={template.template}
                  tags={template.tags}
                  renderedTemplate={renderTemplate(template.template)}
                  extraOptions={template.extraOptions}
                  isBrowser={template.isBrowser}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
