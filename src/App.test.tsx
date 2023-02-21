import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

jest.mock("./api/api", () => ({
  deleteItem: jest.fn(() => Promise.resolve()),
}));

describe("App", () => {
  it("renders app and the items list", () => {
    render(<App />);

    const itemList = screen.getByRole("list", { name: "" });
    const itemListHeader = screen.getByRole("listitem", { name: "" });

    expect(itemList).toBeInTheDocument();
    expect(itemListHeader).toBeInTheDocument();
  });

  it("displays the input when the button is clicked", () => {
    render(<App />);

    const addButton = screen.getByRole("button", { name: "add" });
    fireEvent.click(addButton);

    const inputName = screen.getByPlaceholderText("Podaj kanał");
    expect(inputName).toBeInTheDocument();
  });

  test("displays error message when data fetching fails", async () => {
    const errorMessage = "Nie udało się pobrać danych";
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest
      .spyOn(global, "fetch")
      .mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    render(<App />);
    const error = await screen.findByText(errorMessage);
    expect(error).toBeInTheDocument();
    jest.restoreAllMocks();
  });
});
