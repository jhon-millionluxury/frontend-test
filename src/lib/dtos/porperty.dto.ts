export interface PropertyDto {
  id: number;
  name: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
  features: string[];
  description: string;
  yearBuilt: number;
  lotSize: number;
  propertyType: string;
  gallery: string[];
  featured: boolean;
}
