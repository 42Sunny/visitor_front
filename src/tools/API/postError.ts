import baseAPI, { httpMethod, makeApiPath } from './baseAPI';

const postError = (status: Object, payload: Object) => {
  const data = { status, payload };
  return baseAPI(httpMethod.POST, makeApiPath('front-err'), data);
};

export default postError;
