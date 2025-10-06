import { render, screen, fireEvent } from "@testing-library/react";
import { PropertyFilters } from "./property-filters";

type SliderProps = {
  value: number[];
  onValueChange: (value: number[]) => void;
  max?: number;
  step?: number;
};

jest.mock("../components/ui/slider", () => ({
  Slider: ({ value, onValueChange, max, step }: SliderProps) => (
    <input
      type="range"
      data-testid="mock-slider"
      value={value[0]}
      max={max}
      step={step}
      onChange={(e) => onValueChange([Number(e.target.value), value[1]])}
    />
  ),
}));

describe("PropertyFilters", () => {
  let onNameChange: jest.Mock;
  let onAddressChange: jest.Mock;
  let onPriceRangeChange: jest.Mock;

  beforeEach(() => {
    onNameChange = jest.fn();
    onAddressChange = jest.fn();
    onPriceRangeChange = jest.fn();
  });

  it("renders correctly", () => {
    render(
      <PropertyFilters
        onNameChange={onNameChange}
        onAddressChange={onAddressChange}
        onPriceRangeChange={onPriceRangeChange}
      />
    );

    expect(screen.getByText(/Filter Properties/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Property Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();

    expect(screen.getByText("$0")).toBeInTheDocument();
    expect(screen.getByText("$10,000,000")).toBeInTheDocument();
  });

  it("calls onNameChange when typing in property name input", () => {
    render(
      <PropertyFilters
        onNameChange={onNameChange}
        onAddressChange={onAddressChange}
        onPriceRangeChange={onPriceRangeChange}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/Search by name/i), {
      target: { value: "Luxury Villa" },
    });

    expect(onNameChange).toHaveBeenCalledWith("Luxury Villa");
  });

  it("calls onAddressChange when typing in address input", () => {
    render(
      <PropertyFilters
        onNameChange={onNameChange}
        onAddressChange={onAddressChange}
        onPriceRangeChange={onPriceRangeChange}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/Search by address/i), {
      target: { value: "Miami" },
    });

    expect(onAddressChange).toHaveBeenCalledWith("Miami");
  });

  it("calls onPriceRangeChange when slider changes", () => {
    render(
      <PropertyFilters
        onNameChange={onNameChange}
        onAddressChange={onAddressChange}
        onPriceRangeChange={onPriceRangeChange}
      />
    );

    const slider = screen.getByTestId("mock-slider");

    fireEvent.change(slider, { target: { value: "5000000" } });

    expect(onPriceRangeChange).toHaveBeenCalledWith([5000000, 10000000]);
  });
});
