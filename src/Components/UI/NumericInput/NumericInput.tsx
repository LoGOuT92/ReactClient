import { numberInputMask } from "./NumericInputMask";

interface Props {
  value: number;
  setNevValue: (number: number) => void;
  title: string;
  error?: string;
}

export function NumericInput({ value, setNevValue, title, error }: Props) {
  const NumberInputHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    //checking only numbers
    const checkNumber = numberInputMask(event.target.value);
    //max input lenght 6
    if (event.target.value.length > 6) {
      return;
    }
    //if everything is ok set value
    if (checkNumber) {
      const NumberValue: number = parseInt(event.target.value);
      setNevValue(NumberValue);
    }
    //if the user cleared the entire value

    if (event.target.value.length === 0) {
      setNevValue(0);
    }
  };

  return (
    <span>
      <label htmlFor={title}>{title}</label>
      <input
        value={value}
        id={title}
        onChange={(event) => NumberInputHandler(event)}
      ></input>
      {error && <label style={{ color: "red", fontSize: 12 }}>{error}</label>}
    </span>
  );
}
