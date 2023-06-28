'use client';

export default function Button({
    className = 'rounded-rad-4 bg-pur-3 px-6 py-[14px] text-body-6 font-medium text-white hover:bg-pur-2',
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
