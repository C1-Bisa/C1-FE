// 'use client';
// import Image from 'next/image';
// import AskAccountButton from '@/components/AskAccountButton';
// import Navbar from '@/components/Navbar';
// import AlertBottom from '@/components/AlertBottom';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// export default function OTP() {
//     const router = useRouter();
//     // const [counter, setCounter] = useState(60);
//     // const [visibleAlert, setVisibleAlert] = useState(false);
//     const [visibleAlert, setVisibleAlert] = useState(false);
//     const [alertText, setAlertText] = useState('');
//     const [alertType, setAlertType] = useState('');
//     const handleVisibleAlert = (text, alertType) => {
//         setAlertText(text);
//         setAlertType(alertType);
//         setVisibleAlert(!visibleAlert);
//     };

//     useEffect(() => {
//         const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
//         return () => clearInterval(timer);
//     }, [counter]);

//     const [otpCode, setOtpCode] = useState({
//         otp1: '',
//         otp2: '',
//         otp3: '',
//         otp4: '',
//         otp5: '',
//         otp6: '',
//     });
//     const [finalOtp, setFinalOtp] = useState('');

//     const handleOtpCode = (event) => {
//         setOtpCode({ ...otpCode, [event.target.name]: event.target.value });
//     };

//     const verificationAccount = async (OTPinput) => {
//         try {
//             const URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/user/verification';
//             const res = await axios.put(URL, {
//                 OTPinput,
//             });
//             console.log(res);

//             return res.data;
//         } catch (error) {
//             // console.log(error);
//             const text = error.response.data.message;
//             handleVisibleAlert(text, 'failed');
//             // return error.response.data.message;
//         }
//     };

//     const handleFinalOtpCode = async (e) => {
//         e.preventDefault();
//         if (otpCode.otp1 && otpCode.otp2 && otpCode.otp3 && otpCode.otp4 && otpCode.otp5 && otpCode.otp6) {
//             const realOtp = `${otpCode.otp1}${otpCode.otp2}${otpCode.otp3}${otpCode.otp4}${otpCode.otp5}${otpCode.otp6}`;
//             // setFinalOtp(realOtp);
//             const test = await verificationAccount(realOtp);
//             console.log('hehehe', test);
//             // console.log(realOtp);
//             setOtpCode({
//                 otp1: '',
//                 otp2: '',
//                 otp3: '',
//                 otp4: '',
//                 otp5: '',
//                 otp6: '',
//             });
//         }
//     };

//     return (
//         <section className='h-full w-full bg-white '>
//             <Navbar isCredential={false} isSearchMode={false} />

//             <div>
//                 <button onClick={() => router.push('/register')}>
//                     <Image
//                         className='ml-[341px] mt-[45px]'
//                         src={`./images/backh.svg`}
//                         alt=''
//                         width={24}
//                         height={24}
//                         quality={100}
//                     />
//                 </button>
//                 <div className='relative mt-[5px] flex-col justify-center overflow-hidden font-poppins'>
//                     <div className='relative mx-auto ml-[436px] w-[568px] max-w-lg rounded-2xl pt-[1px] '>
//                         <div className='mx-auto flex w-full flex-col pt-[2px]  '>
//                             <div className='flex flex-col pt-[1px]'>
//                                 <div className='text-head-2 font-bold'>
//                                     <p>Masukkan OTP</p>
//                                 </div>
//                                 <div className='mt-[40px] flex flex-row justify-center text-center text-[14px] font-normal'>
//                                     <p>
//                                         Ketik 6 digit kode yang dikirimkan ke <span className='font-bold '>J*****@gmail.com</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className=''>
//                                 <form onSubmit={handleFinalOtpCode}>
//                                     <div className='mt-[44px] flex flex-col justify-center'>
//                                         <div className='flex flex-row justify-center space-x-[16px] '>
//                                             <div className='h-[42px] w-[42px]'>
//                                                 <input
//                                                     className='flex h-full w-full flex-col items-center justify-center rounded-[16px] border border-gray-400 bg-white text-center text-lg outline-none ring-gray-400 focus:bg-gray-50 focus:ring-1'
//                                                     type='text'
//                                                     name='otp1'
//                                                     id=''
//                                                     maxLength='1'
//                                                     value={otpCode.otp1}
//                                                     onChange={handleOtpCode}
//                                                 />
//                                             </div>
//                                             <div className='h-[42px] w-[42px]'>
//                                                 <input
//                                                     className='flex h-full w-full flex-col items-center justify-center rounded-[16px] border border-gray-400 bg-white text-center text-lg outline-none ring-gray-400 focus:bg-gray-50 focus:ring-1'
//                                                     type='text'
//                                                     name='otp2'
//                                                     id=''
//                                                     maxLength='1'
//                                                     value={otpCode.otp2}
//                                                     onChange={handleOtpCode}
//                                                 />
//                                             </div>
//                                             <div className='h-[42px] w-[42px]'>
//                                                 <input
//                                                     className='flex h-full w-full flex-col items-center justify-center rounded-[16px] border border-gray-400 bg-white text-center text-lg outline-none ring-gray-400 focus:bg-gray-50 focus:ring-1'
//                                                     type='text'
//                                                     name='otp3'
//                                                     id=''
//                                                     maxLength='1'
//                                                     value={otpCode.otp3}
//                                                     onChange={handleOtpCode}
//                                                 />
//                                             </div>
//                                             <div className='h-[42px] w-[42px]'>
//                                                 <input
//                                                     className='flex h-full w-full flex-col items-center justify-center rounded-[16px] border border-gray-400 bg-white text-center text-lg outline-none ring-gray-400 focus:bg-gray-50 focus:ring-1'
//                                                     type='text'
//                                                     name='otp4'
//                                                     id=''
//                                                     maxLength='1'
//                                                     value={otpCode.otp4}
//                                                     onChange={handleOtpCode}
//                                                 />
//                                             </div>
//                                             <div className='h-[42px] w-[42px]'>
//                                                 <input
//                                                     className='flex h-full w-full flex-col items-center justify-center rounded-[16px] border border-gray-400 bg-white text-center text-lg outline-none ring-gray-400 focus:bg-gray-50 focus:ring-1'
//                                                     type='text'
//                                                     name='otp5'
//                                                     id=''
//                                                     maxLength='1'
//                                                     value={otpCode.otp5}
//                                                     onChange={handleOtpCode}
//                                                 />
//                                             </div>
//                                             <div className='h-[42px] w-[42px]'>
//                                                 <input
//                                                     className='flex h-full w-full flex-col items-center justify-center rounded-[16px] border border-gray-400 bg-white text-center text-lg outline-none ring-gray-400 focus:bg-gray-50 focus:ring-1'
//                                                     type='text'
//                                                     name='otp6'
//                                                     id=''
//                                                     maxLength='1'
//                                                     value={otpCode.otp6}
//                                                     onChange={handleOtpCode}
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className='mt-[24px] flex flex-row items-center justify-center text-center text-[14px] font-normal '>
//                                             <p>Kirim Ulang OTP dalam {counter} detik</p>{' '}
//                                             <a className='text-blue-600" href="http://" target="_blank" rel="noopener noreferrer flex flex-row items-center'></a>
//                                         </div>

//                                         <div className='mt-[105px] flex flex-col '>
//                                             <div className=''>
//                                                 <button
//                                                     type='submit'
//                                                     className='flex h-[48px] w-full flex-row items-center justify-center rounded-[16px] border bg-pur-4 text-center text-[14px] font-semibold text-white shadow-sm'>
//                                                     Simpan
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <AlertBottom visibleAlert={visibleAlert} handleVisibleAlert={handleVisibleAlert} text={alertText} type={alertType} />
//         </section>
//     );
// }

'use client';

// import React from 'react'

export default function OtpHome() {
    return (
        <div>
            <h1>HEHE</h1>
        </div>
    );
}