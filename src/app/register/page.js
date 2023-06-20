'use client';

import { useState } from 'react';
import Input from '@/components/Input';
import Label from '@/components/Label';
import Image from 'next/image';
import PasswordInput from '@/components/PasswordInput';
import AskAccountButton from '@/components/AskAccountButton';
import Button from '@/components/Button';
import AlertBottom from '@/components/AlertBottom';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Register() {
    const router = useRouter();
    const [visibleAlert, setVisibleAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [alertType, setAlertType] = useState('');
    const handleVisibleAlert = (text, alertType) => {
        setAlertText(text);
        setAlertType(alertType);
        setVisibleAlert(!visibleAlert);
    };

    const [regisData, setRegisData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });

    const handleRegisData = (event) => {
        setRegisData({ ...regisData, [event.target.name]: event.target.value });
    };

    const registerUser = async ({ name, email, phone, password }) => {
        try {
            const URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/user/register';
            const res = await axios.post(URL, {
                name,
                email,
                phone,
                password,
            });
            handleVisibleAlert(res.data.message, 'success');
            // console.log(res.data);
            return res.data;
        } catch (error) {
            const text = error.response.data.message;
            handleVisibleAlert(text, 'failed');
        }
    };

    const handleRegis = async (e) => {
        e.preventDefault();
        try {
            if (!regisData.name || !regisData.email || !regisData.password || !regisData.phone) {
                handleVisibleAlert('Field harus diisi semua!', 'failed');
                return;
            }
            const templateObj = {
                name: regisData.name,
                email: regisData.email,
                phone: regisData.phone,
                password: regisData.password,
            };
            const res = await registerUser(templateObj);

            if (res.status === 'Success') {
                let id = res.data.user.id;
                let emails = res.data.user.email;
                // emails: res.data.user.email,

                router.push(`otp/${id}/${emails}`);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            {/* DEKSTOP MODE */}
            <section className='hidden h-screen bg-white lg:block'>
                <div className='grid h-full w-full grid-cols-12'>
                    <div className='relative  col-span-6 '>
                        <div className='relative h-full'>
                            <Image
                                src={`/images/Ulang_Sandi.jpg`}
                                alt=''
                                fill={true}
                                style={{ objectFit: 'cover' }}
                                quality={100}
                            />
                        </div>
                    </div>
                    <div className='relative col-span-6 flex   flex-col items-center justify-center px-0 '>
                        <form className='flex  w-[452px] flex-col  gap-5' onSubmit={handleRegis}>
                            <h1 className='text-heading-2 mb-2 font-poppins text-2xl font-bold '>Daftar</h1>
                            <div className='flex flex-col'>
                                <Label htmlFor='name'>Nama </Label>
                                <Input
                                    id='name'
                                    placeholder='Nama Lengkap'
                                    name='name'
                                    value={regisData.name}
                                    onChange={handleRegisData}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <Label htmlFor='email'>Email</Label>
                                <Input
                                    id='email'
                                    name='email'
                                    placeholder='Contoh: Johndee@gmail.com'
                                    value={regisData.email}
                                    onChange={handleRegisData}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <Label htmlFor='phone'>No Telepon</Label>
                                <Input
                                    id='phone'
                                    placeholder='+62'
                                    name='phone'
                                    value={regisData.phone}
                                    onChange={handleRegisData}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <Label htmlFor='password' className='mb-1 flex justify-between text-body-4'>
                                    Passwords
                                </Label>
                                <PasswordInput
                                    id='password'
                                    name='password'
                                    placeholder='Buat Password'
                                    value={regisData.password}
                                    onChange={handleRegisData}
                                />
                            </div>
                            <Button type='submit'>Daftar</Button>
                            <AskAccountButton
                                prefix={'Sudah Punya Akun?'}
                                suffix={'Masuk Disini'}
                                onClick={() => router.push('/login')}
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
                        <form className='flex w-full flex-col gap-5 ' onSubmit={handleRegis}>
                            <h1 className='text-heading-2 mb-2 font-poppins text-2xl font-bold '>Daftar</h1>
                            <div className='flex flex-col'>
                                <Label htmlFor='name'>Nama </Label>
                                <Input
                                    id='name'
                                    placeholder='Nama Lengkap'
                                    name='name'
                                    value={regisData.name}
                                    onChange={handleRegisData}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <Label htmlFor='email'>Email</Label>
                                <Input
                                    id='email'
                                    name='email'
                                    placeholder='Contoh: Johndee@gmail.com'
                                    value={regisData.email}
                                    onChange={handleRegisData}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <Label htmlFor='phone'>No Telepon</Label>
                                <Input
                                    id='phone'
                                    placeholder='+62'
                                    name='phone'
                                    value={regisData.phone}
                                    onChange={handleRegisData}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <Label htmlFor='password' className='mb-1 flex justify-between text-body-4'>
                                    Passwords
                                </Label>
                                <PasswordInput
                                    id='password'
                                    name='password'
                                    placeholder='Buat Password'
                                    value={regisData.password}
                                    onChange={handleRegisData}
                                />
                            </div>
                            <Button type='submit'>Daftar</Button>
                            <AskAccountButton
                                prefix={'Sudah Punya Akun?'}
                                suffix={'Masuk Disini'}
                                onClick={() => router.push('/login')}
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
