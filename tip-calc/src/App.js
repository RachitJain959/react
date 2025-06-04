import { useState } from "react";

export default function App() {
	return (
		<div>
			<Bill />
			<Service>How did you like the service?</Service>
			<Service>How did your friend like the service?</Service>
			<Amount />
		</div>
	);
}
function Bill() {
	const [bill, setBill] = useState();
	console.log(bill);
	return (
		<div>
			<span>Bill Amount: </span>
			<input
				type="text"
				value={bill}
				onChange={(e) => setBill(Number(e.target.value))}
			/>
		</div>
	);
}
function Service({ children }) {
	const [service, setService] = useState("good");
	console.log(service);
	return (
		<div>
			<span>{children}</span>
			<select
				value={service}
				onChange={(e) => setService(e.target.value)}
			>
				<option value="dissatisfied">Dissatisfied(0%)</option>
				<option value="okay">Okay(5%)</option>
				<option value="good">Good(10%)</option>
				<option value="amazing">AMazing!(20%)</option>
			</select>
		</div>
	);
}

function Amount() {
	return <h1>Amount</h1>;
}
