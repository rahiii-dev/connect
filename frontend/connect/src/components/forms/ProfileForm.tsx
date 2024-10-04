import { useState } from 'react';
import { Avatar, Button, TextField, Box, CircularProgress, MenuItem, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { AVATAR_URL } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

// Validation Schema
const ProfileSchema = Yup.object().shape({
    username: Yup.string().required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(10, "Username can't be more than 10 characters"),
    bio: Yup.string().max(160, 'Bio must be at most 160 characters'),
    gender: Yup.string().required('Gender is required'),
});

// type ProfileFormProps = {
//     avatar
// }

const ProfileForm = ({ user }) => {
    const [avatar, setAvatar] = useState(user?.avatarUrl || AVATAR_URL);
    const [loading, setLoading] = useState(false);
    const [avatarLoading, setAvatarLoading] = useState(false);
    const [imageSelected, setImageSelected] = useState(false); 

    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const newAvatarUrl = URL.createObjectURL(file);
            setAvatar(newAvatarUrl); 
            setImageSelected(true);
        }
    };

    const updateAvatarUrl = (username: string, gender: string) => {
        if (!imageSelected && username) {
            setAvatarLoading(true);  
            const genderPrefix = gender === 'male' ? 'boy' : gender === 'female' ? 'girl' : '';
            const newAvatarUrl = `${AVATAR_URL}/${genderPrefix}?username=${username}`;
            setAvatar(newAvatarUrl);
        }
    };

    const handleImageLoad = () => {
        setAvatarLoading(false); 
    };

    const handleImageError = () => {
        setAvatarLoading(false);  
        setAvatar(AVATAR_URL);   
    };

    // Handle form submission
    const handleSubmit = (values, { setSubmitting }) => {
        setLoading(true);
        setTimeout(() => {
            setSubmitting(false);
            setLoading(false);
            console.log('Profile updated:', values);
            navigate('/')
        }, 2000);
    };

    return (
        <Box component={'section'} className="flex flex-col items-center w-full lg:w-1/2 min-h-[100vh] py-10 mx-auto shadow-lg rounded-md">
            <div className='mb-6'>
                <div className="relative w-max mx-auto mb-1">
                    {avatarLoading && <CircularProgress size={120} thickness={2} className="absolute" />}
                        <Avatar
                            src={avatar}
                            alt="Profile Avatar"
                            sx={{ width: 120, height: 120, opacity: avatarLoading ? 0 : 1 }} 
                            className="shadow-md border-4 border-blue-accent"
                            imgProps={{
                                onLoad: handleImageLoad, 
                                onError: handleImageError 
                            }}
                        />
                    <input
                        accept="image/*"
                        type="file"
                        onChange={handleFileChange}
                        className="absolute w-full h-full opacity-0 cursor-pointer top-0 left-0"
                    />
                </div>
                <p className='text-gray-400 text-sm text-center'>click to upload</p>
            </div>

            {/* Formik Form */}
            <Formik
                initialValues={{
                    username: user?.username || '',
                    bio: user?.bio || '',
                    gender: user?.gender || '',
                }}
                validationSchema={ProfileSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                    <Form className="w-full space-y-4">
                        <div className="mb-4">
                            <TextField
                                fullWidth
                                id="username"
                                name="username"
                                label="Username"
                                value={values.username}
                                onChange={(e) => {
                                    handleChange(e); 
                                    updateAvatarUrl(e.target.value, values.gender); 
                                }}
                                onBlur={handleBlur}
                                error={touched.username && !!errors.username}
                                helperText={touched.username && errors.username}
                                variant="outlined"
                            />
                        </div>

                        {/* Bio Field */}
                        <div className="mb-4">
                            <TextField
                                fullWidth
                                id="bio"
                                name="bio"
                                label="Bio"
                                value={values.bio}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.bio && !!errors.bio}
                                helperText={touched.bio && errors.bio}
                                multiline
                                rows={4}
                                variant="outlined"
                            />
                        </div>

                        {/* Gender Select */}
                        <div className="mb-4">
                            <FormControl fullWidth variant="outlined" error={touched.gender && !!errors.gender}>
                                <InputLabel id="gender-label">Gender</InputLabel>
                                <Select
                                    labelId="gender-label"
                                    id="gender"
                                    name="gender"
                                    value={values.gender}
                                    onChange={(e) => {
                                        handleChange(e); 
                                        updateAvatarUrl(values.username, e.target.value);
                                    }}
                                    onBlur={handleBlur}
                                    label="Gender"
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                </Select>
                                {touched.gender && errors.gender && <FormHelperText error={true}>{touched.gender && errors.gender}</FormHelperText>}
                            </FormControl>
                        </div>

                        {/* Save Button */}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isSubmitting || loading}
                            endIcon={isSubmitting || loading ? <CircularProgress size={20} color="inherit" /> : null}
                            className="mt-6"
                        >
                            {isSubmitting || loading ? 'Saving...' : 'Save Profile'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}

export default ProfileForm;
