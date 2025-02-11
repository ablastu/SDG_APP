import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/continent/Asia">Asia</Link></li>
        <li><Link to="/continent/Europe">Europa</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
