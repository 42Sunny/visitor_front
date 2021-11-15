export const formattedPhone = (rawPhone: string) => {
  if (rawPhone === undefined) return '';
  if (rawPhone.length < 10) return rawPhone;
  return `${rawPhone.slice(0, 3)}-${rawPhone.slice(3, 7)}-${rawPhone.slice(7)}`;
};
