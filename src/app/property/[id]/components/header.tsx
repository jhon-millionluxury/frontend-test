import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Building2 } from "lucide-react";

const PropertyDetailPageHeader = () => {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            <div>
              <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
                Prestige Properties
              </h1>
              <p className="text-sm text-muted-foreground">
                Luxury Real Estate Collection
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default PropertyDetailPageHeader;
