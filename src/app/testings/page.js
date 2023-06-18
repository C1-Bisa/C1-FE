// 'use client';

// import { fetchFlight, getAllFlight, getFlightStatus } from '@/store/flight';
// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect } from 'react';

// import { convertToDate, convertToTime } from '@/utils/converDateTime';

// import { getLocationFromAirport, getLocationToAirport } from '@/store/airport';

// import { getDerpatureDateTime, getArrivalDateTime } from '@/store/schedule';

// export default function Testings() {
//     const dispatch = useDispatch();

//     const loading = useSelector(getFlightStatus);

//     const derpature = useSelector(getDerpatureDateTime);
//     const arrival = useSelector(getArrivalDateTime);
//     const locationFrom = useSelector(getLocationFromAirport);
//     const locationTo = useSelector(getLocationToAirport);
//     const fligths = useSelector(getAllFlight);

//     //  <h1>from: {locationFrom}</h1>
//     //             <h1>to: {locationTo}</h1>
//     //             <h1>departure_date : {convertToDate(derpature)}</h1>
//     //             <h1>departure_time : {convertToTime(derpature)}</h1>
//     //             <h1>arrival_date : {arrival && convertToDate(arrival)}</h1>

//     useEffect(() => {
//         const templateObj = {
//             from: locationFrom,
//             to: locationTo,
//             departure_date: convertToDate(derpature),
//             departure_time: convertToTime(derpature),
//             returnDate: arrival && convertToDate(arrival),
//         };
//         // const templateObj = {
//         //     from: 'Yogyakarta',
//         //     to: 'Bali',
//         //     departure_date: '2023-06-20',
//         //     departure_time: '07:00',
//         //     returnDate: '2023-06-26',
//         // };

//         console.log('DATA INPUT', templateObj);
//         dispatch(fetchFlight(templateObj));
//     }, []);

//     console.log(fligths);

//     return <div>page</div>;
// }
