import { useState } from "react";
import { diagram } from "../../../typings";
import { Button } from "../../UI/Button/Button";
import styles from "./SingleItem.module.scss";
import { NumberInput } from "../../UI/NumberInput/NumberInput";
import { numberValidate } from "../../UI/validation";

interface Props {
  handleChangeColor: (id: number, color: string) => void;
  handleItemDeletion: (id: number) => Promise<void>;
  handleItemUpdate: (id: number, value: number) => Promise<void>;
  loading: boolean;
}

export function SingleItem({
  id,
  color,
  title,
  value,
  handleChangeColor,
  handleItemDeletion,
  handleItemUpdate,
  loading,
}: diagram & Props) {
  const [editValueMode, setEditValueMode] = useState(false);
  const [numberValue, setNumberValue] = useState<number>(value);
  const [valueError, setValueError] = useState<string>("");

  const handleEditMode = () => {
    setEditValueMode(!editValueMode);
  };

  const handleSaveNewValue = () => {
    const validationResult = numberValidate(numberValue);
    setValueError(validationResult);

    !validationResult
      ? handleItemUpdate(id, numberValue)?.then(() => setEditValueMode(false))
      : alert(validationResult);
  };

  const deleteItem = () => {
    handleItemDeletion(id);
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
                  onClick={handleSaveNewValue}
                  disabled={loading}
                />
                <input
                  type="color"
                  value={color ?? ""}
                  onChange={(event) =>
                    handleChangeColor(id, event.target.value)
                  }
                />
              </>
            ) : (
              <Button
                title="Delete"
                color="red"
                width={50}
                onClick={deleteItem}
                disabled={loading}
              />
            )}
            <Button
              onClick={handleEditMode}
              title={editValueMode ? "Cancel" : "Edit"}
              color="blue"
              width={50}
              disabled={loading}
            />
          </span>
        </>
      )}
    </li>
  );
}
