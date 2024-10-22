import React from 'react';

const DataList = ({ data }) => {
  if (!data || data.length === 0) return <p>No data available</p>;

  return (
    <div className="data-list">
      <ul>
        {data.map((pokemon) => (
          <li key={pokemon.id} className="data-item">
            <h3>{pokemon.name}</h3>
            <span>#{pokemon.id.toString().padStart(3, '0')}</span> {/* Display ID as a 3-digit number */}
            <span>{pokemon.types.join(', ')}</span> {/* Display types as a comma-separated string */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataList;
