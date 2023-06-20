'use client';
import { useState, useEffect } from 'react';

export default function AlertBottom({ visibleAlert, handleVisibleAlert, className, text, type = 'success' }) {
    // const [visibleAlert, setVisibleAlert] = useState(true);

    const alertType = {
        success: 'bg-alert-1',
        warn: 'bg-alert-2',
        failed: 'bg-alert-3',
    };

    useEffect(() => {
        if (visibleAlert) {
            setTimeout(() => {
                handleVisibleAlert();
            }, 1750);
        }
    }, [visibleAlert, handleVisibleAlert]);

    return (
        <>
            {visibleAlert && (
                <div
                    className={`${className} ${alertType[type]}  absolute bottom-12 left-[50%] w-max translate-x-[-50%] rounded-rad-3 px-6 py-4 text-center font-poppins text-body-6 font-medium text-white`}>
                    {text}
                </div>
            )}
        </>
    );
}
