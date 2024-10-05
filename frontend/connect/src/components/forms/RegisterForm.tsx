import { Button, CircularProgress, FormHelperText, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import PasswordInput from './PasswordInput';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(6, "Password is too short")
        .max(10, "Password is too lengthy")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required("Confirm Password is required")
});

const RegisterForm = () => {
    const { register, error} = useAuthStore();
    const navigate = useNavigate();

    return (
        <Formik initialValues={{
            email: '',
            password: '',
            confirmPassword: ''
        }} 
        onSubmit={async (values, {setSubmitting, resetForm}) => {
            try {
                await register(({email: values.email, password: values.password}));
                resetForm(); 
                navigate('/profile', {replace: true})
            } catch (error) {
                resetForm({values: {email : values.email, password: '', confirmPassword: ''}});
            } finally {
                setSubmitting(false);
            }
        }} 
        validationSchema={validationSchema}>
            {({ isSubmitting, errors, touched, handleChange, handleBlur, values }) => (
                <Form>
                    <div className='mb-4'>
                        <TextField
                            fullWidth
                            id='email'
                            name='email'
                            label='Email'
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
                    </div>
                    <div className='mb-4'>
                        <PasswordInput
                            id='confirm-password'
                            name='confirmPassword'
                            label='Confirm Password'
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.confirmPassword && !!errors.confirmPassword}
                            helperText={touched.confirmPassword && errors.confirmPassword}
                        />
                        {error && <FormHelperText error>{error}</FormHelperText>}
                    </div>

                    <div>
                        <Button
                            fullWidth
                            type='submit'
                            variant='contained'
                            color='primary'
                            disabled={isSubmitting}
                            endIcon={isSubmitting ? <CircularProgress size={20}/> : null}
                        >
                            {isSubmitting ? 'Creating Account...' : 'Register'}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default RegisterForm;
