import { useEffect, useState } from "react";

// Einheitlicher localStorage-Key für alle Buchungen.
const BOOKINGS_STORAGE_KEY = "raumplaner_bookings";
const slots = [];

// Erzeugt die sichtbaren Zeitfenster (09:00 bis 17:30).
for (let i = 9; i <= 17; i++) {
    slots.push(`Von ${i.toString().padStart(2, "0")}:00 bis ${i.toString().padStart(2, "0")}:30 `);
}

export default function SlotList({ room = "", date = new Date() }) {
    // Beim ersten Rendern gespeicherte Buchungen laden.
    const [bookings, setBookings] = useState(() => {
        try {
            const raw = localStorage.getItem(BOOKINGS_STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    // Jede Änderung an den Buchungen wird direkt in LocalStorage gespeichert.
    useEffect(() => {
        localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
    }, [bookings]);

    const dateKey = date.toLocaleDateString();

    function bookSlot(slot) {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const confirmed = confirm(`Slot ${slot} als ${loggedInUser.username} buchen?`);
        if (!confirmed) return;
        setBookings([...bookings, { time: slot, user: loggedInUser.username, date: dateKey, room }]);
    }

    function unbookSlot(booking) {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        // Nur der User der die Buchung erstellt hat, darf entbuchen.
        if (!loggedInUser || booking.user !== loggedInUser.username) {
            alert("Du kannst nur deine eigenen Buchungen entbuchen.");
            return;
        }

        const confirmed = confirm(`Deine Buchung für ${booking.time} wirklich entfernen?`);
        if (!confirmed) return;

        setBookings(bookings.filter((b) => !(b.time === booking.time && b.date === booking.date && b.room === booking.room && b.user === booking.user)));
    }

    return (
        <div className="slots">
        
            <h2>{room} - {date.toLocaleDateString()}</h2>

            {slots.map((slot) => {
                // Sucht Buchung nur für den konkreten Slot am gewählten Tag und Raum.
                const booking = bookings.find((b) => b.time === slot && b.date === dateKey && b.room === room);

                return (
                    <div
                        key={slot}
                        onClick={() => {
                            if (!booking) {
                                bookSlot(slot);
                            } else {
                                unbookSlot(booking);
                            }
                        }}
                        className={booking ? "slot booked" : "slot free"}
                    >
                        {slot}
                        {booking ? `- Belegt von ${booking.user}` : "- Frei(Klicken zum Buchen)"}
                    </div>
                );
            })}
        </div>
    );
}
