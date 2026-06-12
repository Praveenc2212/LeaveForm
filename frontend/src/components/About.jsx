import React from "react";
import me from '../assets/me.jpg';
import cp from '../assets/cp.jpg';
import d from '../assets/dhanu.jpg';
import s from '../assets/sh.jpg';
import bgImage from '../assets/bg13.jpg';
import overlay from '../assets/bg6.png';

const teamMembers = [
  { name: "Praveen M", role: "Team Lead", image: me },
  { name: "Dhanush", role: "Frontend & Backend Developer", image: d },
  { name: "Praveen C", role: "Frontend & Backend Developer", image: cp },
  { name: "Shankar S", role: "Frontend Developer", image: s },
  { name: "Praveen M", role: "Team Lead", image: me },
  { name: "Dhanush", role: "Frontend & Backend Developer", image: d },
  { name: "Praveen M", role: "Team Lead", image: me },
  { name: "Dhanush", role: "Frontend & Backend Developer", image: d },
];

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-cover bg-center py-10 px-4 flex flex-col items-center opacity: 1.0" 
    >
      <h1 className="text-5xl font-bold text-center text-black mb-12">
        About <span className="text-black">Us</span>
      </h1>

      <div className="flex flex-col gap-10 w-full max-w-4xl">
        {teamMembers.map((member, index) => {
          const isOdd = index % 2 !== 0;

          return (
            <div
              key={index}
              className={`relative flex items-center rounded-2xl shadow-lg px-6 py-8 ${
                isOdd
                  ? "bg-orange-300 text-black flex-row-reverse"
                  : "bg-orange-100 text-black"
              }`}
            >
              {/* Decorative Overlay Image */}
              

              {/* Profile Image */}
              <div
                className={`w-24 h-24 rounded-full overflow-hidden border-4 ${
                  isOdd ? "border-orange-100 ml-6" : "border-orange-400 mr-6"
                } shadow-md flex-shrink-0`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Text */}
              <div
                className={`flex-1 flex flex-col ${
                  isOdd ? "items-end pr-6 text-right" : "items-start pl-6 text-left"
                }`}
              >
                <h2 className="text-2xl font-bold mb-1">{member.name}</h2>
                <p className="text-lg mb-1 opacity-80">{member.role}</p>
               
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamPage;
