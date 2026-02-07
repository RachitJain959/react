import { useState } from "react";

function SearchOrder() {
	const [query, setQuery] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				placeholder="Search order #"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
		</form>
	);
}

export default SearchOrder;
