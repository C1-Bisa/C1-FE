'use client';

//core
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

//third parties
import axios from 'axios';

//redux
//----

//components
import Input from '@/components/Input';
import Label from '@/components/Label';
import PasswordInput from '@/components/PasswordInput';
import AskAccountButton from '@/components/AskAccountButton';
import Button from '@/components/Button';
import AlertBottom from '@/components/AlertBottom';

//utils
//----

export default function Login() {
    /*=== core ===*/
    const router = useRouter();

    /*=== next auth ===*/
    //----

    /*=== redux ===*/
    //----

    /*=== state ===*/
    const [visibleAlert, setVisibleAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [alertType, setAlertType] = useState('');
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    /*=== function ===*/
    const handleVisibleAlert = (text, alertType) => {
        setAlertText(text);
        setAlertType(alertType);
        setVisibleAlert(!visibleAlert);
    };

    const handleLoginData = (event) => {
        setLoginData({ ...loginData, [event.target.name]: event.target.value });
    };

    const forgetPassword = async () => {
        try {
            const URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/user/resetPassword';
            const email = {
                email: loginData.email,
            };
            const res = await axios.post(URL, email);

            router.push('/reset-password');
            return res;
        } catch (error) {
            // console.log(error.message);
            const text = error.response.data.message;
            handleVisibleAlert(text, 'failed');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        signIn('credentials', {
            email: loginData.email,
            password: loginData.password,
            redirect: false,
        }).then((res) => {
            if (res.error) {
                handleVisibleAlert(res.error, 'failed');
            }
            if (!res.error) {
                router.refresh();
                router.replace('/');
            }
        });
    };

    /*=== effects ===*/
    //----

    return (
        <>
            {/* DEKSTOP MODE */}
            <section className='hidden h-screen bg-white lg:block'>
                <div className='grid h-full w-full grid-cols-12'>
                    <div className='relative col-span-6 '>
                        <div className='relative h-full'>
                            <Image
                                src={`/new_images/left_login.svg`}
                                alt=''
                                fill
                                style={{ objectFit: 'cover' }}
                                quality={100}
                                priority
                            />
                        </div>
                    </div>
                    <div className='relative col-span-6 flex flex-col items-center justify-center px-0 '>
                        <form onSubmit={handleLogin} className='flex  w-[452px] flex-col  gap-5'>
                            <h1 className='text-heading-2 mb-2 font-poppins text-2xl font-bold'>Masuk</h1>
                            <div className='flex flex-col'>
                                <Label htmlFor='email'>Email/No Telepon</Label>
                                <Input
                                    id='email'
                                    placeholder='Contoh: johndoe@gmail.com'
                                    name={'email'}
                                    value={loginData.email}
                                    onChange={handleLoginData}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <div className='mb-1 flex justify-between font-poppins'>
                                    <Label htmlFor='password' className=' text-body-3'>
                                        Password{' '}
                                    </Label>
                                    <span
                                        className='cursor-pointer text-body-6 font-medium text-pur-4 hover:text-pur-2'
                                        onClick={() => forgetPassword()}>
                                        Lupa Kata Sandi
                                    </span>
                                </div>

                                <PasswordInput
                                    id='password'
                                    placeholder='Masukkan password'
                                    value={loginData.password}
                                    name={'password'}
                                    onChange={handleLoginData}
                                />
                            </div>
                            <Button type={'submit'}>Masuk</Button>
                            <AskAccountButton
                                prefix={'Belum punya akun?'}
                                suffix={'Daftar Disini'}
                                onClick={() => router.push('/register')}
                            />
                        </form>
                        <AlertBottom
                            visibleAlert={visibleAlert}
                            handleVisibleAlert={handleVisibleAlert}
                            text={alertText}
                            type={alertType}
                        />
                    </div>
                </div>
            </section>
            {/* DEKSTOP MODE */}

            {/* MOBILE MODE */}
            <section className='h-screen bg-white lg:hidden'>
                <div className='grid h-full w-full grid-cols-12'>
                    <div className='col-span-12 flex flex-col justify-center  px-[26px] '>
                        <form onSubmit={handleLogin} className='flex w-full flex-col gap-5 '>
                            <h1 className='text-heading-2 mb-2 font-poppins text-2xl font-bold'>Masuk</h1>
                            <div className='flex flex-col'>
                                <Label htmlFor='email'>Email/No Telepon</Label>
                                <Input
                                    id='email'
                                    placeholder='Contoh: johndoe@gmail.com'
                                    value={loginData.email}
                                    name={'email'}
                                    onChange={handleLoginData}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <div className='mb-1 flex justify-between font-poppins'>
                                    <Label htmlFor='password' className=' text-body-3'>
                                        Password{' '}
                                    </Label>
                                    <span
                                        className='cursor-pointer text-body-6 font-medium text-pur-4 hover:text-pur-2'
                                        onClick={() => forgetPassword()}>
                                        Lupa Kata Sandi
                                    </span>
                                </div>

                                <PasswordInput
                                    id='password'
                                    placeholder='Masukkan password'
                                    value={loginData.password}
                                    name={'password'}
                                    onChange={handleLoginData}
                                />
                            </div>
                            <Button type={'submit'}>Masuk</Button>
                            <AskAccountButton
                                prefix={'Belum punya akun?'}
                                suffix={'Daftar Disini'}
                                onClick={() => router.push('/register')}
                            />
                        </form>
                    </div>
                    <AlertBottom
                        visibleAlert={visibleAlert}
                        handleVisibleAlert={handleVisibleAlert}
                        text={alertText}
                        type={alertType}
                    />
                </div>
            </section>
            {/* MOBILE MODE */}
        </>
    );
}
