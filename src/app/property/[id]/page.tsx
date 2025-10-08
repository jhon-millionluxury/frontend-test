"use client";

import { notFound, useParams } from "next/navigation";
import PropertyDetailPageDescriptionCard from "./components/description-card";
import PropertyDetailPageFeaturesCard from "./components/features-card";
import PropertyDetailPageGoBackButton from "./components/go-back-button";
import PropertyDetailPageHeader from "./components/header";
import PropertyDetailPageImagesGrid from "./components/images-grid";
import PropertyDetailPagePropertyHeader from "./components/property-header";
import PropertyDetailPageSidebar from "./components/sidebar";
import { useQuery } from "@tanstack/react-query";
import { getPropertyById } from "@/lib/api/getPropertyById";
import LuxuryLoader from "@/components/luxury-loader";
import LuxuryError from "@/components/luxury-error";

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: property,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["propertyById", id],
    queryFn: () => getPropertyById(id),
  });

  if (isLoading) return <LuxuryLoader text="Loading property details..." />;
  if (error) return <LuxuryError />;

  if (!property) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <PropertyDetailPageHeader />

      <main className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
        <PropertyDetailPageGoBackButton />

        <PropertyDetailPagePropertyHeader property={property} />

        <PropertyDetailPageImagesGrid property={property} />

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PropertyDetailPageDescriptionCard
              description={property.description}
            />

            <PropertyDetailPageFeaturesCard features={property.features} />
          </div>

          <PropertyDetailPageSidebar property={property} />
        </div>
      </main>
    </div>
  );
}
