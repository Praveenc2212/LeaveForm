import logo from "../../assets/logo.png"; // Update path as needed
const AuthHeader = () => {
  return (
       <div className="flex justify-between items-center bg-white/10 backdrop-blur-md shadow-md rounded-xl py-2 px-6 mb-6 border border-white/20">
            <div className="flex items-center space-x-4">
                  <img src={logo} alt="Logo" className="h-16 object-contain" />
             </div>
      </div>
  )
}

export default AuthHeader