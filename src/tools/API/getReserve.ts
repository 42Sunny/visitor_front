import baseAPI, { httpMethod, makeApiPath } from './baseAPI';

const getReserve = (id: string) => {
  const data = {};
  return baseAPI(httpMethod.GET, makeApiPath(`reserve/${id}`), data);
};

export default getReserve;
