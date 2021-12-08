import baseAPI, { httpMethod, makeApiPath } from './baseAPI';

const sendError = (status: Object, payload: Object) => {
  const data = { status, payload };
  return baseAPI(httpMethod.POST, makeApiPath('front-err'), data);
};

export default sendError;
