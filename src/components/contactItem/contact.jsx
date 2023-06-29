import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteContactThunk } from '../../redux/contacts/thunks';
import css from './contact.module.css';
import { toast } from 'react-hot-toast';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.primary,
  fontSize: '1rem',
}));

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const onDeleteContact = event => {
    event.target.textContent = 'Delete...';
    dispatch(deleteContactThunk(id))
      .unwrap()
      .then(() => {
        toast.success('Сontact deleted successfully');
      })
      .catch(() => {
        toast.error('error');
      });
  };
  return (
    <Grid item xs={2} sm={4} md={4}>
      <Item>
        {name}: {number}
        <Button
          variant="outlined"
          className={css.contact_btn}
          onClick={onDeleteContact}
        >
          Delete
        </Button>
      </Item>
    </Grid>
  );
};

export default Contact;

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
