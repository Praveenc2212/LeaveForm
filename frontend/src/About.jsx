import React from "react";

import me from './assets/me.jpg'; 
import cp from './assets/cp.jpg'; 
import d from './assets/dhanu.jpg';
import s from './assets/sh.jpg'; 
const team = [
  {
    name: "Dhanush",
    role: "Frontend | Backend Developer",
    image: d, 
  },
  {
    name: "Praveen C", 
    role: "Backend Developer",
    image: cp,
  },
  {
    name: "Praveenkumar ",
    role: "Frontend Developer",
    image: me,
  },
  {
    name: "Shankar S",
    role: "Frontend Developer",
    image: s,
  },
];

function About() {
  return (
    <div className="min-h-screen bg-[#fefaf6] py-10 px-4 md:px-16">
     
      <h1 className="text-4xl font-extrabold text-center text-[#7c4f29] mb-2">
        Meet Our Team
      </h1>
      <p className="text-lg font-medium text-center text-gray-700 mb-10">
        Administration Team
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 place-items-center">
        {team.map((member, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md w-64 text-center border border-[#d2b48c]"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-[#f1e3cd] object-cover"
            />
            <h3 className="text-xl font-bold text-[#7c4f29]">{member.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{member.role}</p>
          </div>
        ))}
      </div>

     
    </div>
  );
}

export default About;
