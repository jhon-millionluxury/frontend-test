import { PropertyCard } from "@/components/property-card";
import { ResponseDto } from "@/lib/dtos";
import { Pagination } from "@/components/pagination";

interface PropertyGridProps {
  apiResponse: ResponseDto;
  currentPage: number;
  onSetCurrentPage: (page: number) => void;
  pageSize: number;
}

export function PropertyGrid({
  apiResponse,
  currentPage,
  onSetCurrentPage,
  pageSize,
}: PropertyGridProps) {
  const { items: properties, totalPages, totalResults } = apiResponse;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(endIndex, totalResults)} of{" "}
          {totalResults} properties
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onSetCurrentPage}
        />
      )}
    </div>
  );
}
