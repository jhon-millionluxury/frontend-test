/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen } from "@testing-library/react";
import PropertyDetailPageImagesGrid from "./images-grid";
import { ComponentProps } from "react";

// Mock de next/image para Jest
jest.mock("next/image", () => {
  type ImgProps = ComponentProps<"img"> & {
    fill?: boolean;
    priority?: boolean;
  };

  const MockImage = ({ fill, priority, style, ...props }: ImgProps) => {
    const mockStyle = fill
      ? { width: "100%", height: "100%", ...style }
      : style;

    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} style={mockStyle} alt={props.alt} />;
  };

  MockImage.displayName = "NextImage";

  return MockImage;
});

describe("PropertyDetailPageImagesGrid", () => {
  it("renders main image with property.images[0].file", () => {
    const property = {
      name: "Test Property",
      images: [
        {
          id: "1",
          file: "/main.jpg",
          idProperty: "1",
          idPropertyImage: "1",
          enabled: true,
        },
        {
          id: "2",
          file: "/gallery1.jpg",
          idProperty: "1",
          idPropertyImage: "2",
          enabled: true,
        },
        {
          id: "3",
          file: "/gallery2.jpg",
          idProperty: "1",
          idPropertyImage: "3",
          enabled: true,
        },
      ],
    };

    render(<PropertyDetailPageImagesGrid property={property} />);

    expect(screen.getByAltText("Test Property - Image")).toHaveAttribute(
      "src",
      "/main.jpg"
    );

    expect(screen.getByAltText("Test Property - Gallery 1")).toHaveAttribute(
      "src",
      "/gallery1.jpg"
    );

    expect(screen.getByAltText("Test Property - Gallery 2")).toHaveAttribute(
      "src",
      "/gallery2.jpg"
    );
  });

  it("renders placeholder if property.images is missing or empty", () => {
    const property = {
      name: "No Image Property",
      images: [],
    };

    render(<PropertyDetailPageImagesGrid property={property} />);

    expect(screen.getByAltText("No Image Property - Image")).toHaveAttribute(
      "src",
      "/placeholder.svg"
    );
  });

  it("renders only available gallery images (max 2)", () => {
    const property = {
      id: "1",
      name: "Gallery Test",
      images: [
        {
          id: "1",
          file: "/main.jpg",
          idProperty: "1",
          idPropertyImage: "1",
          enabled: true,
        },
        {
          id: "2",
          file: "/gallery1.jpg",
          idProperty: "1",
          idPropertyImage: "2",
          enabled: true,
        },
      ],
    };

    render(<PropertyDetailPageImagesGrid property={property} />);

    expect(screen.getByAltText("Gallery Test - Gallery 1")).toBeInTheDocument();
    expect(
      screen.queryByAltText("Gallery Test - Gallery 2")
    ).not.toBeInTheDocument();
  });
});
