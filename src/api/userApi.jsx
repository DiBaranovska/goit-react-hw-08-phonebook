import axios from 'axios';

export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};


const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = async user => {
  const { data } = await axios.post(
    `https://connections-api.herokuapp.com/users/signup`,
    user
  );
  setAuthHeader(data.token);
  return data;
};

export const logInApi = async user => {
  const { data } = await axios.post(
    `https://connections-api.herokuapp.com/users/login`,
    user
  );
  setAuthHeader(data.token);
  return data;
};

export const logOutApi = async () => {
  const { data } = await axios.post(
    `https://connections-api.herokuapp.com/users/logout`
  );
  clearAuthHeader();
  return data;
};

export const refreshApi = async () => {
  const { data } = await axios(
    'https://connections-api.herokuapp.com/users/current'
  );
  return data;
};
