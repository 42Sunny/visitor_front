const { default: axios } = require('axios');

const url = process.env.REACT_APP_API_URL;
const X_42CADET_AUTH_KEY = 'X-42Cadet-Auth-Key';

enum httpMethod {
  POST = 'post',
  GET = 'get',
  DELETE = 'delete',
  PUT = 'put',
}

const VERSION_PATH = '/v1';

const makeApiPath = (path: string) => `${VERSION_PATH}/${path}`;

const apiHandler = async (method: httpMethod, path: string, data: Object) => {
  return await axios(
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
};

const getReserves = (name: string, phone: string) => {
  const data = { name, phone };
  return apiHandler(httpMethod.POST, makeApiPath('reserves'), data);
};

const getReserve = (id: string) => {
  const data = {};
  return apiHandler(httpMethod.GET, makeApiPath(`reserve/${id}`), data);
};

const deleteReserve = (reserve_id: string) => {
  return apiHandler(httpMethod.DELETE, makeApiPath(`reserve/${reserve_id}`), {});
};

const createReserve = (data: string) => {
  return apiHandler(httpMethod.POST, makeApiPath('reserve/create'), data);
};

const updateReserve = (data: string) => {
  return apiHandler(httpMethod.PUT, makeApiPath('reserve'), data);
};

const checkStaff = (staffName: string) => {
  const data = { staffName };
  return apiHandler(httpMethod.POST, makeApiPath('staff'), data);
};

const postError = (status: Object, payload: Object) => {
  const data = { status, payload };
  return apiHandler(httpMethod.POST, makeApiPath('front-err'), data);
};

export {
  apiHandler,
  getReserve,
  getReserves,
  deleteReserve,
  createReserve,
  updateReserve,
  postError,
  checkStaff,
};
