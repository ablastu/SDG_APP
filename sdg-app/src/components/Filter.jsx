// components/PopulationFilter.jsx
import { useState } from "react";
import PropTypes from "prop-types";

const Filter = ({ onFilterChange }) => {
    const [population, setPopulation] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        if (value === "" || (Number(value) >= 0 && /^\d*$/.test(value))) {
            setPopulation(value);
        }
    };

    const handleFilterClick = () => {
        onFilterChange(Number(population) || 0); 
    };

    return (
        <div className="flex items-center gap-2 m-10"> 
            <input
                type="text"
                placeholder="Filtrar por población mínima"
                value={population}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
                onClick={handleFilterClick}
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
            >
                Filtrar
            </button>
        </div>
    );
};

Filter.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
