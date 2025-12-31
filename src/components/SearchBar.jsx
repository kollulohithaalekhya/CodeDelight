import React from "react";
import "../styles/SearchBar.css";
const Searchs = () => {
    return (
    <div className="search_bar">
      <span className="material-symbols-outlined search_icon">search</span>
      <input id="searchInput" className="search_input" placeholder="Search for and more"/>
    </div>
    )
};

export default Searchs;