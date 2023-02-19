export const numberValidate = (value: number) => {
  if (value === 0) {
    return "Value must be greater than 0!";
  } else {
    return "";
  }
};
