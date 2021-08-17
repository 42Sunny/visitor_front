const { default: axios } = require('axios');

const url = 'https://api.visitor.dev.42seoul.io';

const apiHandler = async (method, path, data) => {
  return await axios(
    {
      method,
      url: `${url}${path}`,
      data,
    },
    { withCredentials: true },
  );
};

const getReserves = (name, phone) => {
  const data = { name, phone };
  return apiHandler('post', '/reserves', data);
};

const getReserve = (id) => {
  const data = {};
  return apiHandler('get', `/reserve/${id}`, data);
};

const deleteReserve = (name, phone, reserve_id) => {
  const data = { name, phone };
  return apiHandler('delete', `/reserve?reserve_id=${reserve_id}`, data);
};

const createReserve = (data) => {
  return apiHandler('post', '/reserve/create', data);
};

const updateReserve = (data) => {
  return apiHandler('put', '/reserve', data);
};

const checkStaff = (staffName) => {
  const data = { staffName };
  return apiHandler('post', '/staff', data);
};

const postError = ({ status, payload }) => {
  // eslint-disable-next-line no-unused-vars
  const data = { status, payload };
  // TODO: API 엔드포인트가 완성되면 입력
  // return apiHandler("post", "/error-message", data);
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
