import { render, screen } from "@testing-library/react";
import PropertyDetailPageImagesGrid from "./images-grid";
import { ComponentProps } from "react";

jest.mock("next/image", () => {
  type ImgProps = ComponentProps<"img"> & {
    fill?: boolean;
  };

  const MockImage = ({ fill, style, ...props }: ImgProps) => {
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
  it("renders main image with property.image", () => {
    const property = {
      name: "Test Property",
      image: "/main.jpg",
      gallery: ["/main.jpg", "/gallery1.jpg", "/gallery2.jpg"],
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

  it("renders placeholder if property.image is missing", () => {
    const property = {
      name: "No Image Property",
      gallery: [],
    };

    render(<PropertyDetailPageImagesGrid property={property} />);

    expect(screen.getByAltText("No Image Property - Image")).toHaveAttribute(
      "src",
      "/placeholder.svg"
    );
  });

  it("renders only available gallery images (max 2)", () => {
    const property = {
      name: "Gallery Test",
      image: "/main.jpg",
      gallery: ["/main.jpg", "/gallery1.jpg"],
    };

    render(<PropertyDetailPageImagesGrid property={property} />);

    expect(screen.getByAltText("Gallery Test - Gallery 1")).toBeInTheDocument();
    expect(
      screen.queryByAltText("Gallery Test - Gallery 2")
    ).not.toBeInTheDocument();
  });
});
