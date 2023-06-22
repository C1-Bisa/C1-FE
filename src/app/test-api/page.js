// // 'use client';

// // import { useEffect } from 'react';
// // import axios from 'axios';

// // export default function TestApi() {
// //     const URL = 'https://airplaneapikel1-production.up.railway.app/api/v1/flight/searchflight';

// //     useEffect(() => {
// //         const fetchFlight = async ({ from, to, departure_date, departure_time, returnDate }) => {
// //             try {
// //                 const objectTemplate = {
// //                     from,
// //                     to,
// //                     departure_date,
// //                     departure_time,
// //                     returnDate,
// //                 };
// //                 const response = await axios.post(URL, objectTemplate);
// //                 // return response.data.data.flight;
// //                 console.log(response.data.data.flight);
// //             } catch (error) {
// //                 return error.message;
// //             }
// //         };
// //         fetchFlight({
// //             from: 'Bali',
// //             to: 'Jakarta',
// //             departure_date: '2023-09-14',
// //             departure_time: '00:00',
// //             returnDate: '',
// //         });
// //     }, []);

// //     return <div>page</div>;
// // }
// import React from 'react'

// export default function page() {
//   return (
//       <div className='mx-auto mt-[47px] grid max-w-screen-lg grid-cols-12 font-poppins'>
//           {/* header order */}
//           <div className='col-span-12 flex gap-3 text-head-1 font-bold'>
//               <h1 className='cursor-pointer text-black'>Isi Data Diri</h1>
//               <p>{'>'}</p>
//               <h1 className='text-net-3'>Bayar</h1>
//               <p>{'>'}</p>
//               <h1 className='text-net-3'>Selesai</h1>
//           </div>
//           {/* header order */}
//           <div className='col-span-12 mt-[120px] grid grid-cols-12 font-poppins'>
//               <div className='col-span-7 flex flex-col gap-4'>
//                   <div className='w-[518px] rounded-rad-1 border border-net-3 px-4 py-[26px] shadow-low'>
//                       <h1 className='text-head-1 font-bold'>Isi Data Pemesan</h1>
//                       <div className='mt-4'>
//                           <h1 className='rounded-t-rad-2 bg-net-4  px-[16px] py-[8px] text-white'>Data Diri Pemesan</h1>

//                           {/* form pemesan */}
//                           <div className='mt-4 flex flex-col gap-3'>
//                               <div className='flex flex-col gap-2'>
//                                   <Label htmlFor={'name'} className='text-body-6 font-bold text-pur-5'>
//                                       Nama Lengkap
//                                   </Label>
//                                   <Input
//                                       id={'name'}
//                                       readOnly
//                                       // value={userData.name || 'Sedang menload data...'}
//                                       className='rounded-rad-1 px-4 py-2'
//                                   />
//                               </div>
//                               <div className='flex flex-col gap-2'>
//                                   <Label htmlFor={'phone'} className='text-body-6 font-bold text-pur-5'>
//                                       Nomor Telepon
//                                   </Label>
//                                   <Input
//                                       id={'phone'}
//                                       readOnly
//                                       // value={userData.phone || 'Sedang menload data...'}
//                                       className='rounded-rad-1 px-4 py-2'
//                                   />
//                               </div>
//                               <div className='flex flex-col gap-2'>
//                                   <Label htmlFor={'email'} className='text-body-6 font-bold text-pur-5'>
//                                       Email
//                                   </Label>
//                                   <Input
//                                       id={'email'}
//                                       readOnly
//                                       // value={userData.email || 'Sedang menload data...'}
//                                       className='rounded-rad-1 px-4 py-2'
//                                   />
//                               </div>
//                           </div>
//                           {/* form pemesan */}
//                       </div>
//                   </div>
//                   <div className='w-[518px] rounded-rad-1 border border-net-3 px-4 py-[26px] shadow-low'>
//                       <h1 className='text-head-1 font-bold'>Isi Data Penumpang</h1>
//                       <div className='mt-4'>
//                           <h1 className='rounded-t-rad-2 bg-net-4  px-[16px] py-[8px] text-white'>
//                               Data Diri Penumpang 1 - Adult
//                           </h1>

//                           {/* form pemesan */}
//                           <div className='mt-4 flex flex-col gap-3'>
//                               <div className='flex flex-col gap-2'>
//                                   <Label htmlFor={'name'} className='text-body-6 font-bold text-pur-5'>
//                                       Title
//                                   </Label>
//                                   <Input id={'name'} readOnly value={'Mr'} className='rounded-rad-1 px-4 py-2' />
//                               </div>
//                               <div className='flex flex-col gap-2'>
//                                   <Label htmlFor={'phone'} className='text-body-6 font-bold text-pur-5'>
//                                       Nama Lengkap
//                                   </Label>
//                                   <Input id={'phone'} readOnly value={'Alexa'} className='rounded-rad-1 px-4 py-2' />
//                               </div>
//                               <div className='flex flex-col gap-2'>
//                                   <Label htmlFor={'email'} className='text-body-6 font-bold text-pur-5'>
//                                       Nama Keluarga
//                                   </Label>
//                                   <Input id={'email'} readOnly value={'Maxwell'} className='rounded-rad-1 px-4 py-2' />
//                               </div>
//                               <div className='flex flex-col gap-2'>
//                                   <Label htmlFor={'email'} className='text-body-6 font-bold text-pur-5'>
//                                       Tanggal Lahir
//                                   </Label>
//                                   <Input id={'email'} readOnly value={'Maxwell'} className='rounded-rad-1 px-4 py-2' />
//                               </div>
//                               <div className='flex flex-col gap-2'>
//                                   <Label htmlFor={'email'} className='text-body-6 font-bold text-pur-5'>
//                                       Kewarganegaraan
//                                   </Label>
//                                   <Input id={'email'} readOnly value={'Maxwell'} className='rounded-rad-1 px-4 py-2' />
//                               </div>
//                               <div className='flex flex-col gap-2'>
//                                   <Label htmlFor={'email'} className='text-body-6 font-bold text-pur-5'>
//                                       KTP/Password
//                                   </Label>
//                                   <Input id={'email'} readOnly value={'Maxwell'} className='rounded-rad-1 px-4 py-2' />
//                               </div>
//                               <div className='flex flex-col gap-2'>
//                                   <Label htmlFor={'email'} className='text-body-6 font-bold text-pur-5'>
//                                       Negara Penerbit
//                                   </Label>
//                                   <Input id={'email'} readOnly value={'Maxwell'} className='rounded-rad-1 px-4 py-2' />
//                               </div>
//                               <div className='flex flex-col gap-2'>
//                                   <Label htmlFor={'email'} className='text-body-6 font-bold text-pur-5'>
//                                       Berlaku Sampai
//                                   </Label>
//                                   <Input id={'email'} readOnly value={'Maxwell'} className='rounded-rad-1 px-4 py-2' />
//                               </div>
//                           </div>
//                           {/* form pemesan */}
//                       </div>
//                   </div>

//                   <div className='w-[518px] rounded-rad-1 border border-net-3 px-4 py-[26px] shadow-low'>
//                       <h1 className='text-head-1 font-bold'>Pilih Kursi</h1>
//                       <div className='mt-4'>
//                           <h1 className='rounded-t-rad-2 bg-net-4  px-[16px] py-[8px] text-white'>Data Diri Pemesan</h1>

//                           {/* form pemesan */}
//                           <div className='mt-4 flex flex-col gap-3'>
//                               <div className='flex flex-col gap-2'>
//                                   <Label htmlFor={'name'} className='text-body-6 font-bold text-pur-5'>
//                                       Nama Lengkap
//                                   </Label>
//                                   <Input
//                                       id={'name'}
//                                       readOnly
//                                       // value={userData.name || 'Sedang menload data...'}
//                                       className='rounded-rad-1 px-4 py-2'
//                                   />
//                               </div>
//                               <div className='flex flex-col gap-2'>
//                                   <Label htmlFor={'phone'} className='text-body-6 font-bold text-pur-5'>
//                                       Nomor Telepon
//                                   </Label>
//                                   <Input
//                                       id={'phone'}
//                                       readOnly
//                                       // value={userData.phone || 'Sedang menload data...'}
//                                       className='rounded-rad-1 px-4 py-2'
//                                   />
//                               </div>
//                               <div className='flex flex-col gap-2'>
//                                   <Label htmlFor={'email'} className='text-body-6 font-bold text-pur-5'>
//                                       Email
//                                   </Label>
//                                   <Input
//                                       id={'email'}
//                                       readOnly
//                                       // value={userData.email || 'Sedang menload data...'}
//                                       className='rounded-rad-1 px-4 py-2'
//                                   />
//                               </div>
//                           </div>
//                           {/* form pemesan */}
//                       </div>
//                   </div>
//                   <div>
//                       <div className={styles.container}>
//                           <div className={styles.header}>
//                               <div className={styles.choose__seat__title}>
//                                   <h1>Pilih Kursi</h1>
//                               </div>
//                               <div className={styles.choose__seat__header}>
//                                   <h1>Economy - 64 Seats Available</h1>
//                               </div>
//                           </div>
//                           <div className={styles.choose__seat__body}>
//                               <div className={styles.choose__seat__body__header}>
//                                   {/* Grouping for A  B  C */}
//                                   <div style={{ display: 'flex', gap: '12px' }}>
//                                       {/* A */}
//                                       <div>
//                                           <h1 className={styles.choose__seat__title__code}>A</h1>
//                                           {flightSeat &&
//                                               flightSeat.map((seats, index) => (
//                                                   <div key={index} className={styles.choose__seat__btn__box}>
//                                                       {seats.type === 'A' &&
//                                                           seats.seat.map((data, index) => (
//                                                               <div key={index}>
//                                                                   <button
//                                                                       disabled={!data.available}
//                                                                       onClick={() => handleSeat(data)}
//                                                                       style={{
//                                                                           background: !data.available
//                                                                               ? '#73CA5C'
//                                                                               : seat.find((d) => d.code === data.code)
//                                                                               ? '#7126B5'
//                                                                               : '#d0d0d0',
//                                                                       }}
//                                                                       className={styles.choose__seat__btn}>
//                                                                       {seat.find((d) => d.code === data.code)
//                                                                           ? `P${seat.indexOf(data) + 1}`
//                                                                           : data.code}
//                                                                   </button>
//                                                               </div>
//                                                           ))}
//                                                   </div>
//                                               ))}
//                                       </div>

//                                       {/* B */}
//                                       <div>
//                                           <h1 className={styles.choose__seat__title__code}>B</h1>
//                                           {flightSeat &&
//                                               flightSeat.map((seats, index) => (
//                                                   <div key={index} className={styles.choose__seat__btn__box}>
//                                                       {seats.type === 'B' &&
//                                                           seats.seat.map((data, index) => (
//                                                               <div key={index}>
//                                                                   <button
//                                                                       disabled={!data.available}
//                                                                       onClick={() => handleSeat(data)}
//                                                                       style={{
//                                                                           background: !data.available
//                                                                               ? '#73CA5C'
//                                                                               : seat.find((d) => d.code === data.code)
//                                                                               ? '#7126B5'
//                                                                               : '#d0d0d0',
//                                                                       }}
//                                                                       className={styles.choose__seat__btn}>
//                                                                       {seat.find((d) => d.code === data.code)
//                                                                           ? `P${seat.indexOf(data) + 1}`
//                                                                           : data.code}
//                                                                   </button>
//                                                               </div>
//                                                           ))}
//                                                   </div>
//                                               ))}
//                                       </div>
//                                       {/* B */}
//                                       <div>
//                                           <h1 className={styles.choose__seat__title__code}>C</h1>
//                                           {flightSeat &&
//                                               flightSeat.map((seats, index) => (
//                                                   <div key={index} className={styles.choose__seat__btn__box}>
//                                                       {seats.type === 'C' &&
//                                                           seats.seat.map((data, index) => (
//                                                               <div key={index}>
//                                                                   <button
//                                                                       disabled={!data.available}
//                                                                       onClick={() => handleSeat(data)}
//                                                                       style={{
//                                                                           background: !data.available
//                                                                               ? '#73CA5C'
//                                                                               : seat.find((d) => d.code === data.code)
//                                                                               ? '#7126B5'
//                                                                               : '#d0d0d0',
//                                                                       }}
//                                                                       className={styles.choose__seat__btn}>
//                                                                       {seat.find((d) => d.code === data.code)
//                                                                           ? `P${seat.indexOf(data) + 1}`
//                                                                           : data.code}
//                                                                   </button>
//                                                               </div>
//                                                           ))}
//                                                   </div>
//                                               ))}
//                                       </div>
//                                   </div>
//                                   {/* Divider */}
//                                   <div
//                                       style={{
//                                           display: 'flex',
//                                           flexDirection: 'column',
//                                           justifyContent: 'center',
//                                           alignItems: 'center',
//                                       }}>
//                                       <h1 style={{ visibility: 'hidden' }} className={styles.choose__seat__title__code}>
//                                           .
//                                       </h1>
//                                       {flightSeat && (
//                                           <div className={styles.choose__seat__divider__box}>
//                                               {Array.from({ length: 12 }, (_, i) => {
//                                                   return (
//                                                       <div key={i}>
//                                                           <div className={styles.choose__divider__btn}>
//                                                               <p>{i + 1}</p>
//                                                           </div>
//                                                       </div>
//                                                   );
//                                               })}
//                                           </div>
//                                       )}
//                                   </div>
//                                   {/* Grouping for D  E  F */}
//                                   <div style={{ display: 'flex', gap: '12px' }}>
//                                       {/* D */}
//                                       <div>
//                                           <h1 className={styles.choose__seat__title__code}>D</h1>
//                                           {flightSeat &&
//                                               flightSeat.map((seats, index) => (
//                                                   <div key={index} className={styles.choose__seat__btn__box}>
//                                                       {seats.type === 'D' &&
//                                                           seats.seat.map((data, index) => (
//                                                               <div key={index}>
//                                                                   <button
//                                                                       disabled={!data.available}
//                                                                       onClick={() => handleSeat(data)}
//                                                                       style={{
//                                                                           background: !data.available
//                                                                               ? '#73CA5C'
//                                                                               : seat.find((d) => d.code === data.code)
//                                                                               ? '#7126B5'
//                                                                               : '#d0d0d0',
//                                                                       }}
//                                                                       className={styles.choose__seat__btn}>
//                                                                       {seat.find((d) => d.code === data.code)
//                                                                           ? `P${seat.indexOf(data) + 1}`
//                                                                           : data.code}
//                                                                   </button>
//                                                               </div>
//                                                           ))}
//                                                   </div>
//                                               ))}
//                                       </div>
//                                       {/* E */}
//                                       <div>
//                                           <h1 className={styles.choose__seat__title__code}>E</h1>
//                                           {flightSeat &&
//                                               flightSeat.map((seats, index) => (
//                                                   <div key={index} className={styles.choose__seat__btn__box}>
//                                                       {seats.type === 'E' &&
//                                                           seats.seat.map((data, index) => (
//                                                               <div key={index}>
//                                                                   <button
//                                                                       disabled={!data.available}
//                                                                       onClick={() => handleSeat(data)}
//                                                                       style={{
//                                                                           background: !data.available
//                                                                               ? '#73CA5C'
//                                                                               : seat.find((d) => d.code === data.code)
//                                                                               ? '#7126B5'
//                                                                               : '#d0d0d0',
//                                                                       }}
//                                                                       className={styles.choose__seat__btn}>
//                                                                       {seat.find((d) => d.code === data.code)
//                                                                           ? `P${seat.indexOf(data) + 1}`
//                                                                           : data.code}
//                                                                   </button>
//                                                               </div>
//                                                           ))}
//                                                   </div>
//                                               ))}
//                                       </div>
//                                       {/* F */}
//                                       <div>
//                                           <h1 className={styles.choose__seat__title__code}>F</h1>
//                                           {flightSeat &&
//                                               flightSeat.map((seats, index) => (
//                                                   <div key={index} className={styles.choose__seat__btn__box}>
//                                                       {seats.type === 'F' &&
//                                                           seats.seat.map((data, index) => (
//                                                               <div key={index}>
//                                                                   <button
//                                                                       disabled={!data.available}
//                                                                       onClick={() => handleSeat(data)}
//                                                                       style={{
//                                                                           background: !data.available
//                                                                               ? '#73CA5C'
//                                                                               : seat.find((d) => d.code === data.code)
//                                                                               ? '#7126B5'
//                                                                               : '#d0d0d0',
//                                                                       }}
//                                                                       className={styles.choose__seat__btn}>
//                                                                       {seat.find((d) => d.code === data.code)
//                                                                           ? `P${seat.indexOf(data) + 1}`
//                                                                           : data.code}
//                                                                   </button>
//                                                               </div>
//                                                           ))}
//                                                   </div>
//                                               ))}
//                                       </div>
//                                   </div>
//                               </div>
//                           </div>
//                       </div>
//                   </div>
//                   <div className='w-[518px]'>
//                       <Button className='w-full rounded-rad-3 bg-pur-4 py-4 text-head-1 font-medium text-white'>Simpan</Button>
//                   </div>
//               </div>

//               <div className='col-span-5'>
//                   <div className='flex flex-col gap-3'>
//                       <div className='flex items-center justify-between'>
//                           <h1 className='text-title-3  font-bold '>Detail Pesanan</h1>
//                           <p className='w-max rounded-rad-4 bg-alert-1 px-3 py-1 text-body-6 text-white'>Issued</p>
//                       </div>
//                       <h1 className=' text-title'>
//                           Booking Code : <span className='font-bold text-pur-5'>6723y2GHK</span>
//                       </h1>
//                       <div className='flex justify-between'>
//                           <div>
//                               <h2 className='text-title-2 font-bold'>19:10</h2>
//                               <p className='text-body-6 font-normal'>5 Maret 2023</p>
//                               <p className='text-body-6 font-normal'>Soekarno Hatta</p>
//                           </div>
//                           <div>
//                               <h3 className='font-bold text-pur-3'>Keberangkaran</h3>
//                           </div>
//                       </div>
//                       {/* divider */}
//                       <div className='mb-2 mt-4 flex justify-center'>
//                           <div className='w-1/2 border border-net-2'></div>
//                       </div>
//                       {/* divider */}

//                       <div className='flex items-center gap-4'>
//                           <div className='relative h-[24px] w-[24px]'>
//                               <Image src={'/images/flight_badge.svg'} fill alt='' />
//                           </div>
//                           <div className='flex flex-col gap-4'>
//                               <div>
//                                   <h1 className='text-body-6 font-bold'>Jet Air - Economy</h1>
//                                   <h2 className='text-body-5 font-bold'>JT - 203</h2>
//                               </div>
//                               <div>
//                                   <h3 className='text-body-5 font-bold'>Informasi :</h3>
//                                   <p className='text-body-5 font-normal'>Penumpang 1: Mr.Arief</p>
//                                   <p className='text-body-5 font-normal'>ID: 1234567</p>
//                                   <p className='text-body-5 font-normal'>Penumpang 2: Mr.Alexa</p>
//                                   <p className='text-body-5 font-normal'>ID: 1234567</p>
//                               </div>
//                           </div>
//                       </div>
//                       {/* divider */}
//                       <div className='mb-2 mt-4 flex justify-center'>
//                           <div className='w-1/2 border-[1px] border-t-net-2'></div>
//                       </div>
//                       {/* divider */}
//                       <div className='flex justify-between'>
//                           <div>
//                               <h2 className='text-title-2 font-bold'>21:10</h2>
//                               <p className='text-body-6 font-normal'>Melbourne International Airport</p>
//                               <p className='text-body-6 font-normal'>Soekarno Hatta</p>
//                           </div>
//                           <div>
//                               <h3 className='font-bold text-pur-3'>Kedatangan</h3>
//                           </div>
//                       </div>
//                       {/* divider */}
//                       <div className='mb-2 mt-4 flex justify-center'>
//                           <div className='w-full border-[1px] border-t-net-2'></div>
//                       </div>
//                       {/* divider */}
//                       <h1 className='text-body-6 font-bold'>Rincian Harga : </h1>
//                       <div className='flex justify-between'>
//                           <div className='text-body-6'>
//                               <p>2 Adults</p>
//                               <p>1 Baby</p>
//                               <p>TAX</p>
//                           </div>
//                           <div className='text-body-6'>
//                               <p>IDR 9.550.000</p>
//                               <p>IDR 0</p>
//                               <p>IDR 300.000</p>
//                           </div>
//                       </div>
//                       {/* divider */}
//                       <div className='mb-2 mt-4 flex justify-center'>
//                           <div className='w-full border-[1px] border-t-net-2'></div>
//                       </div>
//                       {/* divider */}
//                       <div className='flex justify-between text-title-3 font-bold'>
//                           <p>Total</p>
//                           <p className='text-pur-5'>IDR 9.850.000</p>
//                       </div>
//                       <Button className='w-full rounded-rad-3 bg-pur-4 py-[18px] text-head-1 font-medium text-white'>
//                           Simpan
//                       </Button>
//                   </div>
//               </div>
//           </div>
//       </div>
//   );
// }
