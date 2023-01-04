import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import customCounterReducer from "./features/customCounter/customCounterSlice";

import ReduxAsync from "./ReduxAsync";

describe("ReduxAsync test", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterReducer,
      },
    });
  });

  it("Should display value with 100 + payload", async () => {
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );
    await userEvent.click(screen.getByText("FetchDummy"));
    expect(await screen.findByTestId("count-value")).toHaveTextContent(105);
  });
});
