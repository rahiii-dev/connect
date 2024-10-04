import Lottie from 'lottie-react';
import notfoundData from '../assets/lottie/404.json';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className='container h-screen w-screen flex justify-center items-center bg-[#1A1A2E]'>
            <div className='w-[50vw] h-full flex flex-col justify-center items-center mx-auto'>
                <Lottie animationData={notfoundData} loop={true} />
                <Button
                    onClick={() => navigate('/', { replace: true })}
                    variant="contained"
                    className='-top-20 flex items-center transition-transform duration-300 hover:scale-105'
                    startIcon={<ArrowBack />}
                >
                    Go Back
                </Button>
            </div>
        </div>
    );
}
export default NotFoundPage;
