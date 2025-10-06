import { properties } from "@/lib/properties-data";
import { notFound } from "next/navigation";
import PropertyDetailPageDescriptionCard from "./components/description-card";
import PropertyDetailPageFeaturesCard from "./components/features-card";
import PropertyDetailPageGoBackButton from "./components/go-back-button";
import PropertyDetailPageHeader from "./components/header";
import PropertyDetailPageImagesGrid from "./components/images-grid";
import PropertyDetailPagePropertyHeader from "./components/property-header";
import PropertyDetailPageSidebar from "./components/sidebar";

export async function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id.toString(),
  }));
}

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const { id } = await params;

  const property = await Promise.resolve(
    properties.find((p) => p.id === Number.parseInt(id))
  );

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
