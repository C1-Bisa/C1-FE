'use client';

import Calendar from 'react-calendar';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

export default function CalendarPicker({ open, handleOpen, initialDate, handlePickedDate }) {
    return (
        <>
            {open && (
                <Calendar
                    className={'calendar'}
                    value={initialDate}
                    onChange={(date) => {
                        handlePickedDate(date);
                        handleOpen();
                    }}
                    defaultValue={initialDate}
                    minDate={new Date()}
                    prevLabel={<FiChevronLeft style={{ color: '#7126b5' }} />}
                    nextLabel={<FiChevronRight style={{ color: '#7126b5' }} />}
                    showDoubleView
                    prev2Label={null}
                    next2Label={null}
                    clearIcon={null}
                    calendarIcon={null}
                    showNeighboringMonth={false}
                    showFixedNumberOfWeeks={false}
                />
            )}
        </>
    );
}