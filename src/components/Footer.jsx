import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <p className="footer-text">© {new Date().getFullYear()} React Recipe App. All rights reserved.</p>
        <p className="footer-author">Designed and Developed by Pieter Deane</p>
      </div>
    </div>
  );
};

export default Footer;
