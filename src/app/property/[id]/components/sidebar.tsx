import { Bed, Bath, Maximize, Calendar, Ruler, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { Property } from "@/lib/properties-data";

interface PropertyDetailPageSidebarProps {
  property: Partial<Property>;
}

const PropertyDetailPageSidebar = ({
  property,
}: PropertyDetailPageSidebarProps) => {
  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-8">
        <CardContent className="p-6">
          <h2 className="mb-6 font-serif text-xl font-semibold text-foreground">
            Property Details
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Bed className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm">Bedrooms</p>
                <p className="font-semibold text-foreground">
                  {property.bedrooms}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Bath className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm">Bathrooms</p>
                <p className="font-semibold text-foreground">
                  {property.bathrooms}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Maximize className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm">Square Feet</p>
                <p className="font-semibold text-foreground">
                  {formatNumber(property.sqft || 0)} sqft
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Ruler className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm">Lot Size</p>
                <p className="font-semibold text-foreground">
                  {formatNumber(property.lotSize || 0)} sqft
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm">Year Built</p>
                <p className="font-semibold text-foreground">
                  {property.yearBuilt}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Home className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm">Property Type</p>
                <p className="font-semibold text-foreground">
                  {property.propertyType}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <Button className="w-full" size="lg">
              Schedule a Viewing
            </Button>
            <Button
              className="w-full bg-transparent"
              variant="outline"
              size="lg"
            >
              Contact Agent
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyDetailPageSidebar;
