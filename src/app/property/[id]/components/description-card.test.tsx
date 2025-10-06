import { render, screen } from "@testing-library/react";
import PropertyDetailPageDescriptionCard from "@/app/property/[id]/components/description-card";

describe("PropertyDetailPageDescriptionCard", () => {
  it("renders the heading and description correctly", () => {
    const description = "This is a beautiful property with a garden.";

    render(<PropertyDetailPageDescriptionCard description={description} />);

    expect(screen.getByText("About This Property")).toBeInTheDocument();

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <PropertyDetailPageDescriptionCard description="Snapshot description" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
