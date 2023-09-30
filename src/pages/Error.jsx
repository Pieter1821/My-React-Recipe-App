import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Error.css';

export default function Error() {
  return (
    <div className="error-container">
      <h1>Oops!</h1>
      <p>Something went wrong. Please try again later.</p>
      <Link to="/" className="back-button">Go back to the home page</Link>
    </div>
  );
}
