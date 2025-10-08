import { render, screen } from "@testing-library/react";
import { PropertyCard } from "@/components/property-card";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { PropertyDto } from "@/lib/properties-local-data";
import { ComponentProps, ComponentType, PropsWithChildren } from "react";
import { LinkProps } from "next/link";

jest.mock("next/image", () => {
  type ImgProps = ComponentProps<"img"> & {
    fill?: boolean;
  };

  const MockImage = ({ fill, style, ...props }: ImgProps) => {
    const mockStyle = fill
      ? { width: "100%", height: "100%", ...style }
      : style;

    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} style={mockStyle} alt={props.alt} />;
  };

  MockImage.displayName = "NextImage";

  return MockImage;
});

// Mock next/link para evitar problemas de routing en test
jest.mock("next/link", () => {
  const MockLink: ComponentType<PropsWithChildren<LinkProps>> = ({
    children,
    href,
  }) => (
    <a
      href={typeof href === "string" ? href : String(href)}
      onClick={(e) => e.preventDefault()}
    >
      {children}
    </a>
  );

  MockLink.displayName = "NextImage";

  return MockLink;
});

const mockProperty: PropertyDto = {
  id: 1,
  name: "Luxury Villa",
  address: "123 Palm Street",
  price: 1200000,
  bedrooms: 4,
  bathrooms: 3,
  sqft: 3500,
  image: "string",
  features: ["Pool", "Garage", "Garden"],
  description: "string",
  yearBuilt: 2,
  lotSize: 3,
  propertyType: "string",
  gallery: [],
  featured: true,
};

describe("PropertyCard", () => {
  it("renders property details correctly", () => {
    render(<PropertyCard property={mockProperty} />);

    expect(
      screen.getByRole("heading", { name: /Luxury Villa/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/123 Palm Street/i)).toBeInTheDocument();

    expect(screen.getByText("$1,200,000")).toBeInTheDocument();

    expect(screen.getByText(/4 Beds/i)).toBeInTheDocument();

    expect(screen.getByText(/3 Baths/i)).toBeInTheDocument();

    expect(screen.getByText(/3,500 sqft/i)).toBeInTheDocument();
  });

  it("renders features as badges", () => {
    render(<PropertyCard property={mockProperty} />);

    expect(screen.getByText("Pool")).toBeInTheDocument();
    expect(screen.getByText("Garage")).toBeInTheDocument();
    expect(screen.getByText("Garden")).toBeInTheDocument();
  });

  it("renders Featured badge if property is featured", () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText("Featured")).toBeInTheDocument();
  });

  it("renders link to property details", async () => {
    render(<PropertyCard property={mockProperty} />);
    const link = screen.getByRole("link", { name: /View Details/i });
    expect(link).toHaveAttribute("href", "/property/1");
    await userEvent.click(link);
  });

  it("does not render Featured badge if not featured", () => {
    render(<PropertyCard property={{ ...mockProperty, featured: false }} />);
    expect(screen.queryByText("Featured")).not.toBeInTheDocument();
  });
});
