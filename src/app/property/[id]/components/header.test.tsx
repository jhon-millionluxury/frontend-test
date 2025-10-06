/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import PropertyDetailPageHeader from "./header";

// Mockeamos ThemeToggle para no depender de su implementación interna
jest.mock("../../../../components/theme/theme-toggle", () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">ThemeToggle</div>,
}));

// Mock opcional para lucide-react (íconos)
jest.mock("lucide-react", () => ({
  Building2: (props: any) => <svg data-testid="building-icon" {...props} />,
}));

describe("PropertyDetailPageHeader", () => {
  it("renders title, subtitle, icon and theme toggle", () => {
    render(<PropertyDetailPageHeader />);

    expect(
      screen.getByRole("heading", { name: /Prestige Properties/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Luxury Real Estate Collection/i)
    ).toBeInTheDocument();

    expect(screen.getByTestId("building-icon")).toBeInTheDocument();

    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
  });
});
