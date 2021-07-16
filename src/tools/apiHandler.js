const { default: axios } = require("axios");

const url = "https://api.visitor.dev.42seoul.io";

const apiHandler = async (method, path, data) => {
  return await axios(
    {
      method,
      url: `${url}${path}`,
      data,
    },
    { withCredentials: true }
  );
};

const getReserves = (name, phone) => {
  const data = { name, phone };
  return apiHandler("post", "/reserves", data);
};

const deleteReserve = (name, phone, reserve_id) => {
	const data = {name, phone};
	return apiHandler("delete", `/reserve?reserve_id=${reserve_id}`, data);
}

const createReserve = (data) => {
	return apiHandler("post", "/reserve/create", data);
}

const updateReserve = (data) => {
	return apiHandler("put", "/reserve", data);
}

export { apiHandler, getReserves, deleteReserve, createReserve, updateReserve };
