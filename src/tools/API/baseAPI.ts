const { default: axios } = require('axios');

const url = process.env.REACT_APP_API_URL;
const X_42CADET_AUTH_KEY = 'X-42Cadet-Auth-Key';

export enum httpMethod {
  POST = 'post',
  GET = 'get',
  DELETE = 'delete',
  PUT = 'put',
}

const VERSION_PATH = '/v1';
const ERROR_MESSAGE = '에러가 발생했습니다.';

export const makeApiPath = (path: string) => `${VERSION_PATH}/${path}`;

const baseAPI = async (method: httpMethod, path: string, data: Object) => {
  try {
    const response = await axios(
      {
        method,
        url: `${url}${path}`,
        data,
        headers: {
          [X_42CADET_AUTH_KEY]: process.env.REACT_APP_AUTH_KEY,
        },
      },
      {
        withCredentials: true,
      },
    );
    return response;
  } catch {
    return { data: { error: { message: ERROR_MESSAGE } } };
  }
};

export default baseAPI;
