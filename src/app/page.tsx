"use client";

import { PropertyFilters } from "@/components/property-filters";
import { PropertyGrid } from "@/components/property-grid";
import { Building2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProperties } from "@/lib/api/getProperties";
import LuxuryLoader from "@/components/luxury-loader";
import LuxuryError from "@/components/luxury-error";

const ITEMS_PER_PAGE = 10;

export default function PropertiesPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000000]);

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["properties", name, address, priceRange, currentPage],
    queryFn: () =>
      getProperties({
        name,
        address,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        page: currentPage,
        pageSize: ITEMS_PER_PAGE,
      }),
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [name, address, priceRange]);

  if (error) return <LuxuryError />;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-primary" />
              <div>
                <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
                  Prestige Properties
                </h1>
                <p className="text-sm text-muted-foreground">
                  Luxury Real Estate Collection
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
        <div className="mb-8">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground text-balance lg:text-4xl">
            Discover Exceptional Properties
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Curated collection of the finest luxury estates
          </p>
        </div>

        <PropertyFilters
          onNameChange={setName}
          onAddressChange={setAddress}
          onPriceRangeChange={setPriceRange}
          name={name}
          address={address}
          priceRangeFilter={priceRange}
        />

        {isLoading && <LuxuryLoader />}

        {data && (
          <PropertyGrid
            apiResponse={data}
            currentPage={currentPage}
            onSetCurrentPage={setCurrentPage}
            pageSize={ITEMS_PER_PAGE}
          />
        )}
      </main>
    </div>
  );
}
