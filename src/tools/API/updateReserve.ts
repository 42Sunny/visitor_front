import baseAPI, { httpMethod, makeApiPath } from './baseAPI';

type ArgTypes = {
  reserveId: string | number;
  place: string;
  targetStaffName: string;
  purpose: string;
  date: string | null;
  visitor: CompactVisitor[];
  type: string;
};

const updateReserve = (data: ArgTypes) => {
  return baseAPI(httpMethod.PUT, makeApiPath('reserve'), data);
};

export default updateReserve;
