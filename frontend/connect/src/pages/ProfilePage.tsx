import { Button } from "@mui/material";
import ProfileForm from "../components/forms/ProfileForm";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
import { useProfileStore } from "../store/useProfileStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

const ProfilePage = () => {
    const { profile, status: profileStatus, fetchProfile } = useProfileStore();
    const { user } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        const loadProfile = async () => {
            if (profileStatus === 'idle') {
                await fetchProfile();
            }
        };

        loadProfile();
    }, [profileStatus, fetchProfile]);

    if (!user) {
        return <Navigate to="/auth" state={{ from: location.pathname }} replace={true} />;
    }

    return (
        <div className="container relative">
            {profile && (
                <div className="pt-3 px-3 absolute top-0">
                    <Button onClick={() => navigate('/')} startIcon={<ArrowBackIosNewRounded />} />
                </div>
            )}
            <ProfileForm />
        </div>
    );
}

export default ProfilePage;
