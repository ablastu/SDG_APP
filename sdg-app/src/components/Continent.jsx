import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import Filter from './Filter';
import Table from './Table';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
);

const Continent = ({ continents }) => {
    const { continentName } = useParams();
    const countries = continents[continentName] || [];
    const [filteredCountries, setFilteredCountries] = useState(countries);
    const [minPopulation, setMinPopulation] = useState(0);

    useEffect(() => {
        setFilteredCountries(
            countries.filter((country) => country.population >= minPopulation)
        );
    }, [minPopulation, countries]);


    const chartData = {
        labels: filteredCountries.map((country) => country.name),
        datasets: [
            {
                label: "Población por país",
                data: filteredCountries.map((country) => country.population),
                backgroundColor: 'rgba(96, 196, 196, 0.2)',
                borderColor: 'rgb(6, 63, 63)',
                borderWidth: 2,
            },
        ],
    };

    const tableData = filteredCountries.map((country) => ({
        name: country.name,
        population: country.population.toLocaleString(),
    }));

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'category',
            },
            y: {
                type: 'linear',
            },
        },
    };

    return (
        <div className="continent-container">
            <Filter onFilterChange={setMinPopulation} />
            <h1 className="text-3xl font-bold text-center text-blue-300 mb-6">Población Mundial por Países de {continentName}</h1>
            <div className="bg-white p-10 rounded-lg h-[500px]">
                <Bar data={chartData} options={options} />
            </div>
            <Table data={tableData} columns={[{ key: "name", label: "País" }, { key: "population", label: "Población" }]} />
        </div>
    );
};


Continent.propTypes = {
    continents: PropTypes.object.isRequired,
};

export default Continent;
