export const numberInputMask = (val: string): boolean => {
  let re: RegExp = /^\d+$/;
  return re.test(val);
};
