import Calendar from 'react-calendar';

export default function MonthCalendar({ selectedDate, setSelectedDate }) {
    // Übergibt Datum und Änderungs-Callback an react-Kalender.
    return (
        <div className="calendar">
            <Calendar
                value={selectedDate}
                onChange={setSelectedDate}
            />
        </div>
    );
}