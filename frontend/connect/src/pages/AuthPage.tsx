import { useState } from 'react';
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
import AuthLayout from "../layouts/AuthLayout";
import { useAuthStore } from '../store/useAuthStore';
import { Navigate } from 'react-router-dom';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const {user} = useAuthStore();

    if(user) {
        return <Navigate to={'/'}/> 
    }

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <AuthLayout>
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-extrabold text-gray-400 mb-2">
                    {isLogin ? "Welcome Back!" : "Create an Account!"}
                </h1>
                <p className="text-gray-600 mb-6 text-center">
                    {isLogin 
                        ? "Please enter your email and password to access your account." 
                        : "Fill in the details below to register a new account."}
                </p>
                <div className='w-full'>
                    {isLogin ? <LoginForm /> : <RegisterForm />}
                </div>
                
                <button
                    onClick={toggleForm}
                    className="mt-4 text-blue-accent hover:underline focus:outline-none"
                >
                    {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
                </button>
            </div>
        </AuthLayout>
    );
}

export default AuthPage;
