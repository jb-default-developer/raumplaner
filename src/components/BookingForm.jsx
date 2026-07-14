import { useState } from "react";

export default function BookingForm({
	slotLabel,
	onCancel,
	onSubmit,
}) {
	const [meetingTitle, setMeetingTitle] = useState("");
	const [description, setDescription] = useState("");

	function handleSubmit(event) {
		event.preventDefault();

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
				<h3>Buchung bestaetigen</h3>
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
