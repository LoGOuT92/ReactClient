interface Props {
  title: string;
  type: string;
  placeholder?: string;
  error?: string;
  value: string;
  setNevValue: (value: string) => void;
}

export function InputField({
  placeholder,
  title,
  type,
  error,
  value,
  setNevValue,
}: Props) {
  const changeValueHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.value.length > 40) {
      return;
    }
    setNevValue(event.target.value);
  };

  return (
    <span>
      <label htmlFor={title}>{title}</label>
      <input
        type={type}
        id={title}
        placeholder={placeholder}
        value={value}
        onChange={(event) => changeValueHandler(event)}
      ></input>
      {error && <label style={{ color: "red", fontSize: 12 }}>{error}</label>}
    </span>
  );
}
