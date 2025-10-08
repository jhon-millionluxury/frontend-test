import { render, screen } from "@testing-library/react";
import { formatNumber } from "@/lib/utils";
import PropertyDetailPageSidebar from "./sidebar";

describe("PropertyDetailPageSidebar", () => {
  const mockProperty = {
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1500,
    year: 1995,
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

    expect(screen.getByText("Year Built")).toBeInTheDocument();

    expect(screen.getByText(mockProperty.year.toString())).toBeInTheDocument();
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
