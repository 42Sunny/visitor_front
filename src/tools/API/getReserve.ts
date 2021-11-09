import baseAPI, { httpMethod, makeApiPath } from './baseAPI';

export type ReserveTypes = {
  date: string;
  place: string;
  purpose: string;
  visitor: Visitor[];
  error?: {
    message: string | string[];
  };
};

//TODO: any를 올바른 타입으로 변경
const getReserve = (id: string) => {
  return baseAPI<any>(httpMethod.GET, makeApiPath(`reserve/${id}`));
};

export default getReserve;
