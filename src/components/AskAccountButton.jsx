'use client';

export default function AskAccountButton({ prefix, suffix, onClick }) {
    return (
        <div className='flex justify-center'>
            <p className='font-poppins text-body-c font-normal'>
                {prefix}
<<<<<<< HEAD
                <span onClick={onClick} className='ml-2 cursor-pointer font-bold  text-purple-4 hover:text-purple-2'>
=======
                <span onClick={onClick} className='ml-2 cursor-pointer font-semibold  text-purple-4 hover:text-purple-2'>
>>>>>>> tiyas-OTP
                    {suffix}
                </span>
            </p>
        </div>
    );
}
