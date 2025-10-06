import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Maximize, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PropertyDto } from "@/lib/dtos/porperty.dto";
import { formatNumber, formatPrice } from "@/lib/utils";

interface PropertyCardProps {
  property: PropertyDto;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={property.image || "/placeholder.svg"}
          alt={property.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {property.featured && (
          <div className="absolute right-3 top-3">
            <Badge className="bg-primary text-primary-foreground shadow-md">
              Featured
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <div className="mb-3">
          <h3 className="font-serif text-xl font-semibold text-card-foreground text-balance">
            {property.name}
          </h3>
          <div className="mt-1 flex items-start gap-1.5 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="line-clamp-2">{property.address}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="font-serif text-2xl font-semibold text-primary">
            {formatPrice(property.price)}
          </p>
        </div>

        <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Bed className="h-4 w-4" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="h-4 w-4" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="h-4 w-4" />
            <span>{formatNumber(property.sqft)} sqft</span>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {property.features.map((feature) => (
            <Badge
              key={feature}
              variant="secondary"
              className="text-xs font-normal"
            >
              {feature}
            </Badge>
          ))}
        </div>

        <Link href={`/property/${property.id}`}>
          <Button className="w-full bg-transparent" variant="outline">
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
