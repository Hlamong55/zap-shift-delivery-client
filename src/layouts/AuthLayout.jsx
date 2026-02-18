import React from 'react';
import Logo from '../components/Logo/Logo';
import { Outlet } from 'react-router';
import authImg from '../../src/assets/authImage.png';

const AuthLayout = () => {
    return (
        <div className="max-w-7xl mx-auto">
            {/* Fixed Navbar */}
            <div className="w-full py-6 px-10 bg-white sticky top-0 z-50">
                <Logo />
            </div>

            {/* Two column layout */}
            <div className="max-w-7xl mx-auto flex min-h-[calc(100vh-80px)]">
                
                {/* LEFT FORM SECTION */}
                <div className="flex-1 flex items-center justify-center px-16">
                    <Outlet />
                </div>

                {/* RIGHT IMAGE SECTION */}
                <div className="flex-1 bg-[#F3F4F6] flex items-center justify-center">
                    <img src={authImg} alt="illustration" className="w-[85%]" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
