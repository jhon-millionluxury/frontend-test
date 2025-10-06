/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import PropertyDetailPageGoBackButton from "@/app/property/[id]/components/go-back-button";

// Mock de next/link
jest.mock("next/link", () => {
  const Link = ({ children, href }: any) => (
    <a href={href} data-testid="link">
      {children}
    </a>
  );
  Link.displayName = "MockNextLink";
  return Link;
});

// Mock de Button
jest.mock("../../../../components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button data-testid="button" {...props}>
      {children}
    </button>
  ),
}));

// Mock de ArrowLeft (ícono)
jest.mock("lucide-react", () => ({
  ArrowLeft: (props: any) => <svg data-testid="icon" {...props} />,
}));

describe("PropertyDetailPageGoBackButton", () => {
  it("renders the button text correctly", () => {
    render(<PropertyDetailPageGoBackButton />);
    expect(screen.getByText("Back to Properties")).toBeInTheDocument();
  });

  it("wraps the button inside a Link to home", () => {
    render(<PropertyDetailPageGoBackButton />);
    const link = screen.getByTestId("link");
    expect(link).toHaveAttribute("href", "/");
    expect(screen.getByTestId("button")).toBeInTheDocument();
  });

  it("renders the ArrowLeft icon", () => {
    render(<PropertyDetailPageGoBackButton />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<PropertyDetailPageGoBackButton />);
    expect(asFragment()).toMatchSnapshot();
  });
});
