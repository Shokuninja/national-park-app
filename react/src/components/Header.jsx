// Header.jsx

import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import logo from "../../images/resized_nature_photography_logo_100x100 (1).png";

const Header = () => {
  return (
    <header>
      <Link to="/" className="header-logo">
        <img src={logo} alt="Park Lens Logo" id="logoElement" />
      </Link>
      <Link to="/" className="header-title" id="parkLensTitle">
        Park Lens
      </Link>
      <Navigation />
    </header>
  );
};

export default Header;