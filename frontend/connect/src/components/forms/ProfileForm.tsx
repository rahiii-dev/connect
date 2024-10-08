import { useEffect, useState } from 'react';
import { Avatar, Button, TextField, Box, CircularProgress, MenuItem, FormControl, InputLabel, Select, FormHelperText, debounce } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { AVATAR_URL } from '../../utils/constants';
import { verifyUsername } from '../../api/profile';
import { useProfileStore } from '../../store/useProfileStore';
import imageUploader from '../../api/imageUpload';

// Validation Schema
const ProfileSchema = Yup.object().shape({
    username: Yup.string().required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(10, "Username can't be more than 10 characters")
        .matches(/^[A-Za-z0-9](?!.*__)[A-Za-z0-9_.]*$/, 'Username can only contain alphabets, numbers, underscores, and dots, and cannot start with an underscore'),
    bio: Yup.string().max(160, 'Bio must be at most 160 characters'),
    gender: Yup.string().required('Gender is required'),
});

const ProfileForm = () => {
    const { createOrUpdateProfile, profile, loading } = useProfileStore();
    const [avatar, setAvatar] = useState(profile?.avatarUrl || AVATAR_URL);
    const [avatarLoading, setAvatarLoading] = useState(false);
    const [imageSelected, setImageSelected] = useState(false);
    const [image, setImage] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const newAvatarUrl = URL.createObjectURL(file);
            setAvatar(newAvatarUrl); 
            setImageSelected(true);
            setImage(file);
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

    const handleImageLoad = () => setAvatarLoading(false);
    const handleImageError = () => setAvatarLoading(false);

    const checkUsername = debounce(async (username: string, setFieldError: Function) => {
        if (username.length >= 3) {
            const response = await verifyUsername(username);
            if (response.exists) {
                setFieldError('username', 'Username already exists');
            }
        }
    }, 500);

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

            <Formik
                initialValues={{
                    username: '',
                    bio: '',
                    gender: '',
                }}
                validationSchema={ProfileSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    let avatarUrl = avatar;
                    if (image) {
                        avatarUrl = await imageUploader(image);
                    }
                    await createOrUpdateProfile({ ...values, avatarUrl, gender: values.gender === 'male' ? 'male' : 'female' });
                    setSubmitting(false);
                }}
            >
                {({ values, errors, touched, handleChange, handleBlur, isSubmitting, setValues, setFieldError }) => {
                    useEffect(() => {
                        if (profile) {
                            setValues({
                                username: profile.username || '',
                                bio: profile.bio || '',
                                gender: profile.gender || '',
                            });
                            setAvatar(profile.avatarUrl || AVATAR_URL);
                            setImageSelected(true);
                        }
                    }, [profile, setValues]);

                    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e); 
                        const newUsername = e.target.value;
                        checkUsername(newUsername, setFieldError); 
                        updateAvatarUrl(newUsername, values.gender); 
                    };

                    return (
                        <Form className="w-full space-y-4">
                            <div className="mb-4">
                                <TextField
                                    fullWidth
                                    id="username"
                                    name="username"
                                    label="Username"
                                    value={values.username}
                                    onChange={handleUsernameChange}
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
                                    {touched.gender && errors.gender && <FormHelperText error>{touched.gender && errors.gender}</FormHelperText>}
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
                    );
                }}
            </Formik>
        </Box>
    );
};

export default ProfileForm;
