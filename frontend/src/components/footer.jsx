// src/footer.jsx
import { Link, useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();
  if (location.pathname === '/contact' || location.pathname === '/about') { return (<></>); }
  return (
    <footer
      className=" text-center p-4"
    // style={{ boxShadow: '0 -6px 24px -4px rgba(0,0,0,0.25)' }} // Stronger top shadow
    >
      <p className="text-sm text-gray-500">
        Copyright 2025© ByteForge |
        <Link to="/contact" className="text-blue-400 hover:underline px-2">Contact</Link> |
        <Link to="/about" className="text-blue-400 hover:underline px-2">About</Link>
      </p>
    </footer>
  );
}

export default Footer;
