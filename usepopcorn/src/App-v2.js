import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";

// const tempMovieData = [
// 	{
// 		imdbID: "tt1375666",
// 		Title: "Inception",
// 		Year: "2010",
// 		Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
// 	},
// 	{
// 		imdbID: "tt0133093",
// 		Title: "The Matrix",
// 		Year: "1999",
// 		Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
// 	},
// 	{
// 		imdbID: "tt6751668",
// 		Title: "Parasite",
// 		Year: "2019",
// 		Poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
// 	},
// ];

// const tempWatchedData = [
// 	{
// 		imdbID: "tt1375666",
// 		Title: "Inception",
// 		Year: "2010",
// 		Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
// 		runtime: 148,
// 		imdbRating: 8.8,
// 		userRating: 10,
// 	},
// 	{
// 		imdbID: "tt0088763",
// 		Title: "Back to the Future",
// 		Year: "1985",
// 		Poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
// 		runtime: 116,
// 		imdbRating: 8.5,
// 		userRating: 9,
// 	},
// ];

export default function App() {
	const [query, setQuery] = useState("");

	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [selectedId, setSelectedId] = useState(null);

	// const [watched, setWatched] = useState([]);

	const [watched, setWatched] = useState(function () {
		const storedValue = localStorage.getItem("watched");
		return JSON.parse(storedValue);
	});

	function handleCloseMovie() {
		setSelectedId(null);
	}

	function handleAddWatched(movie) {
		setWatched((watched) => [...watched, movie]);
	}

	function handleDeleteWatched(id) {
		setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
	}

	useEffect(
		function () {
			localStorage.setItem("watched", JSON.stringify(watched));
		},
		[watched],
	);

	// using another function before async in useEffect as async returns a promise which will result in a race condition in useEffect
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

	return (
		<>
			<NavBar>
				<Logo />
				<Search query={query} setQuery={setQuery} />
				<NumResults movies={movies} />
			</NavBar>
			<Main>
				<Box>
					{/* {isLoading ? <Loader /> : <ListMovies movies={movies} />} */}
					{isLoading && <Loader />}
					{!isLoading && !error && (
						<ListMovies
							movies={movies}
							setSelectedId={setSelectedId}
						/>
					)}
					{error && <ErrorMessage message={error} />}
				</Box>

				<Box>
					{selectedId ? (
						<MovieDetails
							selectedId={selectedId}
							setSelectedId={setSelectedId}
							onAddWatched={handleAddWatched}
							onCloseMovie={handleCloseMovie}
							watched={watched}
						/>
					) : (
						<>
							<WatchSummary watched={watched} />
							<WatchedMovieList
								watched={watched}
								onDeleteWatched={handleDeleteWatched}
							/>
						</>
					)}
				</Box>
			</Main>
		</>
	);
}

function ErrorMessage({ message }) {
	return (
		<p className="error">
			<span>❌</span> {message}
		</p>
	);
}

function Loader() {
	return <p className="loader">Loading...</p>;
}

function NavBar({ children }) {
	return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
	return (
		<div className="logo">
			<span role="img">🍿</span>
			<h1>usePopcorn</h1>
		</div>
	);
}

function Search({ query, setQuery }) {
	const inputEl = useRef(null);

	// Enter keypress will focus on search bar
	useEffect(
		function () {
			function callback(e) {
				if (e.code === "Enter") {
					inputEl.current.focus();
					setQuery("");
				}
			}

			document.addEventListener("keydown", callback);

			return () => document.removeEventListener("keydown", callback);
		},
		[setQuery],
	);

	return (
		<input
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			ref={inputEl}
		/>
	);
}

function NumResults({ movies }) {
	return (
		<p className="num-results">
			Found <strong>{movies.length}</strong> results
		</p>
	);
}

function Main({ children }) {
	return <main className="main">{children}</main>;
}

function Box({ children }) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className="box">
			<button
				className="btn-toggle"
				onClick={() => setIsOpen((open) => !open)}
			>
				{isOpen ? "–" : "+"}
			</button>
			{isOpen && children}
		</div>
	);
}

// function WatchBox() {
// 	const [isOpen2, setIsOpen2] = useState(true);

// 	return (
// 		<div className="box">
// 			<button
// 				className="btn-toggle"
// 				onClick={() => setIsOpen2((open) => !open)}
// 			>
// 				{isOpen2 ? "–" : "+"}
// 			</button>
// 			{isOpen2 && (
// 				<>
// 					<WatchSummary watched={watched} />
// 					<WatchedMovieList watched={watched} />
// 				</>
// 			)}
// 		</div>
// 	);
// }

function ListMovies({ movies, setSelectedId }) {
	return (
		<ul className="list list-movies">
			{movies?.map((movie) => (
				<Movie
					movie={movie}
					key={movie.imdbID}
					setSelectedId={setSelectedId}
				/>
			))}
		</ul>
	);
}

function Movie({ movie, setSelectedId }) {
	function handleSelectMovie(id) {
		setSelectedId((currentId) => (currentId === id ? null : id));
	}

	return (
		<li onClick={() => handleSelectMovie(movie.imdbID)}>
			<img src={movie.Poster} alt={`${movie.Title} poster`} />
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>🗓</span>
					<span>{movie.Year}</span>
				</p>
			</div>
		</li>
	);
}

const average = (arr) =>
	arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setUserRating] = useState("");

	const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
	const watchedUserRating = watched.find(
		(movie) => movie.imdbID === selectedId,
	)?.userRating;

	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Genre: genre,
		Actors: actors,
		Director: director,
	} = movie;

	function handleAdd() {
		const newWatchedMovie = {
			imdbID: selectedId,
			title,
			year,
			poster,
			imdbRating: Number(imdbRating),
			runtime: Number(runtime.split(" ").at(0)),
			userRating,
		};
		onAddWatched(newWatchedMovie);
		onCloseMovie();
	}

	useEffect(
		function () {
			function callback(e) {
				if (e.code === "Escape") {
					onCloseMovie();
				}
			}

			document.addEventListener("keydown", callback);

			return function () {
				document.removeEventListener("keydown", callback);
			};
		},
		[onCloseMovie],
	);

	useEffect(
		function () {
			async function getMovieDetails() {
				setIsLoading(true);
				const res = await fetch(
					`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_KEY}&i=${selectedId}`,
				);

				const data = await res.json();
				setMovie(data);
				setIsLoading(false);
			}
			getMovieDetails();
		},
		[selectedId],
	);

	useEffect(
		function () {
			if (!title) return;
			document.title = `Movie | ${title}`;

			return function () {
				document.title = "usePopcorn";
			};
		},
		[title],
	);

	return (
		<div className="details">
			{isLoading ? (
				<Loader />
			) : (
				<>
					<header>
						<button className="btn-back" onClick={onCloseMovie}>
							&larr;
						</button>
						<img src={poster} alt={`Poster of ${movie} movie`} />
						<div className="details-overview">
							<h2>{title} </h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre} </p>
							<p>
								<span>⭐</span>
								{imdbRating} IMDb Rating
							</p>
						</div>
					</header>
					<section>
						<div className="rating">
							{isWatched ? (
								<p>
									You have rated this movie{" "}
									{watchedUserRating} ⭐
								</p>
							) : (
								<StarRating
									maxRating={10}
									size={24}
									onSetRating={setUserRating}
								/>
							)}
						</div>
						{userRating > 0 && (
							<button className="btn-add" onClick={handleAdd}>
								+ Add to the list
							</button>
						)}

						<em>{plot} </em>
						<p>Starring {actors}</p>
						<p>Directed by: {director} </p>
					</section>
				</>
			)}
		</div>
	);
}

function WatchSummary({ watched }) {
	const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
	const avgUserRating = average(watched.map((movie) => movie.userRating));
	const avgRuntime = average(watched.map((movie) => movie.runtime));

	return (
		<div className="summary">
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span>{watched.length} movies</span>
				</p>
				<p>
					<span>⭐️</span>
					<span>{avgImdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{avgUserRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{avgRuntime} min</span>
				</p>
			</div>
		</div>
	);
}

function WatchedMovieList({ watched, onDeleteWatched }) {
	return (
		<ul className="list">
			{watched.map((movie) => (
				<WatchedMovie
					movie={movie}
					onDeleteWatched={onDeleteWatched}
					key={movie.imdbID}
				/>
			))}
		</ul>
	);
}

function WatchedMovie({ movie, onDeleteWatched }) {
	function handleDelete(id) {
		onDeleteWatched(id);
	}

	return (
		<li>
			<img src={movie.poster} alt={`${movie.title} poster`} />
			<h3>{movie.title}</h3>
			<button
				className="btn-delete"
				onClick={() => handleDelete(movie.imdbID)}
			>
				X
			</button>
			<div>
				<p>
					<span>⭐️</span>
					<span>{movie.imdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{movie.userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{movie.runtime} min</span>
				</p>
			</div>
		</li>
	);
}
