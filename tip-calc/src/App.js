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
