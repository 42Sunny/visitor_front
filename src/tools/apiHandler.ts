const { default: axios } = require('axios');

const url = process.env.REACT_APP_API_URL;
const X_42CADET_AUTH_KEY = 'X-42Cadet-Auth-Key';

enum httpMethod {
  POST = 'post',
  GET = 'get',
  DELETE = 'delete',
  PUT = 'put',
}

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
  return apiHandler(httpMethod.POST, '/reserves', data);
};

const getReserve = (id: string) => {
  const data = {};
  return apiHandler(httpMethod.GET, `/reserve/${id}`, data);
};

const deleteReserve = (reserve_id: string) => {
  return apiHandler(httpMethod.DELETE, `/reserve/${reserve_id}`, {});
};

const createReserve = (data: string) => {
  return apiHandler(httpMethod.POST, '/reserve/create', data);
};

const updateReserve = (data: string) => {
  return apiHandler(httpMethod.PUT, '/reserve', data);
};

const checkStaff = (staffName: string) => {
  const data = { staffName };
  return apiHandler(httpMethod.POST, '/staff', data);
};

const postError = (status: Object, payload: Object) => {
  const data = { status, payload };
  return apiHandler(httpMethod.POST, '/front-err', data);
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
