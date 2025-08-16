import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
	const [value, setValue] = useState(function () {
		const storedValue = localStorage.getItem(key);

		// storedValue might be null on initial run. map function will not work on null.
		return storedValue ? JSON.parse(storedValue) : initialState;
	});

	useEffect(
		function () {
			localStorage.setItem(key, JSON.stringify(value));
		},
		[value, key],
	);

	return [value, setValue];
}
