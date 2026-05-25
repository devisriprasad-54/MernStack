import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CountryList from './components/CountryList';

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function getCountries() {
      try {
        setLoading(true);
        const res = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,population,region,cca3');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setCountries(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    getCountries();
  }, []);

  const filtered = countries.filter(c =>
    c.name.common.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-4 text-blue-700">Country Explorer App</h1>

      <SearchBar onSearch={setQuery} />


      {loading && <h2 className="text-center text-2xl">Loading...</h2>}

      {error && <h2 className="text-center text-red-600 text-2xl ">Error: {error}</h2>}

      {!loading && !error && (
        <CountryList countries={filtered} />
      )}
    </div>
  );
}

export default App;