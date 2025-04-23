import React from "react";
import ReactDom from "react-dom/client";
import "./index.css";

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
		<div className="container">
			<Header />
			<Menu />
			<Footer />
		</div>
	);
}

function Header() {
	return (
		<header className="header">
			<h1>Fast React Pizza Co.</h1>
		</header>
	);
}

function Menu() {
	const pizzas = pizzaData;
	const numPizza = pizzas.length;

	return (
		<main className="menu">
			<h2>Our Menu</h2>
			{numPizza ? (
				<ul className="pizzas">
					{pizzas.map((pizza) => (
						<Pizza pizzaObj={pizza} />
					))}
				</ul>
			) : (
				<p>We are working on our menu.</p>
			)}
		</main>
	);
}

function Pizza(props) {
	if (props.pizzaObj.soldOut) return null;
	return (
		<li className="pizza">
			<img src={props.pizzaObj.photoName} alt="Pizza prosciutto" />
			<div>
				<h3>{props.pizzaObj.name}</h3>
				<p>{props.pizzaObj.ingredients}</p>
				<span>{props.pizzaObj.price}</span>
			</div>
		</li>
	);
}

function Footer() {
	const currentHr = new Date().getHours();
	const openHr = 12;
	const closeHr = 22;
	const isOpen = currentHr >= openHr && currentHr < closeHr;

	return (
		<footer className="footer">
			{isOpen ? (
				<div className="order">
					<p>
						{new Date().toLocaleTimeString()} We are currently open
						till {closeHr}.
					</p>
					<button className="btn">Order</button>
				</div>
			) : (
				<p>Sorry we are closed.</p>
			)}
		</footer>
	);
}

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
	// StrictMode: used in testing environment to render the app to check for bugs
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
