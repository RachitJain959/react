import { useState, useEffect } from "react";

export function useMovies(query) {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(
		function () {
			// AbortController: browser function to stop race conditions, nothing to do with react
			const controller = new AbortController();

			async function fetchMovies() {
				try {
					setIsLoading(true);
					setError(""); // resetting error before every render to clear last error

					const res = await fetch(
						`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_KEY}&s=${query}`,
						{ signal: controller.signal }, // we have to connect controller with the fetch to signal when & where to activate controller
					);

					// offline error
					if (!res.ok) throw new Error("Something went wrong");

					const data = await res.json();

					// search error
					if (data.Response === "False")
						throw new Error("Movie not found!");

					setMovies(data.Search);
					setError("");
				} catch (err) {
					if (err.name !== "AbortError") {
						console.error(err.message);
						setError(err.message);
					}

					// Every cancelled request is treated as an error in JS, so every cancelled fetch will go in the catch block
				} finally {
					setIsLoading(false);
				}
			}
			if (query.length < 3) {
				setMovies([]);
				setError("");
				return;
			}
			fetchMovies();

			// Cleanup func: after every keystroke, effect will be re-rendered & this cleanup func will return. So, after every re-render (every keystroke), controller will abort the current request.

			return function () {
				controller.abort();
			};
		},
		[query],
	);

	return { movies, isLoading, error };
}
