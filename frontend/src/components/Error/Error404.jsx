import React from 'react';
import './Error404.css'; // Import your CSS file for styling

const Error404 = () => {
  return (
    <div className="fixed inset-0 bg-[rgba(255,250,236,255)] flex flex-col items-center justify-center z-50">
      <img src={'/notFound.jpg'} alt="404 Not Found" className="not-found-image mb-6" />
      <h1 className="not-found-title text-2xl font-bold text-[#222] mb-2">This Page Does Not Exist</h1>
      <p className="not-found-text text-gray-700 text-center max-w-xl">
        Sorry, the page you are looking for could not be found. It's just an accident that was not intentional.
      </p>
    </div>
  );
};

export default Error404;
