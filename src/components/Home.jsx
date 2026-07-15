import '../styles/Home.css';
import Header from './Header.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "react-calendar/dist/Calendar.css";
import RoomSelector from './RoomSelector.jsx';
import MonthCalendar from './MonthCalendar.jsx';
import SlotList from './SlotList.jsx';
import { useAuth } from '../context/useAuth.js';

// Hauptseite nach Login: Raum wählen, Datum auswählen, Slot-Buchungen verwalten.
function Home() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    // Lokaler UI-Status für aktuell gewählten Raum und Tag.
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Meldet den Nutzer ab und leitet zur Login-Seite weiter.
    function handleLogout() {
        logout();
        navigate('/login');
    }

    return (

        <div className="content">
            {/* Kopfzeile mit Logout-Aktion. */}
            <Header onLogout={handleLogout}></Header>
            <h1>Willkommen, {user?.username ?? 'Gast'}!</h1>

            {/* Auswahl des aktuell zu planenden Raums. */}
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