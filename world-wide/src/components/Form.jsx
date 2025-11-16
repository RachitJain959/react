// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { DatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

function Form() {
	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState("");
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState("");
	const [emoji, setEmoji] = useState();

	const { createCity } = useCities();

	const [lat, lng] = useUrlPosition();
	const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
	const [geoCodingError, setGeocodingError] = useState("");

	function handleSubmit(e) {
		e.preventDefault();

		if (!date || !cityName) return;

		const newCity = {
			cityName,
			country,
			emoji,
			date,
			notes,
			position: { lat, lng },
		};

		createCity(newCity);
	}

	useEffect(
		function () {
			async function fetchCityData() {
				try {
					setIsLoadingGeocoding(true);
					const res = await fetch(
						`${BASE_URL}?latitude=${lat}&longitude=${lng}`,
					);
					const data = await res.json();

					if (!data.countryCode)
						throw new Error(
							"That is does not seem to be a city. CLick somewhere else. 😉",
						);

					setCityName(data.city || data.locality || "");
					setCountry(data.countryName);
					setEmoji(convertToEmoji(data.countryCode));
				} catch (err) {
					setGeocodingError(err.message);
				} finally {
					setIsLoadingGeocoding(false);
				}
			}
			fetchCityData();
			return function () {
				setGeocodingError("");
			};
		},
		[lat, lng],
	);

	if (isLoadingGeocoding) return <Spinner />;

	if (!lat && !lng)
		return <Message message="Start by clicking somewhere on the map." />;

	if (geoCodingError) return <Message message={geoCodingError} />;

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				<input
					id="cityName"
					onChange={(e) => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={styles.flag}>{emoji}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				{/* <input
					id="date"
					onChange={(e) => setDate(e.target.value)}
					value={date}
				/> */}
				<DatePicker
					id="date"
					onChange={(date) => setDate(date)}
					selected={date}
					dateFormat="dd/MM/yyy"
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">
					Notes about your trip to {cityName}
				</label>
				<textarea
					id="notes"
					onChange={(e) => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button type="primary">Add</Button>
				<ButtonBack />
			</div>
		</form>
	);
}

export default Form;
