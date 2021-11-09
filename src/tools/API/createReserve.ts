import baseAPI, { httpMethod, makeApiPath } from './baseAPI';

type ArgTypes = {
  place: string;
  targetStaffName: string;
  purpose: string;
  date: string;
  visitor: CompactVisitor[];
};

const createReserve = (data: ArgTypes) => {
  return baseAPI(httpMethod.POST, makeApiPath('reserve/create'), data);
};

export default createReserve;
