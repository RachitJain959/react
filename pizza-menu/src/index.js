import React from "react";
import ReactDom from "react-dom/client";

const pizzaData = [
	{
		name: "Focaccia",
		ingredients: "Bread with italian olive oil and rosemary",
		price: 6,
		photoName: "pizzas/focaccia.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Margherita",
		ingredients: "Tomato and mozarella",
		price: 10,
		photoName: "pizzas/margherita.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Spinaci",
		ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
		price: 12,
		photoName: "pizzas/spinaci.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Funghi",
		ingredients: "Tomato, mozarella, mushrooms, and onion",
		price: 12,
		photoName: "pizzas/funghi.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Salamino",
		ingredients: "Tomato, mozarella, and pepperoni",
		price: 15,
		photoName: "pizzas/salamino.jpg",
		soldOut: true,
	},
	{
		name: "Pizza Prosciutto",
		ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
		price: 18,
		photoName: "pizzas/prosciutto.jpg",
		soldOut: false,
	},
];

function App() {
	return (
		<div>
			<Header />
			<Menu />
			<Footer />
		</div>
	);
}

function Pizza() {
	return (
		<div>
			<img src="pizzas/prosciutto.jpg" alt="Pizza prosciutto" />
			<h2>Pizza Prosciutto</h2>
			<p>Tomato, mozarella, ham, aragula, and burrata cheese</p>
		</div>
	);
}

function Header() {
	return <h1>Fast React Pizza Co.</h1>;
}

function Footer() {
	return (
		<footer>
			{new Date().toLocaleTimeString()} We are currently open.
		</footer>
	);
}
function Menu() {
	return (
		<div>
			<Pizza />
			<Pizza />
			<Pizza />
		</div>
	);
}

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
	// StrictMode: used in testing environment to render the app to check for bugs
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
