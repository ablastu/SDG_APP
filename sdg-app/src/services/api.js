
export const getAllCountries = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Error al obtener los datos de los países');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

export const getCountriesByContinent = async () => {
    const countries = await getAllCountries();
    const groupedByContinent = {};

    countries.forEach(country => {
        const continent = country.region || 'Unknown'; 
        if (!groupedByContinent[continent]) {
            groupedByContinent[continent] = [];
        }
        groupedByContinent[continent].push({
            name: country.name.common, 
            population: country.population, 
        });
    });

    return groupedByContinent;
};