"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/lib/utils";

interface PropertyFiltersProps {
  onNameChange?: (name: string) => void;
  onAddressChange?: (address: string) => void;
  onPriceRangeChange?: (range: number[]) => void;
  name: string;
  address: string;
  priceRangeFilter: number[];
}

export function PropertyFilters({
  onNameChange,
  onAddressChange,
  onPriceRangeChange,
  name: nameFilter,
  address: addressFilter,
  priceRangeFilter,
}: PropertyFiltersProps) {
  const [name, setName] = useState(nameFilter);
  const [address, setAddress] = useState(addressFilter);
  const [priceRange, setPriceRange] = useState(priceRangeFilter);

  // Debounce delay
  const DEBOUNCE_DELAY = 1000;

  // Debounce para name
  useEffect(() => {
    const handler = setTimeout(() => {
      onNameChange?.(name);
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(handler);
  }, [name, onNameChange]);

  // Debounce para address
  useEffect(() => {
    const handler = setTimeout(() => {
      onAddressChange?.(address);
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(handler);
  }, [address, onAddressChange]);

  // Debounce para price range
  useEffect(() => {
    const handler = setTimeout(() => {
      onPriceRangeChange?.(priceRange);
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(handler);
  }, [priceRange, onPriceRangeChange]);

  return (
    <div className="mb-8 rounded-lg border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-6 font-serif text-xl font-semibold text-card-foreground">
        Filter Properties
      </h3>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="property-name" className="text-sm font-medium">
            Property Name
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="property-name"
              type="text"
              placeholder="Search by name..."
              className="pl-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-sm font-medium">
            Address
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="address"
              type="text"
              placeholder="Search by address..."
              className="pl-10"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4 md:col-span-2 lg:col-span-1">
          <Label className="text-sm font-medium">Price Range</Label>
          <div className="space-y-3">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={10000000}
              step={100000}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
