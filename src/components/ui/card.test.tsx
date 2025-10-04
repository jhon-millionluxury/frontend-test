import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./card";

describe("Card components", () => {
  it("renders Card with children", () => {
    render(<Card>Card body</Card>);
    const card = screen.getByText("Card body");

    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("data-slot", "card");
  });

  it("applies custom className to Card", () => {
    render(<Card className="custom-class">Card body</Card>);
    const card = screen.getByText("Card body");

    expect(card.className).toContain("custom-class");
  });

  it("renders CardHeader with children", () => {
    render(<CardHeader>Header content</CardHeader>);
    const header = screen.getByText("Header content");

    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute("data-slot", "card-header");
  });

  it("renders CardTitle with children", () => {
    render(<CardTitle>Title</CardTitle>);
    const title = screen.getByText("Title");

    expect(title).toBeInTheDocument();
    expect(title).toHaveAttribute("data-slot", "card-title");
  });

  it("renders CardDescription with children", () => {
    render(<CardDescription>Description</CardDescription>);
    const desc = screen.getByText("Description");

    expect(desc).toBeInTheDocument();
    expect(desc).toHaveAttribute("data-slot", "card-description");
  });

  it("renders CardAction with children", () => {
    render(<CardAction>Action</CardAction>);
    const action = screen.getByText("Action");

    expect(action).toBeInTheDocument();
    expect(action).toHaveAttribute("data-slot", "card-action");
  });

  it("renders CardContent with children", () => {
    render(<CardContent>Content</CardContent>);
    const content = screen.getByText("Content");

    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute("data-slot", "card-content");
  });

  it("renders CardFooter with children", () => {
    render(<CardFooter>Footer</CardFooter>);
    const footer = screen.getByText("Footer");

    expect(footer).toBeInTheDocument();
    expect(footer).toHaveAttribute("data-slot", "card-footer");
  });

  it("can compose Card with all subcomponents", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>My Title</CardTitle>
          <CardDescription>Subtitle</CardDescription>
          <CardAction>Action Btn</CardAction>
        </CardHeader>
        <CardContent>Main content</CardContent>
        <CardFooter>Footer content</CardFooter>
      </Card>
    );

    expect(screen.getByText("My Title")).toBeInTheDocument();
    expect(screen.getByText("Subtitle")).toBeInTheDocument();
    expect(screen.getByText("Action Btn")).toBeInTheDocument();
    expect(screen.getByText("Main content")).toBeInTheDocument();
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });
});
