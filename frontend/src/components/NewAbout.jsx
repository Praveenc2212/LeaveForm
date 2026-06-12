const teamMembers = [
  { name: "John Doe", role: "Project Manager", img: "/SDC.png" },
  { name: "Jane Smith", role: "Developer", img: "/team2.jpg" },
  { name: "Mike Johnson", role: "Designer", img: "/team3.jpg" },
  { name: "Emily Brown", role: "Tester", img: "/team4.jpg" },
  { name: "Chris Evans", role: "DevOps", img: "/team5.jpg" },
  { name: "Sarah Lee", role: "Frontend", img: "/team6.jpg" },
  { name: "Daniel Kim", role: "Backend", img: "/team7.jpg" },
];

function NewAbout() {
  return (
    <div className="bg-[#1c2233] text-white py-16 px-4 text-center">
      <h2 className="text-4xl font-bold mb-2">OUR TEAM</h2>
      <p className="text-gray-300 mb-10 text-sm">
        Introduction of key team members and their areas of expertise
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Outer rotated background layers */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32">
              {/* Background layer */}
              <div className="absolute inset-0 bg-blue-900 transform rotate-45 scale-110 z-0 rounded-md"></div>
              <div className="absolute inset-0 bg-blue-500 transform rotate-45 scale-100 z-0 rounded-md"></div>

              {/* Image */}
              <div className="absolute inset-0 transform rotate-45 z-10 overflow-hidden rounded-md">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover transform -rotate-45 scale-105"
                />
              </div>
            </div>

            {/* Text below */}
            <h3 className="text-lg font-semibold mt-4">{member.name}</h3>
            <p className="text-sm text-gray-400 mb-2">{member.role}</p>
            <p className="text-xs text-gray-500 max-w-[220px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewAbout;
