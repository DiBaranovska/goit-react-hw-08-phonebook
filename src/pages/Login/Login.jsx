import { useState } from 'react';
import { nanoid } from 'nanoid';
import { loginThunk } from '../../redux/user/thunk';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import css from '../Register/Register.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mailLoginID = nanoid();
  const pasLoginID = nanoid();

  const dispatch = useDispatch();

  const handleInputChange = event => {
    switch (event.target.name) {
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
      email: event.target.email.value,
      password: event.target.password.value,
    };
    dispatch(loginThunk(data))
      .unwrap()
      .then(() => {
        toast.success('Log In successfully!!');
        reset();
      })
      .catch(() => {
        toast.error('Error, check the entered data');
      });
  };

  const reset = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={formSubmit} className={css.registr_form}>
      <TextField
        className={css.registr_input}
        name="email"
        type="email"
        id={mailLoginID}
        aria-describedby="emailHelp"
        onChange={handleInputChange}
        label="Email address"
        value={email}
      />

      <TextField
        className={css.registr_input}
        name="password"
        type="password"
        id={pasLoginID}
        minLength="7"
        onChange={handleInputChange}
        label="Password"
        value={password}
      />
      <Button
        className={css.registr_button}
        variant="contained"
        type="submit"
        disabled={!email || !password}
      >
        Login
      </Button>
    </form>
  );
};

export default Login;
