const makeVisitor: (
  name?: string,
  organization?: string,
  phone?: string,
  isEditable?: boolean,
  isChanged?: boolean,
  autoSave?: boolean,
  reserveId?: number,
) => Visitor = (
  name = '',
  organization = '',
  phone = '',
  isEditable = true,
  isChanged = true,
  autoSave = true,
  reserveId = 0,
) => {
  const key = `${new Date().getMilliseconds()} ${new Date().getSeconds()} ${Math.random()}`;
  const newVisitor: Visitor = {
    name,
    organization,
    phone,
    key,
    isEditable,
    isChanged,
    autoSave,
    reserveId,
    id: key,
  };
  return newVisitor;
};

export default makeVisitor;
