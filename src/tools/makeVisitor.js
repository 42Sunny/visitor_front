const makeVisitor = (
  name = '',
  organization = '',
  phone = '',
  isEditable = true,
  isChanged = true,
) => {
  const key = `${new Date().getMilliseconds()} ${new Date().getSeconds()} ${Math.random()}`;
  const newVisitor = {
    name,
    organization,
    phone,
    key,
    isEditable,
    isChanged,
    id: key,
  };
  return newVisitor;
};

export default makeVisitor;
