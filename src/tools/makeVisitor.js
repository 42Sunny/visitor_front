const makeVisitor = () => {
  const key = `${new Date().getMilliseconds()} ${new Date().getSeconds()}`;
  const newVisitor = {
    name: '',
    organization: '',
    phone: '',
    key,
    isEditable: true,
    isChanged: true,
    id: key,
  };
  return newVisitor;
};

export default makeVisitor;
