export const textValueValidate = (value: string) => {
  if (value.length === 0) {
    return "Channel name cannot be empty!";
  } else {
    return "";
  }
};
