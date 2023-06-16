'use client';

import Login from '@/examples/Login';
import CardExample from '@/examples/CardExample';
import Image from 'next/image';
import SearchCityModal from '@/examples/SearchCityModal';
import ChoosePassengerTypeModal from '@/examples/ChoosePassengerTypeModal';
import ChooseFlightClassModal from '@/examples/ChooseFlightClassModal';
import ChooseFilterTicketModal from '@/examples/ChooseFilterTicketModal';
import SearchBar from '@/components/SearchBar';
import FlightCalendarPicker from '@/examples/FlightCalendarPicker';
import CalendarPicker from '@/components/CalendarPicker';
import ToggleRotate from '@/components/ToggleRotate';
import HomeSearch from '@/components/HomeSearch';
import Demo from '@/examples/Demo';
import LoginResponsive from '@/examples/LoginResponsive';
import RegisterResponsive from '@/examples/RegisterResponsive';
import HomePageResponsive from '@/examples/HomePageResponsive';
import Input from '@/components/Input';
import SearchPage from '@/examples/SearchPage';
import { FiSearch } from 'react-icons/fi';

import { useState } from 'react';
import Button from '@/components/Button';

import ComponentDocs from '@/examples/ComponentDocs';

export default function Home() {
    return (
        <main>
            {/* <Login /> */}
            {/* <LoginResponsive /> */}
            {/* <RegisterResponsive /> */}
            {/* <HomePageResponsive /> */}
            {/* <SearchPage /> */}
            {/* <CardExample /> */}

            {/* Buat Check Modal */}

                {/* <CardExample /> */}
                {/* <ChooseFilterTicketModal /> */}
                {/* <ChooseFlightClassModal /> */}
                {/* <ChoosePassengerTypeModal /> */}
                <SearchCityModal />
            {/* <SearchBar /> */}
            {/* <FlightCalendarPicker /> */}
            {/* <ToggleRotate /> */}
            {/* <CalendarPicker open={true} /> */}
            {/* <div className='flex items-center justify-center h-screen bg-slate-400'>
                <div className='h-[292px] w-[968px]'>
                    <HomeSearch />
                </div>
            </div> */}
            {/* <div className='flex items-center justify-center h-screen bg-slate-300 '>
                <div className='relative w-[500px]'>
                    <Input className='rounded-rad-4 bg-net-6 py-[14px] pl-[24px] pr-[64px]' placeholder={'Cari di sini...'} />
                    <FiSearch className='absolute right-0 top-1/2 mr-[17px] h-[20px] w-[20px] translate-y-[-50%] text-net-3' />
                </div>
            </div> */}

            {/* <ComponentDocs /> */}
        </main>
    );
}
//items-center justify-center backdrop-blur-sm fixed inset-0 flex
// Ngubah center dari atas ke bawah
// atas: 50% || transform: translateY(-50%)
// kanan: 50% || transform: translateX(-50%)

// Layout
// Component
