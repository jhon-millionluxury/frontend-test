import { render, screen } from "@testing-library/react";
import { formatPrice } from "@/lib/utils";
import PropertyDetailPagePropertyHeader from "./property-header";

describe("PropertyDetailPagePropertyHeader", () => {
  const baseProperty = {
    name: "Luxury Villa",
    address: "742 Evergreen Terrace, Springfield",
    price: 250000,
  };

  it("renders property details correctly", () => {
    render(<PropertyDetailPagePropertyHeader property={baseProperty} />);

    expect(
      screen.getByRole("heading", { name: /luxury villa/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText("742 Evergreen Terrace, Springfield")
    ).toBeInTheDocument();

    expect(screen.getByText(formatPrice(250000))).toBeInTheDocument();
  });

  it("renders 'Featured Property' badge when featured is true", () => {
    render(
      <PropertyDetailPagePropertyHeader
        property={{ ...baseProperty, featured: true }}
      />
    );

    expect(screen.getByText("Featured Property")).toBeInTheDocument();
  });

  it("does not render 'Featured Property' badge when featured is false", () => {
    render(
      <PropertyDetailPagePropertyHeader
        property={{ ...baseProperty, featured: false }}
      />
    );

    expect(screen.queryByText("Featured Property")).not.toBeInTheDocument();
  });
});
