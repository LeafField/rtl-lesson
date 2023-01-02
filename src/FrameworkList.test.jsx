import React from "react";
import { screen, render } from "@testing-library/react";
import FrameworkList from "./FrameworkList";

describe("Rendering the list is props", () => {
  it("Should render No data when no data proped", () => {
    render(<FrameworkList />);
    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  it("Should render list item correctory", () => {
    const dummy = [
      { id: 1, item: "React dummy" },
      { id: 2, item: "Angular dummy" },
      { id: 3, item: "vue dummy" },
    ];
    render(<FrameworkList frameworks={dummy} />);
    const frameworkItems = screen
      .getAllByRole("listitem")
      .map((ele) => ele.textContent);
    const dummyItems = dummy.map((ele) => ele.item);
    expect(frameworkItems).toEqual(dummyItems);
    expect(screen.queryByText("No data")).toBeNull();
  });
});
