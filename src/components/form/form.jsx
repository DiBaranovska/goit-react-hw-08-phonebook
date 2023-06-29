import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './form.module.css';
import { nanoid } from 'nanoid';
import { addContactThunk } from '../../redux/contacts/thunks';
import { contactsSelector } from '../../redux/selectors';
import { toast } from 'react-hot-toast';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const Form = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const nameInputId = nanoid();
  const telInputId = nanoid();

  const { contacts, error } = useSelector(contactsSelector);

  const handleInputChange = event => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;
      case 'number':
        setNumber(event.target.value);
        break;
      default:
        return;
    }
  };
  const formSubmit = event => {
    event.preventDefault();
    setLoading(true);
    const data = {
      name: event.target.name.value,
      number: event.target.number.value,
    };
    const normalizedName = name.toLowerCase();
    if (
      contacts.find(contact => contact.name.toLowerCase() === normalizedName)
    ) {
      toast.error(`${name} is already in contacts`);
      setLoading(false);
    } else {
      dispatch(addContactThunk(data))
        .unwrap()
        .then(() => {
          setLoading(false);
          toast.success('Сontact added successfully');
          reset();
        })
        .catch(() => {
          setLoading(false);
          toast.error('error');
        });
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <form onSubmit={formSubmit} className={css.form}>
        <div>
          <TextField
            className={css.form__input}
            type="text"
            name="name"
            onChange={handleInputChange}
            value={name}
            id={nameInputId}
            label="Name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <TextField
            className={css.form__input}
            type="tel"
            name="number"
            onChange={handleInputChange}
            value={number}
            id={telInputId}
            label="Number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>
        <Button
          className={css.registr_button}
          variant="contained"
          type="submit"
        >
          {loading ? 'Loading...' : 'Add contact'}
        </Button>
      </form>
      {error && <h2>{error}</h2>}
    </>
  );
};

export default Form;
