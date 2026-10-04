import React from 'react';

export default function SearchBar({ search, setSearch }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <input 
        type="text" 
        placeholder="Search by title or author..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '0.5rem', width: '100%', maxWidth: '400px' }}
      />
    </div>
  );
}