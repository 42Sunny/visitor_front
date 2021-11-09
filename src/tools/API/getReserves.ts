import baseAPI, { httpMethod, makeApiPath } from './baseAPI';

const getReserves = (name: string, phone: string) => {
  const data = { name, phone };
  return baseAPI(httpMethod.POST, makeApiPath('reserves'), data);
};

export default getReserves;
