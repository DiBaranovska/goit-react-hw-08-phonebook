import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import css from './navigation.module.css';

const Navigation = () => {
  const { isLoggedIn } = useSelector(userSelector);
  return (
    <Toolbar>
      <NavLink className={css.navigation_link} to="/">
        <Button sx={{ my: 2, color: 'white', display: 'block' }}>Home</Button>
      </NavLink>
      {isLoggedIn && (
        <NavLink className={css.navigation_link} to="/contacts">
          <Button sx={{ my: 2, color: 'white', display: 'block' }}>
            Contacts
          </Button>
        </NavLink>
      )}
    </Toolbar>
  );
};

export default Navigation;
