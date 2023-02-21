import { render, screen, fireEvent, act } from "@testing-library/react";
import { ItemsList } from "./ItemsList";
import { diagram } from "../../typings";

const mockData: diagram[] = [
  {
    id: 1,
    title: "Instagram",
    value: 10,
    color: "#FF0000",
  },
  {
    id: 2,
    title: "Twitter",
    value: 20,
    color: "#00FF00",
  },
];

const mockProps = {
  data: mockData,
  handleChangeColor: jest.fn(),
  handleItemDeletion: jest.fn(),
  handleItemCreation: jest.fn(),
  handleItemUpdate: jest.fn(),
  loading: false,
};

describe("ItemsList component", () => {
  test("renders correctly", () => {
    render(<ItemsList {...mockProps} />);
    expect(screen.getByText("Kanał")).toBeInTheDocument();
    expect(screen.getByText("Ilość")).toBeInTheDocument();
  });

  test("renders SingleItem components based on data prop", () => {
    render(<ItemsList {...mockProps} />);
    const items = screen
      .getAllByRole("listitem")
      .filter((item) => item.className !== "ItemListHeader");
    expect(items).toHaveLength(2);
  });

  test("adds a new item to the list", () => {
    render(<ItemsList {...mockProps} />);
    const addButton = screen.getByText("add");
    fireEvent.click(addButton);

    const inputTitle = screen.getByPlaceholderText("Podaj kanał");
    fireEvent.change(inputTitle, { target: { value: "Facebook" } });

    const inputValue = screen.getByPlaceholderText("Ilość");
    fireEvent.change(inputValue, { target: { value: 30 } });

    const saveButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(saveButton);

    expect(mockProps.handleItemCreation).toHaveBeenCalledWith("Facebook", 30);
  });
});
