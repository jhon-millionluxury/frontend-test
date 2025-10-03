import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface PropertyDetailPageFeaturesCardProps {
  features: string[];
}

const PropertyDetailPageFeaturesCard = ({
  features,
}: PropertyDetailPageFeaturesCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
          Premium Features
        </h2>
        <div className="flex flex-wrap gap-2">
          {features?.map((feature) => (
            <Badge
              key={feature}
              variant="secondary"
              className="px-4 py-2 text-sm"
            >
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyDetailPageFeaturesCard;
