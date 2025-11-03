import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(function () {
		async function fetchCities() {
			try {
				setIsLoading(true);

				const res = await fetch(
					`${import.meta.env.VITE_BASE_URL}/cities`,
				);
				const data = await res.json();
				setCities(data);
			} catch (err) {
				alert(err);
			} finally {
				setIsLoading(false);
			}
		}
		fetchCities();
	}, []);

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const context = useContext(CitiesContext);

	return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
