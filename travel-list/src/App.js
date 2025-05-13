export default function App() {
	return (
		<div className="app">
			<Logo />
			<Form />
			<PackingList />
			<Stats />
		</div>
	);
}

function Logo() {
	return <h1>Far Away</h1>;
}

function Form() {
	return (
		<div className="add-form">
			<h3>What do you need for the trip?</h3>
		</div>
	);
}

function PackingList() {
	return <div className="list">LIST</div>;
}

function Stats() {
	return (
		<footer className="footer">
			<em>
				You have X items on your list, & you have already packed x%
				items.
			</em>
		</footer>
	);
}
