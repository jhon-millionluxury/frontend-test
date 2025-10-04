import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Label } from "./label";

describe("Label component", () => {
  it("renders with default styles", () => {
    render(<Label>Username</Label>);
    const label = screen.getByText("Username");
    expect(label).toBeInTheDocument();
    expect(label.tagName.toLowerCase()).toBe("label");
    expect(label).toHaveClass(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    );
  });

  it("accepts custom className", () => {
    render(<Label className="custom-class">Email</Label>);
    const label = screen.getByText("Email");
    expect(label).toHaveClass("custom-class");
  });

  it("associates correctly with input using htmlFor", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Label htmlFor="password">Password</Label>
        <input id="password" type="password" />
      </div>
    );

    const input = screen.getByLabelText("Password") as HTMLInputElement;
    expect(input).toBeInTheDocument();

    await user.type(input, "secret");
    expect(input.value).toBe("secret");
  });
});
