'use client';
import { useEffect } from 'react';

export default function AlertTop({ visibleAlert, handleVisibleAlert, text, type = 'success', bgType = 'blur' }) {
    const alertType = {
        success: 'bg-alert-1',
        warn: 'bg-alert-2',
        failed: 'bg-alert-3',
    };

    const alertBackground = {
        blur: 'bg-black bg-opacity-60',
        none: 'bg-none',
    };

    useEffect(() => {
        if (visibleAlert) {
            setTimeout(() => {
                handleVisibleAlert();
            }, 1600);
        }
    }, [visibleAlert, handleVisibleAlert]);

    return (
        <>
            {visibleAlert && (
                <div className={`fixed  inset-0 top-0  z-10 ${alertBackground[bgType]} font-poppins`}>
                    <div
                        className={`${alertType[type]} mx-auto mt-[140px] w-[320px] rounded-rad-3 py-3 text-center text-white lg:w-full lg:max-w-screen-lg`}>
                        <h1 className='text-body-4 font-medium lg:text-title-3'>{text}</h1>
                    </div>
                </div>
            )}
        </>
    );
}
