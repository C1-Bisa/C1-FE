'use client';

import Navbar from '@/components/Navbar';
import Label from '@/components/Label';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { FiArrowLeft, FiEdit3, FiSettings, FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Akun() {
    const { data: session, status } = useSession();
    const [fetchData, setFetchData] = useState(true);
    const [selectedMenu, setSelectedMenu] = useState(1);
    const handleSelectedMenu = (id) => setSelectedMenu(id);
    const router = useRouter();
    let token = session?.user?.token;
    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        email: '',
    });

    // console.log(selectedMenu);

    const option = [
        {
            id: 1,
            menu: 'Ubah Profile',
            icons: <FiEdit3 className='h-[18px] w-[18px]   group-hover:text-white' />,
        },
        {
            id: 2,
            menu: 'Pengaturan Akun',
            icons: <FiSettings className='h-[18px] w-[18px]  group-hover:text-white' />,
        },
        {
            id: 3,
            menu: 'Keluar',
            icons: <FiLogOut className='h-[18px] w-[18px]   group-hover:text-white' />,
        },
    ];

    useEffect(() => {
        if (token) {
            if (fetchData) {
                async function fetchUserData() {
                    try {
                        const URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/user/getProfile';
                        const res = await axios.get(URL, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });

                        setUserData({
                            name: res.data.data.nama,
                            email: res.data.data.email,
                            phone: res.data.data.phone,
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
                fetchUserData();
            }
            setFetchData(false);
        }
    }, [fetchData, session, token]);

    return (
        <>
            <Navbar className={'hidden lg:block'} />
            <div className='container mx-auto  grid max-w-screen-lg  grid-cols-12  gap-3 font-poppins'>
                <h1 className='col-span-12 mb-[24px] mt-[47px] font-poppins text-head-1 font-bold'>Akun</h1>
                <div
                    className='col-span-12 flex cursor-pointer items-center gap-4 rounded-rad-3 bg-pur-3 py-[13px] font-poppins text-title-2 font-medium text-white'
                    onClick={() => router.push('/')}>
                    <FiArrowLeft className='ml-[21px]  h-6 w-6 ' />
                    <p>Beranda</p>
                </div>

                <div className='col-span-12 grid grid-cols-12 gap-[56px]'>
                    <div className='col-span-4'>
                        {option &&
                            option.map((opt) => (
                                <div
                                    key={opt.id} //opt.action;
                                    //handleSelectedMenu(opt.id);
                                    onClick={() => (opt.id === 3 ? signOut() : handleSelectedMenu(opt.id))}
                                    className={`${
                                        selectedMenu === opt.id ? 'group bg-pur-3 text-white' : 'group bg-white text-black'
                                    }  flex cursor-pointer items-center gap-4 rounded-rad-2 border-b-[1px] px-3 py-4 hover:bg-pur-3 `}>
                                    {opt.icons}
                                    <p
                                        className={`${
                                            selectedMenu === opt.id ? ' text-white' : ' text-black'
                                        } font-poppins text-title-2 font-medium  group-hover:text-white`}>
                                        <span
                                            className={`${
                                                selectedMenu === opt.id ? ' text-white' : ' text-black'
                                            }  group-hover:text-white`}>
                                            {opt.menu}
                                        </span>
                                    </p>
                                </div>
                            ))}
                    </div>
                    <div className='col-span-8 rounded-rad-2 px-6 shadow-low'>
                        {selectedMenu === 1 && (
                            <div>
                                <h1 className='mb-5 mt-[40px] text-head-1 font-bold'>Ubah Data Profil </h1>

                                <form className='flex flex-col gap-4'>
                                    <div className=' rounded-t-rad-2 bg-pur-3 px-4  py-2 text-title-2 text-white'>
                                        <h1>Data Diri</h1>
                                    </div>

                                    <div className='flex flex-col gap-3'>
                                        <div className='flex flex-col gap-2'>
                                            <Label htmlFor={'name'} className='text-body-6 font-bold text-pur-5'>
                                                Nama Lengkap
                                            </Label>
                                            <Input
                                                id={'name'}
                                                readOnly
                                                value={userData.name || 'Sedang menload data...'}
                                                className='rounded-rad-1 px-4 py-2'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label htmlFor={'phone'} className='text-body-6 font-bold text-pur-5'>
                                                Nomor Telepon
                                            </Label>
                                            <Input
                                                id={'phone'}
                                                readOnly
                                                value={userData.phone || 'Sedang menload data...'}
                                                className='rounded-rad-1 px-4 py-2'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label htmlFor={'email'} className='text-body-6 font-bold text-pur-5'>
                                                Email
                                            </Label>
                                            <Input
                                                id={'email'}
                                                readOnly
                                                value={userData.email || 'Sedang menload data...'}
                                                className='rounded-rad-1 px-4 py-2'
                                            />
                                        </div>
                                        <div className='mb-6 mt-5 flex justify-center'>
                                            <Button className='rounded-rad-3 bg-pur-5 px-11 py-3 text-white'>Simpan</Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='mt-[100px]'></div>
        </>
    );
}
