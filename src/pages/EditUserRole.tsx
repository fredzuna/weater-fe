import {
    Container,
    Typography,
    Paper,
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { IUser } from '../interfaces/IUser';
import { useQuery } from '@apollo/client';
import { EDIT_USER_ROLES, GET_USER_AND_ROLE } from '../queries/queries';
import UserRoleForm from './UserRoleForm';
import { IInitValuesEditUserRole } from '../interfaces/IInitValuesEditUserRole';


const EditUserRole = () => {
    const { id } = useParams();
    const userId = (id && parseInt(id))
    const [editUserRole] = useMutation(EDIT_USER_ROLES);

    const { loading, error, data } = useQuery<{ userRole: IUser }>(GET_USER_AND_ROLE, {
        variables: { userId: userId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const userRole = data?.userRole;

    const handleSubmit = async (values: IInitValuesEditUserRole) => {
        try {
            const { data } = await editUserRole({
              variables: {
                userRoleInput: {
                  userId: userId, // replace with actual user ID
                  roles: values.role, // replace with actual role IDs
                },
              },
            });
      
            console.log(data.editUserRole);
          } catch (error) {
            console.error('Error editing user role:', error);
          }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h5" align="center" my={2}>
                Edit Roles for {userRole?.email}
            </Typography>
            <Paper elevation={3} style={{ marginBottom: '8px', padding: '15px' }}>
                {userRole &&
                    <UserRoleForm onSubmit={handleSubmit} user={userRole} />
                }
            </Paper>

        </Container>
    );
};

export default EditUserRole;