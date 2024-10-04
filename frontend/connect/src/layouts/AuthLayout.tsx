import React from 'react';
import Lottie from 'lottie-react';
import sphere from '../assets/lottie/sphere.json';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
            {/* Left side with Lottie animation */}
            <div className="hidden lg:block lg:w-1/2 h-full">
                <div className="flex flex-col justify-center items-center py-10 h-full">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-blue-gradient tracking-wide drop-shadow-lg">
                        Connect
                    </h1>
                    <h2 className="text-sm text-gray-300 mt-2">
                        Chat Effortlessly, Anytime, Anywhere
                    </h2>
                    <Lottie animationData={sphere} loop={true} className="w-2/3 mt-4" />
                </div>
            </div>

            {/* Right side with children (form) */}
            <div className="flex items-center justify-center h-full w-full lg:w-1/2 p-8">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
