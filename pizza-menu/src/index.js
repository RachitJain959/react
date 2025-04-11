import React from "react";
import ReactDom from "react-dom/client";

function App() {
	return <h1>Hello!</h1>;
}

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
	// StrictMode: used in testing environment to render the app to check for bugs
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
