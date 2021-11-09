import baseAPI, { httpMethod, makeApiPath } from './baseAPI';

const deleteReserve = (reserveId: string | number) => {
  return baseAPI(httpMethod.DELETE, makeApiPath(`reserve/${reserveId}`), {});
};

export default deleteReserve;
