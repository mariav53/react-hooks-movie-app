/* "useEffect" lets perform side effects in your function components: data fetching
subscriptions, and manual DOM manipulations.
Gets called after the first render (componentDidMount) and after every update (componentDidUpdate).
useEffect function accepts two arguments, the function that you want to run and an array.
In that array we just pass in a value that tells React to skip applying an effect 
if the value passed in hasn’t changed */

import React, { useReducer, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=e9732009";

const initialState = {
	loading: true,
	movies: [],
	errorMessage: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case "SEARCH_MOVIES_REQUEST":
			return {
				...state,
				loading: true,
				errorMessage: null,
			};
		case "SEARCH_MOVIES_SUCCESS":
			return {
				...state,
				loading: false,
				movies: action.payload,
			};
		case "SEARCH_MOVIES_FAILURE":
			return {
				...state,
				loading: false,
				errorMessage: action.error,
			};
		case "SEARCH_MOVIEDETAIL_REQUEST":
			return {
				...state,
				loading: true,
				errorMessage: null,
			};
		case "SEARCH_MOVIEDETAIL_SUCCESS":
			return {
				...state,
				loading: false,
				movies: action.payload,
			};
		case "SEARCH_MOVIEDETAIL_FAILURE":
			return {
				...state,
				loading: false,
				errorMessage: action.error,
			};
		default:
			return state;
	}
};

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		fetch(MOVIE_API_URL)
			.then(response => response.json())
			.then(jsonResponse => {
				dispatch({
					type: "SEARCH_MOVIES_SUCCESS",
					payload: jsonResponse.Search,
				});
			});
	}, []);

	const search = searchValue => {
		dispatch({
			type: "SEARCH_MOVIES_REQUEST",
		});

		fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=e9732009`)
			.then(response => response.json())
			.then(jsonResponse => {
				if (jsonResponse.Response === "True") {
					dispatch({
						type: "SEARCH_MOVIES_SUCCESS",
						payload: jsonResponse.Search,
					});
				} else {
					dispatch({
						type: "SEARCH_MOVIES_FAILURE",
						error: jsonResponse.Error,
					});
				}
			});
	};

	const detailMovie = keyMovie => {
		dispatch({
			type: "SEARCH_MOVIEDETAIL_REQUEST",
		});

		fetch(`http://www.omdbapi.com/?i=${keyMovie}&apikey=e9732009`)
			.then(response => response.json())
			.then(jsonResponse => {
				if (jsonResponse.Response === "True") {
					dispatch({
						type: "SEARCH_MOVIEDETAIL_SUCCESS",
						payload: jsonResponse.Search,
					});
				} else {
					dispatch({
						type: "SEARCH_MOVIEDETAIL_FAILURE",
						error: jsonResponse.Error,
					});
				}
			});
	};
	const { movies, errorMessage, loading } = state;

	return (
		<div className='App'>
			<Header text='REACT HOOKS MOVIE APP' search={search} />

			<div className='movies'>
				{loading && !errorMessage ? (
					<span>loading... </span>
				) : errorMessage ? (
					<div className='errorMessage'>{errorMessage}</div>
				) : (
					movies.map((movie, index) => (
						<Movie key={`${index}-${movie.Title}`} movie={movie} />
					))
				)}
			</div>
		</div>
	);
};

export default App;
