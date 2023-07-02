'use client';

export default function Seat({
    flightSeat,
    handleSeat,
    seat,
    flight_class = 'Economy',
    type,
    flight_airline = 'Qatar Airline',
    flight_from = 'Abu Dhabi',
    flight_to = 'Mecca',
}) {
    return (
        <div className={`w-full rounded-rad-1 border px-4 py-2 font-poppins`}>
            {/* seat head */}
            <div className='my-3 flex items-center justify-between'>
                <div className='flex flex-col gap-1'>
                    <h1 className='text-head-1 font-bold'>Pilih Kursi {type}</h1>
                    <div className='flex items-center gap-1'>
                        <h1 className='text-body-6 font-medium'>{flight_airline}</h1>
                        <h1 className='text-body-4 '>
                            ( {flight_from} {'-->'} {flight_to} )
                        </h1>
                    </div>
                </div>

                <div className='flex gap-3'>
                    <div className='flex flex-col items-center gap-1'>
                        <div className='flex h-[36px] w-[36px] items-center justify-center rounded-[6px]  bg-pur-3 text-white'>
                            <p>A1</p>
                        </div>
                        <p className='text-body-6'>Terpilih </p>
                    </div>
                    <div className='flex flex-col items-center gap-1'>
                        <div className='flex h-[36px] w-[36px] items-center justify-center rounded-[6px]  bg-pur-4 text-white'>
                            <p>A1</p>
                        </div>
                        <p className='text-body-6'>Tersedia</p>
                    </div>
                    <div className='flex flex-col items-center gap-1'>
                        <div className='flex h-[36px] w-[36px] items-center justify-center rounded-[6px]  bg-[#d0d0d0] text-white'>
                            <p>A1</p>
                        </div>
                        <p className='text-body-6'>Tdk Tersedia</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-center rounded-rad-1 bg-pur-4 py-3 text-white'>
                <h1>{flight_class} - 37 Seats Available</h1>
            </div>
            {/* seat head */}

            {/* seat body */}
            <div className={'flex justify-center gap-3'}>
                {/* Grouping for A  B  C */}
                <div className='flex gap-3'>
                    {/* A */}
                    <div>
                        <h1 className={' flex items-center px-[13px] py-2 text-body-6 font-medium text-[#8a8a8a]'}>A</h1>
                        {flightSeat &&
                            flightSeat.map((seats, index) => (
                                <div key={index} className={'flex flex-col gap-3'}>
                                    {seats.type === 'A' &&
                                        seats.seat.map((data, index) => (
                                            <div key={index}>
                                                <button
                                                    disabled={!data.available}
                                                    onClick={() => handleSeat(data)}
                                                    style={{
                                                        background: !data.available
                                                            ? '#d0d0d0'
                                                            : seat.find((d) => d.code === data.code)
                                                            ? '#00AD10'
                                                            : '#003D20',
                                                    }}
                                                    className={
                                                        'flex h-[36px] w-[36px] items-center justify-center rounded-[6px] bg-[#d0d0d0] text-white'
                                                    }>
                                                    {seat.find((d) => d.code === data.code)
                                                        ? `P${seat.indexOf(data) + 1}`
                                                        : data.code}
                                                </button>
                                            </div>
                                        ))}
                                </div>
                            ))}
                    </div>
                    {/* A */}
                    {/* B */}
                    <div>
                        <h1 className={' flex items-center px-[13px] py-2 text-body-6 font-medium text-[#8a8a8a]'}>B</h1>
                        {flightSeat &&
                            flightSeat.map((seats, index) => (
                                <div key={index} className={'flex flex-col gap-3'}>
                                    {seats.type === 'B' &&
                                        seats.seat.map((data, index) => (
                                            <div key={index}>
                                                <button
                                                    disabled={!data.available}
                                                    onClick={() => handleSeat(data)}
                                                    style={{
                                                        background: !data.available
                                                            ? '#d0d0d0'
                                                            : seat.find((d) => d.code === data.code)
                                                            ? '#00AD10'
                                                            : '#003D20',
                                                    }}
                                                    className={
                                                        'flex h-[36px] w-[36px] items-center justify-center rounded-[6px] bg-[#d0d0d0] text-white'
                                                    }>
                                                    {seat.find((d) => d.code === data.code)
                                                        ? `P${seat.indexOf(data) + 1}`
                                                        : data.code}
                                                </button>
                                            </div>
                                        ))}
                                </div>
                            ))}
                    </div>
                    {/* B */}
                    {/* C */}
                    <div>
                        <h1 className={' flex items-center px-[13px] py-2 text-body-6 font-medium text-[#8a8a8a]'}>C</h1>
                        {flightSeat &&
                            flightSeat.map((seats, index) => (
                                <div key={index} className={'flex flex-col gap-3'}>
                                    {seats.type === 'C' &&
                                        seats.seat.map((data, index) => (
                                            <div key={index}>
                                                <button
                                                    disabled={!data.available}
                                                    onClick={() => handleSeat(data)}
                                                    style={{
                                                        background: !data.available
                                                            ? '#d0d0d0'
                                                            : seat.find((d) => d.code === data.code)
                                                            ? '#00AD10'
                                                            : '#003D20',
                                                    }}
                                                    className={
                                                        'flex h-[36px] w-[36px] items-center justify-center rounded-[6px] bg-[#d0d0d0] text-white'
                                                    }>
                                                    {seat.find((d) => d.code === data.code)
                                                        ? `P${seat.indexOf(data) + 1}`
                                                        : data.code}
                                                </button>
                                            </div>
                                        ))}
                                </div>
                            ))}
                    </div>
                    {/* C */}
                </div>
                {/* Grouping for A  B  C */}
                {/* Divider */}
                <div className='flex flex-col items-center justify-center'>
                    <h1 className={' invisible flex items-center px-[13px] py-2 text-body-6 font-medium text-[#8a8a8a] '}>.</h1>
                    {flightSeat && (
                        <div className={'flex flex-col gap-3'}>
                            {Array.from({ length: 12 }, (_, i) => {
                                return (
                                    <div key={i}>
                                        <div
                                            className={
                                                'flex h-[36px] w-[20px] items-center justify-center rounded-[6px] bg-[#d0d0d0] text-white'
                                            }>
                                            <p>{i + 1}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                {/* Divider */}

                {/* Grouping for D  E  F */}
                <div className='flex gap-3'>
                    {/* D */}
                    <div>
                        <h1 className={' flex items-center px-[13px] py-2 text-body-6 font-medium text-[#8a8a8a]'}>D</h1>
                        {flightSeat &&
                            flightSeat.map((seats, index) => (
                                <div key={index} className={'flex flex-col gap-3'}>
                                    {seats.type === 'D' &&
                                        seats.seat.map((data, index) => (
                                            <div key={index}>
                                                <button
                                                    disabled={!data.available}
                                                    onClick={() => handleSeat(data)}
                                                    style={{
                                                        background: !data.available
                                                            ? '#d0d0d0'
                                                            : seat.find((d) => d.code === data.code)
                                                            ? '#00AD10'
                                                            : '#003D20',
                                                    }}
                                                    className={
                                                        'flex h-[36px] w-[36px] items-center justify-center rounded-[6px] bg-[#d0d0d0] text-white'
                                                    }>
                                                    {seat.find((d) => d.code === data.code)
                                                        ? `P${seat.indexOf(data) + 1}`
                                                        : data.code}
                                                </button>
                                            </div>
                                        ))}
                                </div>
                            ))}
                    </div>
                    {/* E */}
                    <div>
                        <h1 className={' flex items-center px-[13px] py-2 text-body-6 font-medium text-[#8a8a8a]'}>E</h1>
                        {flightSeat &&
                            flightSeat.map((seats, index) => (
                                <div key={index} className={'flex flex-col gap-3'}>
                                    {seats.type === 'E' &&
                                        seats.seat.map((data, index) => (
                                            <div key={index}>
                                                <button
                                                    disabled={!data.available}
                                                    onClick={() => handleSeat(data)}
                                                    style={{
                                                        background: !data.available
                                                            ? '#d0d0d0'
                                                            : seat.find((d) => d.code === data.code)
                                                            ? '#00AD10'
                                                            : '#003D20',
                                                    }}
                                                    className={
                                                        'flex h-[36px] w-[36px] items-center justify-center rounded-[6px] bg-[#d0d0d0] text-white'
                                                    }>
                                                    {seat.find((d) => d.code === data.code)
                                                        ? `P${seat.indexOf(data) + 1}`
                                                        : data.code}
                                                </button>
                                            </div>
                                        ))}
                                </div>
                            ))}
                    </div>
                    {/* E */}

                    {/* F */}
                    <div>
                        <h1 className={' flex items-center px-[13px] py-2 text-body-6 font-medium text-[#8a8a8a]'}>F</h1>
                        {flightSeat &&
                            flightSeat.map((seats, index) => (
                                <div key={index} className={'flex flex-col gap-3'}>
                                    {seats.type === 'F' &&
                                        seats.seat.map((data, index) => (
                                            <div key={index}>
                                                <button
                                                    disabled={!data.available}
                                                    onClick={() => handleSeat(data)}
                                                    style={{
                                                        background: !data.available
                                                            ? '#d0d0d0'
                                                            : seat.find((d) => d.code === data.code)
                                                            ? '#00AD10'
                                                            : '#003D20',
                                                    }}
                                                    className={
                                                        'flex h-[36px] w-[36px] items-center justify-center rounded-[6px] bg-[#d0d0d0] text-white'
                                                    }>
                                                    {seat.find((d) => d.code === data.code)
                                                        ? `P${seat.indexOf(data) + 1}`
                                                        : data.code}
                                                </button>
                                            </div>
                                        ))}
                                </div>
                            ))}
                    </div>
                    {/* F */}
                </div>
                {/* Grouping for D  E  F */}
            </div>
            {/* seat body */}
        </div>
    );
}
