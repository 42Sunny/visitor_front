export const formattedPhone = (rawPhone: string) => {
  if (rawPhone.length < 10) return rawPhone;
  const phone = `${rawPhone.slice(0, 3)}-${rawPhone.slice(3, 7)}-${rawPhone.slice(7)}`;
  return phone;
};
