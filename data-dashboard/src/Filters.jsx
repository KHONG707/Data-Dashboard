import React from 'react';

const Filters = ({ setFilterType }) => {
  return (
    <div className="filters">
      <select onChange={(e) => setFilterType(e.target.value)}>
        <option value="">All Types</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        {/* Add other Pokémon types as options */}
      </select>
    </div>
  );
};

export default Filters;
