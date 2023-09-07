export const isNumber = (str: string) => {
  return /^-?\d+(\.\d+)?$/.test(str);
};

export const FIELS = Object.freeze({
  MANDATORY: (field: string) => `The ${field} is mandatory`,
  INVALID_ID: (id: string) => `Invalid Id: ${id}`,
  OUT_OF_RANGE: (value: string) => `Value out of range: ${value}`,
});
