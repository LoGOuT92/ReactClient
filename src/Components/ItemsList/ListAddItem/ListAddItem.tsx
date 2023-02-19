import { useState } from "react";
import { Button } from "../../UI/Button/Button";
import { NumericInput } from "../../UI/NumericInput/NumericInput";
import styles from "./ListAddItem.module.scss";
import { InputField } from "../../UI/InputField/InputField";
import { numberValidate } from "../../UI/numberValueValidate";

export function ListAddItem({
  addItemVisibility,
}: {
  addItemVisibility: boolean;
}) {
  const [value, setValue] = useState<number>(0);
  const [channelName, setChannelName] = useState<string>("");
  const [channelError, setchannelError] = useState("");
  const [valueError, setvalueError] = useState("");

  const AddNewItemHandler = () => {
    setvalueError(numberValidate(value));
    channelName.length === 0
      ? setchannelError("Channel name cannot be empty!")
      : setchannelError("");
  };

  return (
    <li className={`${!addItemVisibility ? styles.ListAddItemContainer : ""}`}>
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
