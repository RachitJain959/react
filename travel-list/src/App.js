import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";

// const initialItems = [
// 	{ id: 1, description: "Passports", quantity: 2, packed: false },
// 	{ id: 2, description: "Socks", quantity: 12, packed: false },
// ];

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
