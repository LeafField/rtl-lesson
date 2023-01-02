import React from "react";
import { render, screen } from "@testing-library/react";
import Render from "./Render"


describe("Rendering", () => {
  it("Should render all the elements correctory", () => {
    render(<Render />)
    // screen.debug(screen.getByRole("heading"))
    expect(screen.getAllByRole('heading')).toBeTruthy()
    expect(screen.getByRole("textbox")).toBeTruthy()
    expect(screen.getAllByRole("button")[0]).toBeTruthy()
    expect(screen.getAllByRole("button")[1]).toBeTruthy()
    expect(screen.getByText("Udemy")).toBeTruthy()
    expect(screen.queryByText("Udeeeeeemy")).toBeNull()
    // screen.debug(screen.getByText("Udemy"))
    expect(screen.getByTestId("copyright")).toBeTruthy()
  })
})
