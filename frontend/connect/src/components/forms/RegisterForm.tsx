import { Button, CircularProgress, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import PasswordInput from './PasswordInput';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    const handleSubmit = async (values: {email: string, password: string, confirmPassword: string}, { setSubmitting, resetForm} : {setSubmitting : (isSubmitting: boolean) => void, resetForm: () => void}) => {
        console.log(values);
        setSubmitting(false);
        resetForm();
        navigate('/profile')
    }


    return (
        <Formik initialValues={{
            email: '',
            password: '',
            confirmPassword: ''
        }} 
        onSubmit={handleSubmit} 
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
