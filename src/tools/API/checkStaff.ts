import baseAPI, { httpMethod, makeApiPath } from './baseAPI';

const checkStaff = (staffName: string) => {
  const data = { staffName };
  return baseAPI(httpMethod.POST, makeApiPath('staff'), data);
};

export default checkStaff;
