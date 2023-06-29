import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/selectors';
import { Navigate } from 'react-router-dom';


const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useSelector(userSelector);

  return !isLoggedIn ? children : <Navigate to="/" />;
};

export default PublicRoute;

PublicRoute.propTypes = {
  children: PropTypes.element.isRequired,
};