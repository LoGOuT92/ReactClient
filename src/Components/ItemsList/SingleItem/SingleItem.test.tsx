import { render, screen, fireEvent } from "@testing-library/react";
import { SingleItem } from "./SingleItem";

const mockProps = {
  id: 1,
  color: "#FF0000",
  title: "Channel A",
  value: 10,
  handleChangeColor: jest.fn(),
  handleItemDeletion: jest.fn(),
  handleItemUpdate: jest.fn(),
  loading: false,
};
describe("SingleItem component", () => {
  test("renders correctly", () => {
    render(<SingleItem {...mockProps} />);
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.value)).toBeInTheDocument();
  });

  test("displays input when edit mode is true", () => {
    render(<SingleItem {...mockProps} />);

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  test("hides input when edit mode is turned off", () => {
    render(<SingleItem {...mockProps} />);

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(screen.queryByText("Save")).toBeNull();
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  test("calling the method to delete the data", () => {
    render(<SingleItem {...mockProps} />);

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(mockProps.handleItemDeletion).toHaveBeenCalledWith(mockProps.id);
  });

  test("calling the method that edits the data and the method that saves it", () => {
    render(<SingleItem {...mockProps} />);

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "20" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(mockProps.handleItemUpdate).toHaveBeenCalledWith(mockProps.id, 20);
  });
});
