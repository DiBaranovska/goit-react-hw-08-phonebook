import { Suspense, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navigation from '../navigation/navigation';
import AuthNav from '../authNav/authNav';
import SyncLoader from 'react-spinners/SyncLoader';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors';
import UserMenu from '../userMenu/userMenu';
import { refreshThunk, logOutThunk } from '../../redux/user/thunk';
import { setAuthHeader } from '../../api/userApi';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import css from './layout.module.css';

const Layout = () => {
  const { token, isLoggedIn } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && !isLoggedIn) {
      setAuthHeader(token);

      dispatch(refreshThunk())
        .unwrap()
        .then(() => {
          navigate('/contacts');
        })
        .catch(() => {
          dispatch(logOutThunk());
        });
    }
  }, [token, isLoggedIn, dispatch, navigate]);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Navigation />
            <Box
              className={css.login_conteiner}
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              {isLoggedIn ? <UserMenu /> : <AuthNav />}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Suspense fallback={<SyncLoader color="#1976d2" />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
