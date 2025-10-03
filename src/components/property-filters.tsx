"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface PropertyFiltersProps {
  onNameChange: (value: string) => void;
  onAddressChange: (value: string) => void;
  onPriceRangeChange: (value: number[]) => void;
}

export function PropertyFilters({
  onNameChange,
  onAddressChange,
  onPriceRangeChange,
}: PropertyFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 10000000]);

  useEffect(() => {
    onPriceRangeChange?.(priceRange);
  }, [onPriceRangeChange, priceRange]);

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
              onChange={(e) => onNameChange(e.target.value)}
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
              onChange={(e) => onAddressChange(e.target.value)}
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
