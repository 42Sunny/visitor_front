const dateToJsonTime = (date) => {
  const hour = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  const month = (date.getMonth() + 1).toString();
  const monthOfDate = date.getDate().toString();
  const formattedDate = `${date.getFullYear()}-${month.length === 1 ? `0${month}` : month}-${
    monthOfDate.length === 1 ? `0${monthOfDate}` : monthOfDate
  } ${hour.length === 1 ? `0${hour}` : hour}:${minutes.length === 1 ? `0${minutes}` : minutes}`;
  return formattedDate;
};

export default dateToJsonTime;
