import Lottie from 'lottie-react';
import sphere from '../../assets/lottie/sphere.json';

const EmptyChat = () => {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="hidden lg:block lg:w-1/2 h-full">
                <div className="flex flex-col justify-center items-center py-10 h-full">
                    <Lottie animationData={sphere} loop={true} className="w-2/3 mt-4" />
                    <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-lg text-nowrap">
                        Welcome to <span className='text-transparent bg-clip-text bg-blue-gradient'>Connect</span>
                    </h1>
                    <h2 className="text-sm text-gray-300 mt-2">
                        Chat Effortlessly, Anytime, Anywhere
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default EmptyChat;
