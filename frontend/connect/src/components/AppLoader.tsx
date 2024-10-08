import { useEffect } from 'react';
import Lottie from 'lottie-react';
import sphere from '../assets/lottie/sphere.json';

const AppLoader = () => {

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.pointerEvents = 'none'; 

        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.pointerEvents = 'auto';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-dark-bg flex justify-center items-center">
            <Lottie animationData={sphere} loop={true} className="w-[150px] mt-4" />
        </div>
    );
}

export default AppLoader;
