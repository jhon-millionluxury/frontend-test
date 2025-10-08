import { render, screen } from "@testing-library/react";
import PropertyDetailPage from "./page";
import { properties } from "@/lib/properties-local-data";
import { notFound, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("../../../components/luxury-loader", () => ({
  __esModule: true,
  default: ({ text }: { text: string }) => (
    <div data-testid="loader">{text}</div>
  ),
}));

jest.mock("../../../components/luxury-error", () => ({
  __esModule: true,
  default: () => <div data-testid="error">Error loading property</div>,
}));

jest.mock("../../../lib/properties-local-data", () => ({
  properties: [
    {
      id: "1",
      name: "Luxury Villa",
      description: "A beautiful luxury villa.",
      features: ["Pool", "Garden", "Garage"],
    },
  ],
}));

describe("PropertyDetailPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loader when loading", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    render(<PropertyDetailPage />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(notFound).not.toHaveBeenCalled();
  });

  it("renders error when query fails", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: new Error("Something went wrong"),
      data: null,
    });

    render(<PropertyDetailPage />);

    expect(screen.getByTestId("error")).toBeInTheDocument();
    expect(notFound).not.toHaveBeenCalled();
  });

  it("renders property details when data is available", () => {
    const property = properties[0];
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: property,
    });

    render(<PropertyDetailPage />);

    expect(
      screen.getByText("Luxury Real Estate Collection")
    ).toBeInTheDocument();

    expect(screen.getByText("Back to Properties")).toBeInTheDocument();

    expect(screen.getByText(property.name)).toBeInTheDocument();

    expect(screen.getByText(property.description)).toBeInTheDocument();

    property.features.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });

    expect(screen.getByText("Property Details")).toBeInTheDocument();

    expect(notFound).not.toHaveBeenCalled();
  });

  it("calls notFound when property does not exist", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "99" });
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: null,
    });

    try {
      render(<PropertyDetailPage />);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    expect(notFound).toHaveBeenCalled();
  });
});
