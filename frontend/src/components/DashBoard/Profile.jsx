import Header from './Header';

function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-300 to-blue-300 font-sans p-6">
      <Header />
      <div className="max-w-3xl mx-auto bg-white/40 backdrop-blur-md rounded-2xl shadow-xl p-6 mt-10 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10">
        
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src="/image/download.jpg"
            alt="Profile"
            className="w-40 h-40 rounded-full border-4 border-white shadow-md object-cover"
          />
        </div>

        {/* Student Info */}
        <div className="text-gray-800 w-full">
          <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Profile</h2>
          <div className="space-y-2 text-lg">
            <div><strong>Name:</strong> Shankar</div>
            <div><strong>Roll Number:</strong> 717823P254</div>
            <div><strong>Department:</strong> Computer Science and Engineering</div>

            <div><strong>Year:</strong> IV-Year</div>
            <div><strong>Section:</strong> B</div>
            <div><strong>Phone:</strong> 1234567890</div>
            <div><strong>Email:</strong> shankar@example.com</div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Profile;
