import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from "react-router-dom";

const Footer = () => {
  const handleLinkClick = (event) => {
    if (!event.ctrlKey || !event.shiftKey) {
      // Si no se mantienen presionadas ambas teclas, no navegamos a /productmanagementpage
      event.preventDefault();
    }
  };
  return (
    <div className="footer-container">
      <ul className="contact-info">
        <li><i className="fas fa-map-marker-alt"></i> 1234 Calle Falsa, Ciudad Ficticia</li>
        <li><i className="fas fa-phone"></i> (123) 456-7890</li>
        <li><i className="fas fa-envelope"></i> info@tusitio.com</li>
      </ul>
      <div className="social-icons">
        <a target="_blank" rel="noreferrer" href="https://www.whatsapp.com/"><i className="fab fa-whatsapp"></i></a>
        <a target="_blank" rel="noreferrer" href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
        <a target="_blank" rel="noreferrer" href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
      </div>
      <Link to={'/productmanagementpage'} onClick={handleLinkClick} className='pi '>π</Link>
    </div>
  );
};

export default Footer;

const rootElement = document.getElementById('footer');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<Footer />);
}