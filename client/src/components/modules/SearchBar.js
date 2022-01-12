import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

function SearchBar(props) {
    const [searchText, setSearchText] = useState("");

    function handleSubmit(event) {
        const searchSend = searchText;
        props.updateSearch(searchSend);
        setSearchText("");
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="findit-searchbar"
                name="search"
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="search"
            />
            <button type="submit" className="search-button">
                <IoSearch />
            </button>
        </form>
    );
}

export default SearchBar;
