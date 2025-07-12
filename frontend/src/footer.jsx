// src/footer.jsx
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center p-4">
      <p className="text-sm">
        Copyright 2025© ByteForge |
        <Link to="/contact" className="text-blue-400 hover:underline px-2">Contact</Link> |
        <Link to="/about" className="text-blue-400 hover:underline px-2">About</Link>
      </p>
    </footer>
  );
}

export default Footer;
