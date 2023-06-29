import { useNavigate } from 'react-router-dom';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const AuthNav = () => {
  const navigate = useNavigate();
  return (
    <ButtonGroup
      disableElevation
      variant="contained"
      aria-label="Disabled elevation buttons"
    >
      <Button variant="contained" onClick={() => navigate('/register')}>
        Registration
      </Button>
      <Button variant="contained" onClick={() => navigate('/login')}>
        Log in
      </Button>
    </ButtonGroup>
  );
};

export default AuthNav;
