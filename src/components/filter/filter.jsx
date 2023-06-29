import React from 'react';
import css from './filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { filterContacts } from '../../redux/contactsSlice';
import { filterSelector } from '../../redux/selectors';
import TextField from '@mui/material/TextField';

const Filter = () => {
  const filterInputId = nanoid();
  const filter = useSelector(filterSelector);
  const dispatch = useDispatch();
  const changeFilter = event => {
    dispatch(filterContacts(event.target.value.toLowerCase()));
  };

  return (
    <div className={css.contacts_filter}>
      <label className={css.contacts__name} htmlFor={filterInputId}>
        Find contacts by name
      </label>
      <TextField
        className={css.contacts__input}
        id={filterInputId}
        value={filter.filter}
        type="text"
        onChange={changeFilter}
        variant="standard"
      ></TextField>
    </div>
  );
};

export default Filter;
