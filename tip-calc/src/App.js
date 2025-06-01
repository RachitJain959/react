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
