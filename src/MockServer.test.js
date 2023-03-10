import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { rest } from "msw";
import { setupServer } from "msw/node";
import MockServer from "./MockServer";

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: "Bred dummy" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

describe("Mocking API", () => {
  it("[Fetch success] Should display fetched data correctory and button disable", async () => {
    render(<MockServer />);
    await userEvent.click(screen.getByRole("button"));
    expect(await screen.findByRole("heading")).toHaveTextContent("Bred dummy");
    expect(await screen.getByRole("button")).toHaveAttribute("disabled")
  });

  it("[Fetch failure] Should display error message, no render heading and button abled", async () => {
    server.use(
      rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
        return res(ctx.status(404));
      })
    )
    render(<MockServer />)
    await userEvent.click(screen.getByRole("button"))
    expect(await screen.findByTestId("error")).toHaveTextContent("Fetching Failed !")
    expect(screen.queryByRole("heading")).toBeNull()
    expect(screen.getByRole("button")).not.toHaveAttribute("disabled")
  })
});
