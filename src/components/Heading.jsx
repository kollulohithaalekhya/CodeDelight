import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
function Heading({openSidebar})
{
    return(
        <div className="heading">
            <div className="menu" onClick={openSidebar}><FaBars/></div>
                <h1>Learn HTML the Right Way</h1>
                <h2>Your Journey Into Web Development Starts Here</h2>
                <input type="button" value="Back to Home" onClick={() => window.history.back()}></input>
        </div>
    );
}
export default Heading