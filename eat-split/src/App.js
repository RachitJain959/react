import { useState } from "react";

let initialFriends = [
	{
		id: 118836,
		name: "Clark",
		image: "https://i.pravatar.cc/48?u=118836",
		balance: -7,
	},
	{
		id: 933372,
		name: "Sarah",
		image: "https://i.pravatar.cc/48?u=933372",
		balance: 20,
	},
	{
		id: 499476,
		name: "Anthony",
		image: "https://i.pravatar.cc/48?u=499476",
		balance: 0,
	},
];

export default function App() {
	const [showAddFriend, setShowAddFriend] = useState(false);
	const [friends, setFriends] = useState(initialFriends);
	const [selectedFriend, setSelectedFriend] = useState(null);

	function handleShowFriend() {
		setShowAddFriend((show) => !show);
	}

	function handleAddFriend(friend) {
		setFriends((friends) => [...friends, friend]);
		setShowAddFriend(false);
	}

	function handleSelection(curFriend) {
		setSelectedFriend((friend) =>
			curFriend.id === friend?.id ? null : curFriend,
		);
		setShowAddFriend(false);
	}

	function handleSplitBill(value) {
		setFriends((friends) =>
			friends.map((friend) =>
				friend.id === selectedFriend.id
					? { ...friend, balance: friend.balance + value }
					: friend,
			),
		);
		setSelectedFriend(null);
	}

	return (
		<div className="app">
			<div className="sidebar">
				<FriendsList
					friends={friends}
					onSelection={handleSelection}
					selectedFriend={selectedFriend}
				/>

				{showAddFriend && (
					<FormAddFriend onAddFriend={handleAddFriend} />
				)}

				<Button onClick={handleShowFriend}>
					{showAddFriend ? "Close" : "Add Friend"}
				</Button>
			</div>

			{selectedFriend && (
				<FormSplitBill
					selectedFriend={selectedFriend}
					onSplitBill={handleSplitBill}
				/>
			)}
		</div>
	);
}

function FriendsList({ friends, onSelection, selectedFriend }) {
	return (
		<ul>
			{friends.map((friend) => (
				<Friend
					friend={friend}
					key={friend.id}
					onSelection={onSelection}
					selectedFriend={selectedFriend}
				/>
			))}
		</ul>
	);
}

function Friend({ friend, onSelection, selectedFriend }) {
	const isSelected = selectedFriend?.id === friend.id;

	return (
		<li>
			<img src={friend.image} alt={friend.name} />
			<h3>{friend.name}</h3>
			{friend.balance < 0 && (
				<p className="red">
					You owe {friend.name} {Math.abs(friend.balance)}
				</p>
			)}
			{friend.balance === 0 && <p>You are even</p>}
			{friend.balance > 0 && (
				<p className="green">
					{friend.name} owes you {friend.balance}
				</p>
			)}
			<Button onClick={() => onSelection(friend)}>
				{isSelected ? "Close" : "Select"}
			</Button>
		</li>
	);
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
	const [bill, setBill] = useState("");
	const [userExpense, setUserExpense] = useState("");
	const [billPayee, setBillPayee] = useState("user");

	const friendExpense = bill ? bill - userExpense : "";

	function handleSubmit(e) {
		e.preventDefault();

		if (!bill || !userExpense) return;

		onSplitBill(billPayee === "user" ? friendExpense : -userExpense);
	}

	return (
		<form className="form-split-bill" onSubmit={handleSubmit}>
			<h2>Split a bill with {selectedFriend.name}</h2>

			<label>Bill Value: </label>
			<input
				type="text"
				value={bill}
				onChange={(e) => setBill(Number(e.target.value))}
			/>

			<label>Your Expence: </label>
			<input
				type="text"
				value={userExpense}
				onChange={(e) =>
					setUserExpense(
						Number(e.target.value) > bill
							? userExpense
							: Number(e.target.value),
					)
				}
			/>

			<label>X's Expence: </label>
			<input type="text" disabled value={friendExpense} />

			<label>Who is paying the bill? </label>
			<select
				value={billPayee}
				onChange={(e) => setBillPayee(e.target.value)}
			>
				<option value="user">You</option>
				<option value="friend">{selectedFriend.name}</option>
			</select>

			<Button>Split Bill</Button>
		</form>
	);
}

function FormAddFriend({ onAddFriend }) {
	const [name, setName] = useState("");
	const [image, setImage] = useState("https://i.pravatar.cc/48");

	function handleSubmit(e) {
		e.preventDefault();

		if (!name || !image) return;

		const id = crypto.randomUUID();
		const newFriend = {
			id,
			name,
			image: `${image}?=${id}`,
			balance: 0,
		};

		onAddFriend(newFriend);

		setName("");
		setImage("https://i.pravatar.cc/48");
	}

	return (
		<form className="form-add-friend" onSubmit={handleSubmit}>
			<label>Friend Name</label>
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			<label>Image URL</label>
			<input
				type="text"
				value={image}
				onChange={(e) => setImage(e.target.value)}
			/>

			<Button>Add</Button>
		</form>
	);
}

function Button({ children, onClick }) {
	return (
		<button className="button" onClick={onClick}>
			{children}
		</button>
	);
}
