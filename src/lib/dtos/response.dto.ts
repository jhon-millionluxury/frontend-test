import { PropertyDto } from "./property.dto";

export interface ResponseDto {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  items: PropertyDto[];
}
