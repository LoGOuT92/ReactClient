import { useState } from "react";
import { Button } from "../../UI/Button/Button";
import { NumberInput } from "../../UI/NumberInput/NumberInput";
import styles from "./ListAddItem.module.scss";
import { InputField } from "../../UI/InputField/InputField";
import { numberValidate, textValueValidate } from "../../UI/validation";

interface Props {
  addItemVisibility: boolean;
  createNewItemHandler: (name: string, value: number) => Promise<void>;
}

export function ListAddItem({
  addItemVisibility,
  createNewItemHandler,
}: Props) {
  const [value, setValue] = useState<number>(0);
  const [channelName, setChannelName] = useState<string>("");
  const [channelError, setChannelError] = useState<string>("");
  const [valueError, setValueError] = useState<string>("");

  const addNewItemHandler = (): void => {
    const { textError, numberError } = validateInputs();
    setChannelError(textError);
    setValueError(numberError);

    if (!textError && !numberError) {
      createNewItemHandler(channelName, value);
      setValue(0);
      setChannelName("");
    }
  };

  const validateInputs = () => {
    const textError = textValueValidate(channelName);
    const numberError = numberValidate(value);
    return { textError, numberError };
  };

  return (
    <li
      className={`${
        !addItemVisibility
          ? styles.ListAddItemContainerHidden
          : styles.ListAddItemContainer
      }`}
    >
      <InputField
        title="Kanał"
        type="text"
        placeholder="Podaj kanał"
        value={channelName}
        error={channelError}
        onChange={(channelName: string) => setChannelName(channelName)}
      />

      <NumberInput
        title="Ilość"
        value={value}
        setNewValue={(number: number) => setValue(number)}
        error={valueError}
      />
      <span>
        <Button
          onClick={addNewItemHandler}
          type="submit"
          title="Add"
          color="green"
          width={50}
        />
      </span>
    </li>
  );
}
