// Renders the app header and accepts a title prop

import React from "react";
import Search from "./Search";
import logo from "../assets/film.png";

const Header = props => {
	return (
		<header className='App-header'>
			<div style={{ display: "flex", alignItems: "center" }}>
				<img
					src={logo}
					style={{ width: "28px", height: "26px", marginRight: "14px" }}
				/>
				<h2>{props.text}</h2>
			</div>
			<Search search={props.search} />
		</header>
	);
};

export default Header;
