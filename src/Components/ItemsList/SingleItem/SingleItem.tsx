import { useState } from "react";
import { diagram } from "../../../typings";
import { Button } from "../../UI/Button/Button";
import styles from "./SingleItem.module.scss";
import { NumberInput } from "../../UI/NumberInput/NumberInput";
import { numberValidate } from "../../UI/validation";

interface Props {
  changeColorHandler: (id: number, color: string) => void;
  deleteItemhandler: (id: number) => Promise<void>;
  updateItemhandler: (id: number, value: number) => Promise<void>;
  loading: boolean;
}

export function SingleItem({
  id,
  color,
  title,
  value,
  changeColorHandler,
  deleteItemhandler,
  updateItemhandler,
  loading,
}: diagram & Props) {
  const [editValueMode, setEditValueMode] = useState(false);
  const [numberValue, setNumberValue] = useState<number>(value);
  const [valueError, setValueError] = useState<string>("");

  const changeEditModeHandler = () => {
    setEditValueMode(!editValueMode);
  };

  const saveNewValueHandler = () => {
    const validationResult = numberValidate(numberValue);
    setValueError(validationResult);

    !validationResult
      ? updateItemhandler(id, numberValue).then(() => setEditValueMode(false))
      : alert(validationResult);
  };

  const deleteItem = () => {
    deleteItemhandler(id);
  };

  return (
    <li>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          <span>{title}</span>
          {editValueMode ? (
            <NumberInput
              title=""
              value={numberValue}
              setNewValue={(number: number) => setNumberValue(number)}
              error={valueError}
            />
          ) : (
            <span>{value}</span>
          )}
          <span className={styles.buttonsActionListItemContainer}>
            {editValueMode ? (
              <>
                <Button
                  title="Save"
                  color="green"
                  width={50}
                  onClick={saveNewValueHandler}
                />
                <input
                  type="color"
                  value={color ?? ""}
                  onChange={(event) =>
                    changeColorHandler(id, event.target.value)
                  }
                />
              </>
            ) : (
              <Button
                title="Delete"
                color="red"
                width={50}
                onClick={deleteItem}
              />
            )}
            <Button
              onClick={changeEditModeHandler}
              title={editValueMode ? "Cancel" : "Edit"}
              color="blue"
              width={50}
            />
          </span>
        </>
      )}
    </li>
  );
}
