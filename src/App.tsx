import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import Home from './pages/Home'
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import { selectIsLoggedIn } from './redux/authSlice';
import UserList from './pages/UserList';
import { CreateApolloClient } from './services/CreateApoloClient';
import EditUserRole from './pages/EditUserRole';

interface PrivateRouteProps {
  isLoggedIn: boolean;
  children: JSX.Element
}


function RequireAuth({ children, isLoggedIn }: PrivateRouteProps) {
  let location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

const client = CreateApolloClient();

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Routes>
          <Route
            path='/'
            element={
              <RequireAuth isLoggedIn={isLoggedIn}>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path='/users'
            element={
              <RequireAuth isLoggedIn={isLoggedIn}>
                <UserList />
              </RequireAuth>
            }
          />
          <Route            
            path="/userrole/edit/:id" 
            element={
              <RequireAuth isLoggedIn={isLoggedIn}>
                <EditUserRole />
              </RequireAuth>
            }
          />
          <Route path="/register" Component={Register} />
          <Route path="/login" Component={Login} />
        </Routes>
      </Router>
    </ApolloProvider>
  )
}

export default App
