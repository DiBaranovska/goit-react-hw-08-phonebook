import { useState } from 'react';
import { registerThunk } from '../../redux/user/thunk';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import css from './Register.module.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = event => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      default:
        return;
    }
  };

  const formSubmit = event => {
    event.preventDefault();
    const data = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };
    dispatch(registerThunk(data))
      .unwrap()
      .then(() => {
        toast.success('Sign Up successfully!!');
        navigate('/');
        reset();
      })
      .catch(() => {
        toast.error('Error, check the entered data');
      });
  };

  const reset = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={formSubmit} className={css.registr_form}>
      <TextField
        className={css.registr_input}
        name="name"
        type="text"
        id="nameRegistrID"
        onChange={handleInputChange}
        value={name}
        label="Name"
        variant="outlined"
      />

      <TextField
        className={css.registr_input}
        name="email"
        type="email"
        id="mailRegistrID"
        onChange={handleInputChange}
        value={email}
        label="Email address"
        variant="outlined"
      />

      <TextField
        className={css.registr_input}
        name="password"
        type="password"
        id="pasRegistrID"
        minLength="7"
        onChange={handleInputChange}
        value={password}
        label="Password"
        variant="outlined"
      />
      <Button
        className={css.registr_button}
        variant="contained"
        type="submit"
        disabled={!email || !password}
      >
        Sign Up
      </Button>
    </form>
  );
};

export default Register;
