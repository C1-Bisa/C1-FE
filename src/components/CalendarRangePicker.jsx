'use client';

import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

export default function CalendarRangePicker({ open, handleOpen, initialRangeDate, handlePickedRangeDate }) {
    return (
        <>
            {open && (
                <DateRangePicker
                    className={'calendar__range'}
                    isOpen={open}
                    value={initialRangeDate}
                    onClick={(event) => {
                        event.persist();

                        let prevDate = Array.isArray(initialRangeDate) ? new Date(initialRangeDate[0]) : new Date(initialRangeDate);
                        let rangeClickDate = new Date(event.target.ariaLabel);

                        if (rangeClickDate.getDate() === prevDate.getDate()) {
                            handlePickedRangeDate(rangeClickDate);
                            return;
                        }

                        if (rangeClickDate > prevDate) {
                            handlePickedRangeDate(rangeClickDate);
                        }
                    }}
                    onChange={(date) => {
                        if (Array.isArray(date)) {
                            handlePickedRangeDate(date[1]);
                            return;
                        }

                        handlePickedRangeDate(date);
                        handleOpen();
                    }}
                    defaultValue={initialRangeDate}
                    minDate={Array.isArray(initialRangeDate) ? initialRangeDate[0] : initialRangeDate}
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
