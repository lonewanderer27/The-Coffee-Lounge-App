const formattingOpts = {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 2,
};
export const phpString = new Intl.NumberFormat("en-PH", formattingOpts);
