import { render, screen } from "@testing-library/react";
import PropertyDetailPage, { generateStaticParams } from "./page";
import { properties } from "@/lib/properties-local-data";
import { notFound } from "next/navigation";

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

describe("PropertyDetailPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when property exists", () => {
    const property = properties[0];

    render(<PropertyDetailPage params={{ id: property.id.toString() }} />);

    expect(
      screen.getByText("Luxury Real Estate Collection")
    ).toBeInTheDocument();

    expect(screen.getByText("Back to Properties")).toBeInTheDocument();

    expect(screen.getByText(`${property.name}`)).toBeInTheDocument();

    expect(screen.getByAltText(property.name + " - Image")).toBeInTheDocument();

    expect(screen.getByText(property.description)).toBeInTheDocument();

    property.features.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });

    expect(screen.getByText("Property Details")).toBeInTheDocument();

    expect(notFound).not.toHaveBeenCalled();
  });

  it("calls notFound when property does not exist", () => {
    try {
      render(<PropertyDetailPage params={{ id: "99999" }} />);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    expect(notFound).toHaveBeenCalled();
  });

  it("generateStaticParams returns correct ids", () => {
    const result = generateStaticParams();
    expect(result).toEqual(properties.map((p) => ({ id: p.id.toString() })));
  });
});
