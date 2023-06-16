'use client';

export default function ButtonPayment({
    className = 'rounded-rad-2 bg-pur-4 font-medium text-white hover:bg-pur-2 w-[486px] h-[62px] text-xl leading-7 text-center',
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
