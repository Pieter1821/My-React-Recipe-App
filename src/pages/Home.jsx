import React from 'react';
import SearchForm from '../components/SearchForm';
import '../styles/Home.css';

export default function Home() {
  const results = [SearchForm

    ]; // Replace with your actual recipe results array

  return (
    <div className='home-container'>
      <SearchForm />
      {results.length === 0 && (
        <p>No recipe results found.</p>
      )}
    </div>
  );
}
