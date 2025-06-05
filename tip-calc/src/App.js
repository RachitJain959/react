import { useState } from "react";

export default function App() {
	const [bill, setBill] = useState("");
	const [service1, setService1] = useState(0);
	const [service2, setService2] = useState(0);

	const avgTip = (service1 + service2) / 2;

	function handleReset() {
		setBill("");
		setService1(0);
		setService2(0);
	}

	return (
		<div>
			<Bill bill={bill} onSetBill={setBill} />
			<Service service={service1} onService={setService1}>
				How did you like the service?
			</Service>
			<Service service={service2} onService={setService2}>
				How did your friend like the service?
			</Service>
			{bill > 0 && (
				<>
					<Amount bill={bill} avgTip={avgTip} />
					<Reset onReset={handleReset} />
				</>
			)}
		</div>
	);
}

function Bill({ bill, onSetBill }) {
	return (
		<div>
			<span>Bill Amount: </span>
			<input
				type="text"
				value={bill}
				onChange={(e) => onSetBill(Number(e.target.value))}
			/>
		</div>
	);
}

function Service({ children, service, onService }) {
	return (
		<div>
			<label>{children}</label>
			<select
				value={service}
				onChange={(e) => onService(Number(e.target.value))}
			>
				<option value="0">Bad(0%)</option>
				<option value="5">Okay(5%)</option>
				<option value="10">Good(10%)</option>
				<option value="20">AMazing!(20%)</option>
			</select>
		</div>
	);
}

function Amount({ bill, avgTip }) {
	const tip = (avgTip * bill) / 100;
	const amount = bill + tip;
	return (
		<h1>
			${bill}+{tip} tip=${amount}
		</h1>
	);
}

function Reset({ onReset }) {
	return <button onClick={onReset}>Reset</button>;
}
