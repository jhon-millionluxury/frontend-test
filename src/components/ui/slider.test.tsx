/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen } from "@testing-library/react";
import { Slider } from "./slider";
import userEvent from "@testing-library/user-event";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(global as any).ResizeObserver = ResizeObserver;

Element.prototype.getBoundingClientRect = function () {
  return {
    x: 0,
    y: 0,
    width: 100,
    height: 10,
    top: 0,
    left: 0,
    right: 100,
    bottom: 10,
    toJSON: () => {},
  };
};

describe("Slider component", () => {
  it("renders correctly", () => {
    render(<Slider defaultValue={[50]} min={0} max={100} />);
    const thumbs = screen.getAllByRole("slider");
    expect(thumbs.length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { getByTestId } = render(
      <Slider defaultValue={[30]} className="custom-class" />
    );
    const sliderRoot = getByTestId("slider-root");
    expect(sliderRoot.className).toContain("custom-class");
  });

  it("renders thumbs", () => {
    render(<Slider defaultValue={[20, 80]} min={0} max={100} />);
    const thumbs = screen.getAllByRole("slider");
    expect(thumbs).toHaveLength(2); // 2 thumbs definidos en el componente
  });

  it("thumb can receive focus and respond to keyboard input", async () => {
    const user = userEvent.setup();
    render(<Slider defaultValue={[40]} min={0} max={100} />);
    const thumb = screen.getByRole("slider");

    // mover el foco al thumb
    await user.tab();
    expect(document.activeElement).toBe(thumb);

    // enviar teclas sin que explote
    await user.keyboard("{ArrowRight}");
    await user.keyboard("{ArrowLeft}");
    expect(thumb).toBeInTheDocument();
  });
});
