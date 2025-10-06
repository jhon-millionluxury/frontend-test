/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import PropertyDetailPageFeaturesCard from "@/app/property/[id]/components/features-card";

// Mockear dependencias UI para simplificar
jest.mock("../../../../components/ui/card", () => ({
  Card: ({ children, ...props }: any) => (
    <div data-testid="card" {...props}>
      {children}
    </div>
  ),
  CardContent: ({ children, ...props }: any) => (
    <div data-testid="card-content" {...props}>
      {children}
    </div>
  ),
}));

jest.mock("../../../../components/ui/badge", () => ({
  Badge: ({ children, ...props }: any) => (
    <span data-testid="badge" {...props}>
      {children}
    </span>
  ),
}));

describe("PropertyDetailPageFeaturesCard", () => {
  it("renders heading correctly", () => {
    render(<PropertyDetailPageFeaturesCard features={["Pool", "Garage"]} />);
    expect(screen.getByText("Premium Features")).toBeInTheDocument();
  });

  it("renders a badge for each feature", () => {
    const features = ["Pool", "Garage", "Garden"];
    render(<PropertyDetailPageFeaturesCard features={features} />);

    features.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });

    expect(screen.getAllByTestId("badge")).toHaveLength(features.length);
  });

  it("handles empty features gracefully", () => {
    render(<PropertyDetailPageFeaturesCard features={[]} />);

    expect(screen.getByText("Premium Features")).toBeInTheDocument();

    expect(screen.queryByTestId("badge")).not.toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <PropertyDetailPageFeaturesCard features={["Balcony", "WiFi"]} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
