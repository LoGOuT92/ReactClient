/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ListAddItem } from "./ListAddItem";

describe("ListAddItem", () => {
  const mockCreateNewItemHandler = jest.fn();

  test("renders correctly when addItemVisibility is false", () => {
    render(
      <ListAddItem
        addItemVisibility={false}
        createNewItemHandler={mockCreateNewItemHandler}
      />
    );
    expect(screen.queryByTitle("Add")).not.toBeInTheDocument();
  });

  test("renders correctly when addItemVisibility is true", () => {
    render(
      <ListAddItem
        addItemVisibility={true}
        createNewItemHandler={mockCreateNewItemHandler}
      />
    );
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  test("calls createNewItemHandler when the input data is correct", () => {
    render(
      <ListAddItem
        addItemVisibility={true}
        createNewItemHandler={mockCreateNewItemHandler}
      />
    );

    const textInput = screen.getByPlaceholderText("Podaj kanał");
    const numberInput = screen.getByPlaceholderText("Ilość");
    const addButton = screen.getByText("Add");

    const testChannelName = "Facebook";
    const testValue = "100";

    fireEvent.change(textInput, { target: { value: testChannelName } });
    fireEvent.change(numberInput, { target: { value: testValue } });

    fireEvent.click(addButton);

    expect(mockCreateNewItemHandler).toHaveBeenCalledTimes(1);
    expect(mockCreateNewItemHandler).toHaveBeenCalledWith(
      testChannelName,
      parseInt(testValue)
    );
  });

  it("shows an error when input data is invalid", async () => {
    render(
      <ListAddItem
        addItemVisibility={true}
        createNewItemHandler={mockCreateNewItemHandler}
      />
    );

    const textInput = screen.getByPlaceholderText("Podaj kanał");
    const numberInput = screen.getByPlaceholderText("Ilość");
    const addButton = screen.getByText("Add");

    const testChannelName = "";
    const testValue = "test quantity";

    fireEvent.change(textInput, { target: { value: testChannelName } });
    fireEvent.change(numberInput, { target: { value: testValue } });

    fireEvent.click(addButton);

    await act(async () => {});

    expect(mockCreateNewItemHandler).not.toHaveBeenCalled();

    const channelNameError = screen.getByText("Pole jest wymagane.");
    const quantityError = screen.getByText("Podaj wartośc większą od 0");

    expect(channelNameError).toBeInTheDocument();
    expect(quantityError).toBeInTheDocument();
  });
});
