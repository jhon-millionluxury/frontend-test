import { render, screen } from "@testing-library/react";
import { Badge } from "./badge";

describe("Badge component", () => {
  it("renders with default variant", () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText("Default Badge");

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute("data-slot", "badge");
    expect(badge.className).toContain("text-primary-foreground");
  });

  it("renders with secondary variant", () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>);
    const badge = screen.getByText("Secondary Badge");

    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain("bg-secondary");
  });

  it("renders with custom className", () => {
    render(<Badge className="custom-class">Custom Badge</Badge>);
    const badge = screen.getByText("Custom Badge");

    expect(badge.className).toContain("custom-class");
  });

  it("renders as child element when asChild is true", () => {
    render(
      <Badge asChild>
        <a href="/test">Child Link</a>
      </Badge>
    );
    const link = screen.getByRole("link", { name: "Child Link" });

    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe("A");
  });
});
