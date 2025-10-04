"use client";

import { PropertyFilters } from "@/components/property-filters";
import { PropertyGrid } from "@/components/property-grid";
import { Building2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCharacters } from "@/lib/api/character";
import { ResponseDto } from "@/lib/dtos/response.dto";

export default function PropertiesPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000000]);

  const { data, isLoading, error } = useQuery<ResponseDto>({
    queryKey: ["characters"],
    queryFn: getCharacters,
  });

  useEffect(() => {
    console.log(name, address, priceRange);
  }, [name, address, priceRange]);

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error 😢</p>;

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

      <ul>
        {data?.results?.map((character) => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>

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
        />

        <PropertyGrid />
      </main>
    </div>
  );
}
