import React from "react";
import NavBar from "./navSection.jsx";
import '../styles/index.css'
import Logo from './LogoSection.jsx'
import Action from './ActionBar.jsx'
import SearchBar from './SearchBar.jsx'
import Menu from './MenuToggle.jsx'
import "../styles/App.css"
function Header({ setPage })  {
    return (
        <>
            <div className="head">
                <Logo/>
                <SearchBar/>
                <NavBar setPage={setPage} />
                <Action/>
                <Menu />
            </div>
        </>
    );
}

export default Header;