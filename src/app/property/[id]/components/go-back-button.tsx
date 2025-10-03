import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const PropertyDetailPageGoBackButton = () => {
  return (
    <Link href="/">
      <Button variant="ghost" className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Properties
      </Button>
    </Link>
  );
};

export default PropertyDetailPageGoBackButton;
