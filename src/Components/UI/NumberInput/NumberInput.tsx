import { numberInputMask } from "./NumberInputMask";

interface Props {
  value: number;
  setNewValue: (number: number) => void;
  title: string;
  error?: string;
  placeholder?: string;
}

export function NumberInput({
  value,
  setNewValue,
  title,
  error,
  placeholder,
}: Props) {
  const NumberInputHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value;

    // checking only numbers
    const checkNumber = numberInputMask(value);

    if (value.length > 6) {
      return;
    }

    // if everything is ok set value
    if (checkNumber) {
      const numberValue = parseInt(value);
      setNewValue(numberValue);
    }

    // if the user cleared the entire value
    if (value.length === 0) {
      setNewValue(0);
    }
  };

  return (
    <span>
      <label htmlFor={title}>{title}</label>
      <input
        value={value || 0}
        id={title}
        placeholder={placeholder || ""}
        onChange={NumberInputHandler}
      />
      {error && <label style={{ color: "red", fontSize: 12 }}>{error}</label>}
    </span>
  );
}
