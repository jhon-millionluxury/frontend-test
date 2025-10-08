import { Badge } from "@/components/ui/badge";
import { PropertyDto } from "@/lib/dtos";
import { formatPrice } from "@/lib/utils";
import { MapPin } from "lucide-react";

interface PropertyDetailPagePropertyHeaderProps {
  property: Partial<PropertyDto>;
}

const PropertyDetailPagePropertyHeader = ({
  property,
}: PropertyDetailPagePropertyHeaderProps) => {
  const { name, address, price, featured } = property;

  return (
    <div className="mb-8">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground text-balance lg:text-5xl">
            {name}
          </h1>
          <div className="mt-2 flex items-start gap-2 text-lg text-muted-foreground">
            <MapPin className="mt-1 h-5 w-5 shrink-0" />
            <span>{address}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="font-serif text-4xl font-semibold text-primary lg:text-5xl">
            {formatPrice(price || 0)}
          </p>

          {featured && (
            <Badge className="mt-2 bg-primary text-primary-foreground">
              Featured Property
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPagePropertyHeader;
