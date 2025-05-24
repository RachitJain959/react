import { useState } from "react";

const initialItems = [
	{ id: 1, description: "Passports", quantity: 2, packed: false },
	{ id: 2, description: "Socks", quantity: 12, packed: false },
];

export default function App() {
	const [items, setItems] = useState([]);

	function handleAddItems(item) {
		setItems((items) => [...items, item]);
	}

	function handleDeleteItems(id) {
		setItems((items) => items.filter((item) => item.id !== id));
	}

	function handleToggleItem(id) {
		setItems((items) =>
			items.map((item) =>
				item.id === id ? { ...item, packed: !item.packed } : item,
			),
		);
	}

	function handleDelete() {
		const confirm = window.confirm(
			"Are you sure you want to clear all items?",
		);

		if (confirm) setItems([]);
	}

	return (
		<div className="app">
			<Logo />
			<Form onAddItems={handleAddItems} />
			<PackingList
				items={items}
				onDeleteItems={handleDeleteItems}
				onToggleItem={handleToggleItem}
				onDelete={handleDelete}
			/>
			<Stats items={items} />
		</div>
	);
}

function Logo() {
	return <h1>Far Away</h1>;
}

function Form({ onAddItems }) {
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState(1);

	function handleSubmit(e) {
		e.preventDefault();

		if (!description) return;

		const newItem = {
			description,
			quantity,
			packed: false,
			id: Date.now(),
		};

		onAddItems(newItem);

		setDescription("");
		setQuantity(1);
	}

	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<h3>What do you need for the trip?</h3>
			<select
				value={quantity}
				onChange={(e) => setQuantity(Number(e.target.value))}
			>
				{Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
					<option key={num}>{num}</option>
				))}
			</select>
			<input
				type="text"
				placeholder="Item..."
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button>Add</button>
		</form>
	);
}

function PackingList({ items, onDeleteItems, onToggleItem, onDelete }) {
	const [sortBy, setSortBy] = useState("input");

	let sortedItems;

	if (sortBy === "input") sortedItems = items;

	if (sortBy === "description")
		sortedItems = items
			.slice()
			.sort((a, b) => a.description.localeCompare(b.description));

	if (sortBy === "packed")
		sortedItems = items
			.slice()
			.sort((a, b) => Number(a.packed) - Number(b.packed));

	return (
		<div className="list">
			<ul>
				{sortedItems.map((item) => (
					<Item
						item={item}
						onDeleteItems={onDeleteItems}
						onToggleItem={onToggleItem}
						key={item.id}
					/>
				))}
			</ul>

			<div className="actions">
				<select
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}
				>
					<option value="input">Sort by input</option>
					<option value="description">Sort by description</option>
					<option value="packed">Sort by packed</option>
				</select>
				<button onClick={onDelete}>Clear List</button>
			</div>
		</div>
	);
}

function Item({ item, onDeleteItems, onToggleItem }) {
	return (
		<li>
			<input
				type="checkbox"
				value={item.packed}
				onChange={() => onToggleItem(item.id)}
			/>
			<span style={item.packed ? { textDecoration: "line-through" } : {}}>
				{item.quantity} {item.description}
			</span>
			<button onClick={() => onDeleteItems(item.id)}>❌</button>
		</li>
	);
}

function Stats({ items }) {
	if (!items.length)
		return (
			<footer className="stats">
				Start adding items to your packing list...
			</footer>
		);

	const numItems = items.length;
	const numPacked = items.filter((item) => item.packed).length;
	const percent = Math.round((numPacked / numItems) * 100);
	return (
		<footer className="stats">
			<em>
				{percent === 100
					? "You got everything! Ready to go."
					: `You have ${numItems} items on your list, & you have already
				packed ${numPacked} (${percent} %) items.`}
			</em>
		</footer>
	);
}
