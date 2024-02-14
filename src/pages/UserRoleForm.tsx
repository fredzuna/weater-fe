import { useFormik } from 'formik';
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Box,
    Chip,
} from '@mui/material';
import * as Yup from 'yup';
import { IUser } from '../interfaces/IUser';
import { IInitValuesEditUserRole } from '../interfaces/IInitValuesEditUserRole';
import { GET_ROLES } from '../queries/queries';
import { IRole } from '../interfaces/IRole';
import { useQuery } from '@apollo/client';


interface IProps {
    onSubmit: (values: IInitValuesEditUserRole) => void;
    user: IUser
}

const UserRoleForm = ({ onSubmit, user }: IProps) => {
    const { loading, error, data } = useQuery<{roles: IRole[]}>(GET_ROLES);

    const formik = useFormik<IInitValuesEditUserRole>({
        initialValues: {
            email: (user.email || ''),
            address: user.address || '',
            role: user.userRoles && user.userRoles.map(item => item.role.id)
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            address: Yup.string(),            
            role: Yup.array().min(1, 'At least one role is required').required('Required'),
        }),
        onSubmit: (values) => {
            // Handle the submitted form data (e.g., send it to an API)
            onSubmit(values);

            console.log(values)
        },
    });

    const rolesOptions = data?.roles

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        disabled
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Address"
                        variant="outlined"
                        fullWidth
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                        disabled
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="role-select">Role</InputLabel>
                        <Select
                            multiple
                            label="Role"
                            id="role-select"
                            name="role"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            error={formik.touched.role && Boolean(formik.errors.role)}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((roleId) => (
                                        <Chip key={roleId} label={rolesOptions?.find(role => role.id === roleId)?.name} />
                                    ))}
                                </Box>
                            )}
                        >
                            {rolesOptions?.map((role) => (
                                <MenuItem key={role.id} value={role.id}>
                                    {role.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {formik.touched.role && formik.errors.role && (
                        <div style={{ color: 'red' }}>{formik.errors.role}</div>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default UserRoleForm;
