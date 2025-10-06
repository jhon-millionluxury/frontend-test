import { render, screen } from "@testing-library/react";
import { formatNumber } from "@/lib/utils";
import PropertyDetailPageSidebar from "./sidebar";

describe("PropertyDetailPageSidebar", () => {
  const mockProperty = {
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1500,
    lotSize: 4000,
    yearBuilt: 1995,
    propertyType: "House",
  };

  it("renders all property details correctly", () => {
    render(<PropertyDetailPageSidebar property={mockProperty} />);

    expect(screen.getByText("Property Details")).toBeInTheDocument();

    expect(screen.getByText("Bedrooms")).toBeInTheDocument();

    expect(
      screen.getByText(mockProperty.bedrooms.toString())
    ).toBeInTheDocument();

    expect(screen.getByText("Bathrooms")).toBeInTheDocument();

    expect(
      screen.getByText(mockProperty.bathrooms.toString())
    ).toBeInTheDocument();

    expect(screen.getByText("Square Feet")).toBeInTheDocument();

    expect(
      screen.getByText(`${formatNumber(mockProperty.sqft)} sqft`)
    ).toBeInTheDocument();

    expect(screen.getByText("Lot Size")).toBeInTheDocument();

    expect(
      screen.getByText(`${formatNumber(mockProperty.lotSize)} sqft`)
    ).toBeInTheDocument();

    expect(screen.getByText("Year Built")).toBeInTheDocument();

    expect(
      screen.getByText(mockProperty.yearBuilt.toString())
    ).toBeInTheDocument();

    expect(screen.getByText("Property Type")).toBeInTheDocument();

    expect(screen.getByText(mockProperty.propertyType)).toBeInTheDocument();
  });

  it("renders the action buttons", () => {
    render(<PropertyDetailPageSidebar property={mockProperty} />);

    expect(
      screen.getByRole("button", { name: /schedule a viewing/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /contact agent/i })
    ).toBeInTheDocument();
  });
});
