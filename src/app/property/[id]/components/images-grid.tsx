import { PropertyDto } from "@/lib/dtos";
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
          src={property.images?.[0]?.file || "/placeholder.svg"}
          alt={property.name + " - Image"}
          fill
          className="object-cover"
          priority
        />
      </div>

      {property?.images?.slice(1, 3).map((img, idx) => (
        <div
          key={idx}
          className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted"
        >
          <Image
            src={img.file || "/placeholder.svg"}
            alt={`${property.name} - Gallery ${idx + 1}`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>
      ))}
    </div>
  );
};

export default PropertyDetailPageImagesGrid;
