// components/Home.js
import React, { useEffect, useState } from 'react';
import { getCountriesByContinent } from '../services/api';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
);

const Home = () => {
    const [continents, setContinents] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCountriesByContinent();
            setContinents(data);
        };
        fetchData();
    }, []);

    const calculateTotalPopulation = (countries) => {
        if (!Array.isArray(countries)) {
            console.error('countries no es un array:', countries);
            return 0;
        }
        return countries.reduce((total, country) => total + country.population, 0);
    };

    const chartData = {
        labels: Object.keys(continents), 
        datasets: [
            {
                label: 'Población por continente',
                data: Object.values(continents).map(countries => calculateTotalPopulation(countries)), 
                backgroundColor: 'rgba(96, 196, 196, 0.2)',
                borderColor: 'rgb(6, 63, 63)',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true, 
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
            <h1>Población Mundial por Continente</h1>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default Home;