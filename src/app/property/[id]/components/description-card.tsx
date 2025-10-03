import { Card, CardContent } from "@/components/ui/card";

interface PropertyDetailPageDescriptionCardProps {
  description: string;
}

const PropertyDetailPageDescriptionCard = ({
  description,
}: PropertyDetailPageDescriptionCardProps) => {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
          About This Property
        </h2>
        <p className="leading-relaxed text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default PropertyDetailPageDescriptionCard;
