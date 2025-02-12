
import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../assets/logo.png"; 

const Navbar = ({continents}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const continentNames = Object.keys(continents); //Obtiene solo las claves del objeto

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="Logo" className="h-10 w-auto lg:h-20" />
            </Link>
          </div>

          {/* Menú para pantallas grandes */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {continentNames.map((continent) => (
              <Link
                key={continent}
                to={`/continent/${continent}`}
                className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                {continent}
              </Link>
            ))}
          </div>

          {/* Botón de menú para móviles */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-500 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú desplegable para móviles */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {continentNames.map((continent) => (
              <Link
                key={continent}
                to={`/continent/${continent}`}
                className="text-gray-700 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium"
              >
                {continent}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

Navbar.propTypes = {
    continents: PropTypes.object.isRequired, 
};

export default Navbar;