import { useEffect, useState } from "react";
import BookingForm from "./BookingForm.jsx";

// Einheitlicher localStorage-Key für alle Buchungen.
const BOOKINGS_STORAGE_KEY = "raumplaner_bookings";

// neue Buchungen mit start/endTime und alte Buchungen, die nur den Anzeigetext gespeichert haben.
function getBookingRange(booking) {
    if (booking.startTime && booking.endTime) {
        return { startTime: booking.startTime, endTime: booking.endTime };
    }

    const match = booking.time?.match(/(\d{2}:\d{2}).*(\d{2}:\d{2})/);
    if (!match) {
        return null;
    }

    return { startTime: match[1], endTime: match[2] };
}

// Mit Minuten rechnen.
function timeToMinutes(value) {
    const [hours, minutes] = value.split(":").map(Number);
    return hours * 60 + minutes;
}

function formatSlotLabel(startTime, endTime) {
    return `Von ${startTime} bis ${endTime}`;
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
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("09:30");
    const [pendingBooking, setPendingBooking] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);

    // Jede Änderung an den Buchungen wird direkt in LocalStorage gespeichert.
    useEffect(() => {
        localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
    }, [bookings]);

    const dateKey = date.toLocaleDateString();
    // Zeigt nur Buchungen fuer den gewaehlten Raum und Tag und sortiert sie nach Startzeit.
    const roomBookings = bookings
        .filter((booking) => booking.date === dateKey && booking.room === room)
        .sort((left, right) => {
            const leftRange = getBookingRange(left);
            const rightRange = getBookingRange(right);

            if (!leftRange || !rightRange) {
                return left.time.localeCompare(right.time);
            }

            return timeToMinutes(leftRange.startTime) - timeToMinutes(rightRange.startTime);
        });

    function openBookingForm() {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const startMinutes = timeToMinutes(startTime);
        const endMinutes = timeToMinutes(endTime);

        if (startMinutes >= endMinutes) {
            alert("Die Endzeit muss nach der Startzeit kommen.");
            return;
        }

        // Zwei Zeitraeume ueberlappen genau dann, wenn der neue Slot vor dem Ende beginnt
        // und nach dem Anfang eines bestehenden Slots endet.
        const hasOverlap = roomBookings.some((booking) => {
            const range = getBookingRange(booking);
            if (!range) {
                return false;
            }

            const bookingStart = timeToMinutes(range.startTime);
            const bookingEnd = timeToMinutes(range.endTime);
            return startMinutes < bookingEnd && endMinutes > bookingStart;
        });

        if (hasOverlap) {
            alert("Dieser Zeitraum überschneidet sich mit einer bestehenden Buchung.");
            return;
        }

        const slotLabel = formatSlotLabel(startTime, endTime);
        setPendingBooking({
            slotLabel,
            dateKey,
            room,
            user: loggedInUser.username,
            startTime,
            endTime,
        });
    }

    function submitBookingDetails(details) {
        if (!pendingBooking) {
            return;
        }

        setBookings((currentBookings) => [
            ...currentBookings,
            {
                time: pendingBooking.slotLabel,
                startTime: pendingBooking.startTime,
                endTime: pendingBooking.endTime,
                user: pendingBooking.user,
                date: pendingBooking.dateKey,
                room: pendingBooking.room,
                title: details.title,
                description: details.description,
            },
        ]);
        setPendingBooking(null);
        setEndTime(startTime);
    }

    function closeBookingForm() {
        setPendingBooking(null);
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

        // Entfernt genau die Buchung, die zu Raum, Tag, User und Zeitfenster passt.
        setBookings(
            bookings.filter(
                (b) => !(
                    b.time === booking.time &&
                    b.date === booking.date &&
                    b.room === booking.room &&
                    b.user === booking.user &&
                    (b.title || "") === (booking.title || "") &&
                    (b.description || "") === (booking.description || "")
                )
            )
        );
        setSelectedBooking(null);
    }

    function openBookingDetails(booking) {
        setSelectedBooking(booking);
    }

    return (
        <div className="slots">
            <h2>{room} - {date.toLocaleDateString()}</h2>
            <div className="slot-form">
                <label>
                    Von
                    <input
                        type="time"
                        step="60"
                        value={startTime}
                        onChange={(event) => setStartTime(event.target.value)}
                    />
                </label>
                <label>
                    Bis
                    <input
                        type="time"
                        step="60"
                        value={endTime}
                        onChange={(event) => setEndTime(event.target.value)}
                    />
                </label>
                <button type="button" className="slot-create" onClick={openBookingForm}>
                    Zeitslot buchen
                </button>
            </div>

            {roomBookings.length === 0 ? (
                <div className="slot free">Noch keine Buchungen für diesen Tag.</div>
            ) : (
                roomBookings.map((booking) => (
                    <div
                        key={`${booking.room}-${booking.date}-${booking.user}-${booking.time}-${booking.title || "untitled"}`}
                        onClick={() => openBookingDetails(booking)}
                        className="slot booked"
                    >
                        {booking.time} - {booking.title || "Ohne Titel"} - Belegt von {booking.user}
                    </div>
                ))
            )}

            {pendingBooking && (
                <BookingForm
                    slotLabel={pendingBooking.slotLabel}
                    onCancel={closeBookingForm}
                    onSubmit={submitBookingDetails}
                />
            )}

            {selectedBooking && (
                <div className="booking-modal-backdrop" role="presentation" onClick={() => setSelectedBooking(null)}>
                    <div
                        className="booking-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Buchungsdetails"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <h3>{selectedBooking.title || "Ohne Titel"}</h3>
                        <p className="booking-modal-slot">{selectedBooking.time}</p>
                        <p>Raum: {selectedBooking.room}</p>
                        <p>Datum: {selectedBooking.date}</p>
                        <p>Gebucht von: {selectedBooking.user}</p>
                        {selectedBooking.description ? (
                            <p>Beschreibung: {selectedBooking.description}</p>
                        ) : (
                            <p>Keine Beschreibung hinterlegt.</p>
                        )}

                        <div className="booking-form-actions">
                            <button
                                type="button"
                                className="booking-cancel"
                                onClick={() => setSelectedBooking(null)}
                            >
                                Schliessen
                            </button>
                            <button
                                type="button"
                                className="booking-remove"
                                onClick={() => unbookSlot(selectedBooking)}
                            >
                                Buchung entfernen
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
