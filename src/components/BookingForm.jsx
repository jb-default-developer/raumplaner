import { useState } from "react";

// Zeigt ein Modal-Formular zum Erfassen von Titel und Beschreibung einer Buchung.
export default function BookingForm({
	slotLabel,  // Anzeigetext des gewählten Zeitfensters
	onCancel,   // Callback zum Schließen ohne Speichern
	onSubmit,   // Callback mit den eingegebenen Details
}) {
	// Eingabefelder des Formulars als lokaler Zustand.
	const [meetingTitle, setMeetingTitle] = useState("");
	const [description, setDescription] = useState("");

	// Validiert das Formular und gibt die Daten nach oben weiter.
	function handleSubmit(event) {
		event.preventDefault();

		// Leere Titel werden abgelehnt.
		const cleanTitle = meetingTitle.trim();
		if (!cleanTitle) {
			return;
		}

		onSubmit({
			title: cleanTitle,
			description: description.trim(),
		});
	}

	return (
		<div className="booking-modal-backdrop" role="presentation" onClick={onCancel}>
			<div
				className="booking-modal"
				role="dialog"
				aria-modal="true"
				aria-label="Buchungsdetails eingeben"
				onClick={(event) => event.stopPropagation()}
			>
				<h3>Buchung bestätigen</h3>
				<p className="booking-modal-slot">{slotLabel}</p>

				<form onSubmit={handleSubmit} className="booking-form">
					<label>
						Meetingtitel *
						<input
							type="text"
							value={meetingTitle}
							onChange={(event) => setMeetingTitle(event.target.value)}
							placeholder="z. B. Sprint Planung"
							required
							autoFocus
						/>
					</label>

					<label>
						Beschreibung (optional)
						<textarea
							value={description}
							onChange={(event) => setDescription(event.target.value)}
							rows={4}
							placeholder="Kurze Notiz zum Termin"
						/>
					</label>

					<div className="booking-form-actions">
						<button type="button" className="booking-cancel" onClick={onCancel}>
							Abbrechen
						</button>
						<button type="submit" className="booking-confirm">
							Buchen
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
