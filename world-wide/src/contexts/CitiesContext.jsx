import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCity, setCurrentCity] = useState({});

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

	async function getCity(id) {
		try {
			setIsLoading(true);

			const res = await fetch(
				`${import.meta.env.VITE_BASE_URL}/cities/${id}`,
			);
			const data = await res.json();
			setCurrentCity(data);
		} catch (err) {
			alert(err);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				getCity,
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
