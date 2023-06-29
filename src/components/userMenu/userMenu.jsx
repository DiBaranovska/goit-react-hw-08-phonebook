import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../../redux/selectors';
import { logOutThunk } from '../../redux/user/thunk';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Button from '@mui/material/Button';
import css from './userMenu.module.css';

const UserMenu = () => {
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logOutThunk())
      .unwrap()
      .then(() => {
        toast.success('Log out successfully!!');
        navigate('/');
      })
      .catch(() => {
        toast.error('Error');
      });
  };
  return (
    <div className={css.userMenu_conteiner}>
      <p className={css.userMenu_email}>{user.email}</p>
      <Button color="inherit" onClick={handleLogOut}>
        Logout
      </Button>
    </div>
  );
};
export default UserMenu;
