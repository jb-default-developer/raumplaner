import '../Home.css';
import Header from './Header.jsx';
import { useState } from 'react';
import "react-calendar/dist/Calendar.css";
import RoomSelector from './RoomSelector.jsx';
import MonthCalendar from './MonthCalendar.jsx';
import SlotList from './SlotList.jsx';

function Home() {
    // Lokaler UI-Status für aktuell gewählten Raum und Tag.
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Eingeloggter Nutzer aus localStorage (gesetzt beim Login).
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    function logout() {
        localStorage.removeItem('loggedInUser');
        window.location.reload();
    }

    return (

        <div className="content">
            <Header onLogout={logout}></Header>
            <h1>Willkommen, {user.username}!</h1>
            <RoomSelector selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
        {/* Kalender und Slots werden erst nach Raumwahl angezeigt. */}
        {selectedRoom && (
            <>
                <MonthCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                <SlotList room={selectedRoom} date={selectedDate} />
            </>
        )}
        
        </div>

    );
}

export default Home;