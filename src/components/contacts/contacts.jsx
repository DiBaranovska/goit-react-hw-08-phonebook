import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Contact from '../contactItem/contact';
import css from './contacts.module.css';
import SyncLoader from 'react-spinners/SyncLoader';
import { filterSelector, contactsSelector } from '../../redux/selectors';
import { fetchAll } from '../../redux/contacts/thunks';

import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';

const Contacts = () => {
  const [visibleContacts, setVisivbleContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const filter = useSelector(filterSelector);

  const { contacts, error } = useSelector(contactsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(fetchAll())
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    setVisivbleContacts(state => {
      state = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.filter)
      );
      return state;
    });
  }, [filter, contacts]);

  return (
    <>
      {error && <h2>{error}</h2>}
      {loading && (
        <div className={css.loader}>
          <SyncLoader color="#1976d2" />
        </div>
      )}
      <Box sx={{ flexGrow: 1 }} className={css.contacts_list}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {visibleContacts.map(contact => {
            return (
              <Contact
                key={contact.id}
                id={contact.id}
                name={contact.name}
                number={contact.number}
              />
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default Contacts;

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
};
