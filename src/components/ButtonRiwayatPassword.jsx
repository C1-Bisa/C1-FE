'use client';

export default function Button({
    className = 'text-neu-4 h-[40px] w-[650px] rounded-rad-4 border-net-6 bg-pur-3 py-[7px] font-poppins text-body-6 font-normal',
    text,
    children,
    ...rest
}) {
    return (
        <button {...rest} className={`${className} font-poppins`}>
            {text || children}
        </button>
    );
}
