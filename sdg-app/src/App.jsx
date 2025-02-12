// App.js
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Continent from './components/Continent';
import Navbar from './components/Navbar';
import { getCountriesByContinent } from './services/api'; // Ajusta la ruta

function App() {
  const [continents, setContinents] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCountriesByContinent();
      setContinents(data);
    };
    fetchData();
  }, []);


  return (
    <Router>
      <Navbar continents={continents} />
      <Routes>
        <Route path="/" element={<Home continents={continents} />} />
        <Route
          path="/continent/:continentName"
          element={<Continent continents={continents} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
