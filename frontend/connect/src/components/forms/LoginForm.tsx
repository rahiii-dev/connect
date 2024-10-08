import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, CircularProgress, FormHelperText } from '@mui/material';
import PasswordInput from './PasswordInput';
import { useAuthStore } from '../../store/useAuthStore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password too short').required('Password is required')
});

const LoginForm = () => {
    const { login, error } = useAuthStore();
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values, {setSubmitting, resetForm}) => {
                try {
                    await login(values);
                    resetForm(); 
                    navigate('/');
                } catch (err) {
                    toast.error('This is a success message!');
                    resetForm({values: {email : values.email, password: ''}});
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting, errors, touched, handleChange, handleBlur, values }) => (
                <Form>
                    <div className='mb-4'>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && !!errors.email}
                            helperText={touched.email && errors.email}
                        />
                    </div>

                    <div className='mb-4'>
                        <PasswordInput
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && !!errors.password}
                            helperText={touched.password && errors.password}
                        />
                        {error && <FormHelperText error>{error}</FormHelperText>}
                    </div>

                    <div>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                        >
                            {isSubmitting ? 'Logging In...' : 'Login'}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
