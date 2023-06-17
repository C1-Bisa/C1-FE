'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import AlertBottom from '@/components/AlertBottom';
import Label from '@/components/Label';
// import Input from '@/components/Input';
import Button from '@/components/Button';
// import AskAccountButton from '@/components/AskAccountButton';
import PasswordInput from '@/components/PasswordInput';
import axios from 'axios';

export default function ResepPassword() {
    const searchParams = useSearchParams();
    const tokenParams = searchParams.get('token');

    // console.log(token);
    const [token, setToken] = useState('');

    useEffect(() => {
        if (tokenParams) {
            setToken(tokenParams);
        }
    }, [tokenParams]);
    // const token = tokenParams.split('');
    // console.log('tokenn: ', tokenParams);
    const router = useRouter();
    const [visibleAlert, setVisibleAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [alertType, setAlertType] = useState('');
    const handleVisibleAlert = (text, alertType) => {
        setAlertText(text);
        setAlertType(alertType);
        setVisibleAlert(!visibleAlert);
    };

    const [resetPasswordData, setResetPasswordData] = useState({
        new_password: '',
        rep_password: '',
    });

    const handleResetPasswordData = (event) => {
        setResetPasswordData({ ...resetPasswordData, [event.target.name]: event.target.value });
    };

    // console.log('userId', params.id);
    // console.log('token', params.token);

    const resetPassword = async ({ newPassword }) => {
        try {
            const URL = `https://kel1airplaneapi-production.up.railway.app/api/v1/user/createnewpassword`;

            // console.log('ini url', URL);
            const res = await axios.put(
                URL,
                {
                    newPassword,
                },
                {
                    params: {
                        token,
                    },
                }
            );

            // if (res.data) {
            // }
            // console.log(token);
            handleVisibleAlert(res.data.message, 'success');
            return res.data;
        } catch (error) {
            // console.log(error.message);
            const text = error.response.data.message;
            // return error.response.data.message;

            handleVisibleAlert(text, 'failed');
            // return error.response.data.message;
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            if (!resetPasswordData.new_password || !resetPasswordData.rep_password) {
                handleVisibleAlert('Field harus diisi semua!', 'failed');
                return;
            }

            if (resetPasswordData.new_password !== resetPasswordData.rep_password) {
                handleVisibleAlert('Harap diisi sama password antar field!', 'failed');
                return;
            }

            const templateObj = {
                newPassword: resetPasswordData.new_password,
            };

            const res = await resetPassword(templateObj);
            if (res.status === 'Success') {
                router.push('/login');
            }
        } catch (error) {}
    };

    return (
        <section className='h-screen bg-white'>
            <div className='grid h-full w-full grid-cols-12'>
                {/* left side start*/}
                <div className='col-span-6 hidden lg:col-span-6 lg:block'>
                    <div className='relative h-full'>
                        <Image
                            src={`/images/Ulang_Sandi.jpg`}
                            alt=''
                            fill
                            style={{ objectFit: 'cover' }}
                            quality={100}
                            priority
                        />
                    </div>
                </div>
                {/* left side end*/}

                {/* rigth side  start*/}
                <div className='col-span-12 flex flex-col justify-around  px-[26px] lg:col-span-6 lg:items-center lg:justify-center lg:px-0 '>
                    <form onSubmit={handleResetPassword} className='flex w-full flex-col gap-5  lg:w-[452px]'>
                        <h1 className='text-heading-2 mb-2 font-poppins text-2xl font-bold'>Reset Password</h1>
                        <div className='flex flex-col'>
                            <Label htmlFor='new_password' className='mb-1 flex justify-between text-body-4'>
                                Masukan Password Baru
                            </Label>
                            <PasswordInput
                                id='new_password'
                                name='new_password'
                                placeholder='Masukan password baru...'
                                value={resetPasswordData.new_password}
                                onChange={handleResetPasswordData}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <Label htmlFor='rep_password' className='mb-1 flex justify-between text-body-4'>
                                Ulangi Password Baru
                            </Label>
                            <PasswordInput
                                id='rep_password'
                                name='rep_password'
                                placeholder='Ulangi password...'
                                value={resetPasswordData.rep_password}
                                onChange={handleResetPasswordData}
                            />
                        </div>

                        <Button type={'submit'}>Simpan</Button>
                    </form>
                </div>
                <AlertBottom
                    visibleAlert={visibleAlert}
                    handleVisibleAlert={handleVisibleAlert}
                    text={alertText}
                    type={alertType}
                />
            </div>
            {/* rigth side  end*/}
        </section>
    );
}
