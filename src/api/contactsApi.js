import axios from 'axios';

export const fetchContacts = async () => {
  const { data } = await axios(
    'https://connections-api.herokuapp.com/contacts'
  );
  return data;
};

export const addContact = async contact => {
  const { data } = await axios.post(
    `https://connections-api.herokuapp.com/contacts`,
    contact
  );
  return data;
};

export const deleteContact = async id => {
  const { data } = await axios.delete(
    `https://connections-api.herokuapp.com/contacts/${id}`
  );
  return data;
};
