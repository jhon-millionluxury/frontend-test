import { PropertyDto } from "@/lib/dtos/porperty.dto";
import Image from "next/image";

interface PropertyDetailPageImagesGridProps {
  property: Partial<PropertyDto>;
}

const PropertyDetailPageImagesGrid = ({
  property,
}: PropertyDetailPageImagesGridProps) => {
  return (
    <div className="mb-12 grid gap-4 md:grid-cols-2">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted md:col-span-2">
        <Image
          src={property.image || "/placeholder.svg"}
          alt={property.name + " - Image"}
          fill
          className="object-cover"
        />
      </div>

      {property?.gallery?.slice(1, 3).map((img, idx) => (
        <div
          key={idx}
          className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted"
        >
          <Image
            src={img || "/placeholder.svg"}
            alt={`${property.name} - Gallery ${idx + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default PropertyDetailPageImagesGrid;
