import { useState } from "react";
import { Button } from "../../UI/Button/Button";
import { NumericInput } from "../../UI/NumericInput/NumericInput";
import styles from "./ListAddItem.module.scss";
import { InputField } from "../../UI/InputField/InputField";
import { numberValidate } from "../../UI/numberValueValidate";
import { textValueValidate } from "../../UI/textValueValidate";

export function ListAddItem({
  addItemVisibility,
  createNewItemHandler,
}: {
  addItemVisibility: boolean;
  createNewItemHandler: (name: string, value: number) => Promise<void>;
}) {
  const [value, setValue] = useState<number>(0);
  const [channelName, setChannelName] = useState<string>("");

  const [channelError, setchannelError] = useState("");
  const [valueError, setvalueError] = useState("");

  const AddNewItemHandler = () => {
    setvalueError(numberValidate(value));
    setchannelError(textValueValidate(channelName));

    if (!textValueValidate(channelName) && !numberValidate(value)) {
      createNewItemHandler(channelName, value);
      setValue(0);
      setChannelName("");
    }
  };

  return (
    <li
      className={`${
        !addItemVisibility
          ? styles.ListAddItemContainer
          : styles.ListAddItemContainer2
      }`}
    >
      <InputField
        title="Kanał"
        type="text"
        placeholder="Podaj kanał"
        value={channelName}
        error={channelError}
        setNevValue={(channelname: string) => setChannelName(channelname)}
      />

      <NumericInput
        title="Ilość"
        value={value}
        setNevValue={(number: number) => setValue(number)}
        error={valueError}
      />
      <span>
        <Button
          OnClickFunction={AddNewItemHandler}
          type="submit"
          title="Add"
          color="green"
          width={50}
        />
      </span>
    </li>
  );
}
