import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearToken, selectIsLoggedIn } from '../redux/authSlice';

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleLogout = () => {
    dispatch(clearToken());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Weather
          </Typography>
          {isLoggedIn ? <PrivateMenu handleLogout={handleLogout} /> : <PublicMenu />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

interface IPrivateMenu {
  handleLogout: () => void
}

function PrivateMenu(props: IPrivateMenu) {
  return (
    <>
      <Button component={Link} to="/" color="inherit">
        Profile
      </Button>    
      <Button component={Link} to="/users" color="inherit">
        Users
      </Button>    
      <Button component={Link} to="/" color="inherit">
        Home
      </Button>
      <Button onClick={props.handleLogout} color="error">
        Logout
      </Button>
    </>
  )
}

function PublicMenu() {
  return (
    <>
      <Button component={Link} to="/register" color="inherit">
        Register
      </Button>
      <Button component={Link} to="/login" color="inherit">
        Login
      </Button>
    </>
  )
}