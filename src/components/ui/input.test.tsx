import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./input";

describe("Input component", () => {
  it("renders input with data-slot", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("data-slot", "input");
  });

  it("accepts type prop (password)", () => {
    const { container } = render(<Input type="password" />);

    const input = container.querySelector(
      'input[type="password"]'
    ) as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "password");
  });

  it("accepts placeholder", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("custom-class");
  });

  it("respects disabled prop", () => {
    render(<Input disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  it("allows typing text", () => {
    render(<Input placeholder="Type here" />);
    const input = screen.getByPlaceholderText("Type here") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "hello" } });
    expect(input.value).toBe("hello");
  });
});
