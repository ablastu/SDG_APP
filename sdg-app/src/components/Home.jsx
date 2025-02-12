import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
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

const Home = ({ continents }) => {
    const [filteredContinents, setFilteredContinents] = useState(continents);
    const [minPopulation, setMinPopulation] = useState(0);

    useEffect(() => {
        setFilteredContinents(
            Object.fromEntries(
                Object.entries(continents).filter(([, countries]) =>
                    calculateTotalPopulation(countries) >= minPopulation
                )
            )
        );

    }, [minPopulation, continents]);

    const calculateTotalPopulation = (countries) => {
        if (!Array.isArray(countries)) {
            console.error('countries no es un array:', countries);
            return 0;
        }
        return countries.reduce((total, country) => total + country.population, 0);
    };

    const chartData = {
        labels: Object.keys(filteredContinents),
        datasets: [
            {
                label: 'Población por continente',
                data: Object.values(filteredContinents).map(countries => calculateTotalPopulation(countries)),
                backgroundColor: 'rgb(159, 205, 254)',
                borderColor: 'rgb(0, 102, 203)',
                borderWidth: 2,
            },
        ],
    };

    const tableData = Object.keys(filteredContinents).map((continent) => ({
        name: continent,
        population: filteredContinents[continent].reduce((sum, country) => sum + country.population, 0).toLocaleString(),
    }));

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: { enabled: true },
            datalabels: {
                color: 'black',
                anchor: 'end',
                align: 'top',
                font: { weight: 'bold', size: 14 },
            },
        },        
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
        <div>
            <Filter onFilterChange={setMinPopulation} />
            <h1 className="text-3xl font-bold text-center text-blue-300 mb-6">Población Mundial por Continente</h1>
            <div className="bg-white p-10 rounded-lg h-[500px]">
                <Bar data={chartData} options={options} />
            </div>
            <Table data={tableData} columns={[{ key: "name", label: "Continente" }, { key: "population", label: "Población" }]} />
        </div>
    );
};

Home.propTypes = {
    continents: PropTypes.object.isRequired,
};

export default Home;



