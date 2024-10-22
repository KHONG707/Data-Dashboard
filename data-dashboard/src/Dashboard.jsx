import React, { useState, useEffect } from 'react';
import DataList from './DataList'; // Ensure this path is correct based on where DataList is located

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
        const result = await response.json();

        const detailedData = await Promise.all(
          result.results.map(async (pokemon) => {
            const pokemonDetails = await fetch(pokemon.url).then((res) => res.json());
            return {
              name: capitalize(pokemonDetails.name),
              id: pokemonDetails.id,
              types: pokemonDetails.types.map((t) => capitalize(t.type.name)),
            };
          })
        );

        setData(detailedData);
        setFilteredData(detailedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === '' || pokemon.types.includes(capitalize(filterType)))
    );
    setFilteredData(filtered);
  }, [searchTerm, filterType, data]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  return (
    <div className="app">
      <h1>Pokémon Dashboard</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
        <select onChange={handleFilterChange} className="filter-select" value={filterType}>
          <option value="">All Types</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="bug">Bug</option>
          <option value="rock">Rock</option>
          <option value="ground">Ground</option>
          <option value="psychic">Psychic</option>
          <option value="ghost">Ghost</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
        </select>
      </div>
      <div className="summary">
        <p>Total Pokémon: {data.length}</p>
        <p>Filtered Pokémon: {filteredData.length}</p>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataList data={filteredData} />
      )}
    </div>
  );
};

export default Dashboard;
