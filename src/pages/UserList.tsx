import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import { GET_USERS_AND_ROLES } from '../queries/queries';
import { IUserRoleInfo } from '../interfaces/IUserRoleInfo';
import { Button, Container, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function UserList() {  
  const { loading, error, data } = useQuery<IUserRoleInfo>(GET_USERS_AND_ROLES);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container maxWidth="md">
      <Typography variant="h5" align="center" my={2}>
        Users and roles
      </Typography>
      {data?.usersRoles.map(userRole => (
        <Paper key={userRole.id} elevation={3} style={{ marginBottom: '8px', padding: '15px' }}>
          <Typography variant="h6">{userRole.email}</Typography>
          <Typography variant="body1">Address: {userRole.address}</Typography>
          <List dense>
            {userRole.userRoles.map(userRoleItem => (
              <ListItem key={userRoleItem.id} >
                <ListItemText
                  primary={`Created Date: ${format(userRoleItem.createdDate, 'yyyy-MM-dd')}`}
                  secondary={`Role: ${userRoleItem.role.name}`}
                />
              </ListItem>
            ))}
          </List>
          <Link to={`/userrole/edit/${userRole.id}`}>
            <Button variant="contained" color="primary">
              Edit Roles
            </Button>
          </Link>
        </Paper>
      ))}
    </Container>
  );
}