import { ImagePropertyDto } from "./imageProperty.dto";

export interface PropertyDto {
  id: string;
  idProperty: string;
  name: string;
  images: ImagePropertyDto[];
  address: string;
  price: number;
  year: number;
  description: string;
  features: string[];
  featured: boolean;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
}
