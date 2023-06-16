'use client';

import PasswordInput from '@/app/components/PasswordInput';
import AskAccountButton from '@/app/components/AskAccountButton';
import Button from '@/app/components/Button';
import AlertBottom from '@/app/components/AlertBottom';
import { useState } from 'react';

export default function Login() {
    const [visibleAlert, setVisibleAlert] = useState(false);
    const handleVisibleAlert = () => setVisibleAlert(!visibleAlert);

    return (
        <section className='h-max:[] w-full '>
            <div className='grid h-full grid-cols-12'>
                <div className=' col-span-6 '>
                    <div className='relative h-full '>
                        <img src='./images/Ulang_Sandi.jpg' alt='' fill={true} style={{ objectFit: 'cover' }} quality={100} />
                    </div>
                </div>
                <div className='relative col-span-6'>
                    <AlertBottom
                        visibleAlert={visibleAlert}
                        handleVisibleAlert={handleVisibleAlert}
                        className='bg-alert-3'
                        text={'Tautan invalid atau kadaluarsa'}
                    />
                    <div className='flex h-full items-center justify-center '>
                        <div className='flex w-[452px] flex-col gap-5 '>
                            <h1 className='text-heading-2 mb-2 font-poppins font-bold'>Masuk</h1>
                            <div className='flex flex-col'>
                                <label htmlFor='email' className='mb-1 font-poppins text-body-6 font-normal'>
                                    Email/No Telepon
                                </label>
                                <input
                                    type='text'
                                    id='email'
                                    className='appearance-none rounded-rad-4 border border-net-2 px-6 py-[14px] font-poppins text-body-6 font-normal outline-none focus:border-pur-4'
                                    placeholder='Contoh: johndoe@gmail.com'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label
                                    htmlFor='password'
                                    className='mb-1 flex justify-between font-poppins text-body-6 font-normal'>
                                    Password{' '}
                                    <span className='cursor-pointer text-body-3 font-medium text-pur-4'>Lupa Kata Sandi</span>
                                </label>
                                <PasswordInput id='password' placeholder='Masukkan password' />
                            </div>
                            <Button onClick={() => handleVisibleAlert()}>Masuk</Button>
                            <AskAccountButton
                                prefix={'Belum punya akun?'}
                                suffix={'Daftar Disini'}
                                onClick={() => console.log('Ini diganti Fungsi')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// export default function Login() {
//     const [visibleAlert, setVisibleAlert] = useState(false);
//     const handleVisibleAlert = () => setVisibleAlert(!visibleAlert);

//     return (
//         <section className='h-screen'>
//             <div className='grid h-full grid-cols-12'>
//                 <div className='col-span-6'>
//                     <div className='relative h-full'>
//                         <img src={'./images/Ulang_Sandi.jpg'} alt='' fill={true} style={{ objectFit: 'cover' }} quality={100}   />
//                     </div>
//                 </div>
//                 <div className='relative col-span-6'>
//                     <AlertBottom
//                         visibleAlert={visibleAlert}
//                         handleVisibleAlert={handleVisibleAlert}
//                         className='bg-alert-3'
//                         text={'Tautan invalid atau kadaluarsa'}>
//                     <div>

//                     </div>
//                 </div>
//                 {/* <div className='relative col-span-6'>
//                     {/* <div className=' flex h-full items-center justify-center'>
//                         <form className='flex w-[452px] flex-col'>
//                             <h2 className='text-heading-2 mb-2 font-poppins font-bold'>Masuk</h2>
//                             <div className='flex justify-between rounded-xl  text-black'>
//                                 <label className='py-3 font-poppins text-body-3 '>Email/No Telepon</label>
//                             </div>
//                             <div className='flex flex-col rounded-xl py-2 text-black'>
//                                 <input
//                                     className='-mt-3 border-spacing-24 rounded-xl bg-white p-2 outline outline-2 outline-slate-200 focus:border-gray-200'
//                                     type='text'
//                                 />
//                             </div>
//                             <div className='flex justify-between rounded-xl  text-black'>
//                                 <label className='text-body- py-2 font-poppins'>Password</label>
//                                 <p className='py-2 text-sm text-violet-600'>Lupa Kata Sandi</p>
//                             </div>
//                             <div className='flex flex-col rounded-xl py-2 text-black'>
//                                 <input
//                                     className='-mt-3 border-spacing-24 rounded-xl bg-white p-2 outline outline-2 outline-slate-200 focus:border-gray-200'
//                                     type='password'
//                                 />
//                             </div>
//                             <button className='my-5 w-full rounded-xl bg-violet-800 py-3 text-body-6 text-white'>Masuk</button>

//                             {/* <div className='justify-items-center mx-24  py-3 mt-28 bg-[#FF0000] text-white rounded-xl'>
//                             <p className='text-center text-xs '>Tautan invalid atau kadaluarsa</p>
//                         </div> */}
//                         {/* </form>
//                     </div> */}
//                 {/* </div> */}
//             </div>
//         </section>
//     );
// }
