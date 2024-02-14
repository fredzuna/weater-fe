// Register.tsx

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register } from "../services/Api";
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        /*.matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
        )*/
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
        .required('Required'),
});

const Register: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            const { email, password } = values;
            const { access_token } = await register(email, password);
            dispatch(setToken(access_token));
            navigate('/');
        },
    });

    return (
        <Container component="main" maxWidth="xs">
            <Typography variant="h5" align="center">
                Register
            </Typography>
            <form onSubmit={formik.handleSubmit} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.confirmPassword &&
                                Boolean(formik.errors.confirmPassword)
                            }
                            helperText={
                                formik.touched.confirmPassword && formik.errors.confirmPassword
                            }
                            required
                        />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Register
                </Button>
            </form>
        </Container>
    );
};

export default Register;
