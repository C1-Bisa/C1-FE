// 'use client';

// import { useEffect } from 'react';
// import axios from 'axios';

// export default function TestApi() {
//     const URL = 'https://airplaneapikel1-production.up.railway.app/api/v1/flight/searchflight';

//     useEffect(() => {
//         const fetchFlight = async ({ from, to, departure_date, departure_time, returnDate }) => {
//             try {
//                 const objectTemplate = {
//                     from,
//                     to,
//                     departure_date,
//                     departure_time,
//                     returnDate,
//                 };
//                 const response = await axios.post(URL, objectTemplate);
//                 // return response.data.data.flight;
//                 console.log(response.data.data.flight);
//             } catch (error) {
//                 return error.message;
//             }
//         };
//         fetchFlight({
//             from: 'Bali',
//             to: 'Jakarta',
//             departure_date: '2023-09-14',
//             departure_time: '00:00',
//             returnDate: '',
//         });
//     }, []);

//     return <div>page</div>;
// }
