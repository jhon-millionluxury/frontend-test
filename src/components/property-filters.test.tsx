import { render, screen, fireEvent, act } from "@testing-library/react";
import { PropertyFilters } from "./property-filters";

type SliderProps = {
  value: number[];
  onValueChange: (value: number[]) => void;
  max?: number;
  step?: number;
};

jest.mock("../components/ui/slider", () => ({
  __esModule: true,
  Slider: ({ onValueChange, value, max }: SliderProps) => (
    <input
      data-testid="mock-slider"
      type="range"
      min={0}
      max={max || 10000000}
      value={value[0]}
      onChange={(e) => onValueChange([Number(e.target.value), value[1]])}
    />
  ),
}));

describe("PropertyFilters", () => {
  let onNameChange: jest.Mock;
  let onAddressChange: jest.Mock;
  let onPriceRangeChange: jest.Mock;
  const name = "";
  const address = "";
  const priceRange = [0, 10000000];

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    onNameChange = jest.fn();
    onAddressChange = jest.fn();
    onPriceRangeChange = jest.fn();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("renders correctly", () => {
    render(
      <PropertyFilters
        onNameChange={onNameChange}
        onAddressChange={onAddressChange}
        onPriceRangeChange={onPriceRangeChange}
        name={name}
        address={address}
        priceRangeFilter={priceRange}
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
        name={name}
        address={address}
        priceRangeFilter={priceRange}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/Search by name/i), {
      target: { value: "Luxury Villa" },
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(onNameChange).toHaveBeenCalledWith("Luxury Villa");
  });

  it("calls onAddressChange when typing in address input", () => {
    render(
      <PropertyFilters
        onNameChange={onNameChange}
        onAddressChange={onAddressChange}
        onPriceRangeChange={onPriceRangeChange}
        name={name}
        address={address}
        priceRangeFilter={priceRange}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/Search by address/i), {
      target: { value: "Miami" },
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(onAddressChange).toHaveBeenCalledWith("Miami");
  });

  it("calls onPriceRangeChange when slider changes", () => {
    render(
      <PropertyFilters
        onNameChange={onNameChange}
        onAddressChange={onAddressChange}
        onPriceRangeChange={onPriceRangeChange}
        name={name}
        address={address}
        priceRangeFilter={priceRange}
      />
    );

    const slider = screen.getByTestId("mock-slider");

    fireEvent.change(slider, { target: { value: "5000000" } });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(onPriceRangeChange).toHaveBeenCalledWith([5000000, 10000000]);
  });
});
