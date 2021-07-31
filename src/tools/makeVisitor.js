const makeVisitor = () => {
  const key = `${new Date().getMilliseconds()} ${new Date().getSeconds()}`;
  const newVisitor = {
    name: '',
    organization: '',
    phone: '',
    key,
    isEditable: true,
    id: key,
    reserve_id: 0,
  };
  return newVisitor;
};

export default makeVisitor;
