import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, CircularProgress} from '@mui/material';
import PasswordInput from './PasswordInput';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password too short').required('Password is required')
});

const LoginForm = () => {

    const handleSubmit = async (values: {email: string, password: string}, { setSubmitting, resetForm} : {setSubmitting : (isSubmitting: boolean) => void, resetForm: () => void}) => {
        console.log(values);
        setSubmitting(false);
        resetForm();
    }

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
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
                    </div>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        endIcon={isSubmitting ? <CircularProgress size={20}/> : null}
                    >
                        {isSubmitting ? 'Logging In...' : 'Login'}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
