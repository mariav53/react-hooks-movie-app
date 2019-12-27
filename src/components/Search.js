// Contains a form with the input element and the search button
// Also contains functions that handle the input element and resets the field
// and also contains a function that calls the search function which is passed as props to it

/* "useState" it lets us add React state to function components
Accepts one argument (the initial state) and returns an array containing the current state
(equivalent to this.state) and a function to update it (equivalent to this.setState ) */

import React, { useState } from "react";

const Search = props => {
	const [searchValue, setSearchValue] = useState("");

	const handleSearchInputChanges = e => {
		setSearchValue(e.target.value);
	};

	const resetInputField = () => {
		setSearchValue("");
	};

	const callSearchFunction = e => {
		e.preventDefault();
		props.search(searchValue);
		resetInputField();
	};

	return (
		<form className='search'>
			<input
				value={searchValue}
				onChange={handleSearchInputChanges}
				type='text'
				placeholder='Looking for a movie?'
			/>
			<input onClick={callSearchFunction} type='submit' value='SEARCH' />
		</form>
	);
};

export default Search;
