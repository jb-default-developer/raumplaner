// Bspw. Liste der buchbaren Räume. Mock Daten, da keine Backend-Anbindung vorhanden ist.
const rooms = [
    "Meetingraum",
    "MeetingBox 1",
    "MeetingBox 2",
];

// Auswahlkomponente für den aktuell aktiven Raum.
export default function RoomSelector({ selectedRoom, setSelectedRoom }) {
    // Rendert pro Raum einen Button und markiert die aktive Auswahl.
    return (
        <div className="rooms">
        {rooms.map((room) => (
            <button
                key={room}
                className={selectedRoom === room ? "room active" : "room"}
                onClick={() => setSelectedRoom(room)}
            >
                {room}
            </button>
        ))}
        </div>
    );
}
