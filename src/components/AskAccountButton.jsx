'use client';

export default function AskAccountButton({ prefix, suffix, onClick }) {
    return (
        <div className='flex justify-center'>
            <p className='font-bold text-xl leading-[30px]'>
                {prefix}
                <span onClick={onClick} className='ml-2 font-bold cursor-pointer text-black hover:text-pur-2'>
                    {suffix}
                </span>
            </p>
        </div>
    );
}
