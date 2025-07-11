
import { useState } from "react";
import { Eye, EyeOff, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthHeader from './AuthHeader';
// import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const navigate = useNavigate();

  const HandleLogin = (e) => {
    e.preventDefault();
    // if (email === admin && passkey === password) {
    //   navigate("/student");
    // }
    // if (email === "sss@kce.ac.in" && "123" === password) {
      // navigate("/staff");
    // }
    // if (email === "ppp@kce.ac.in" && "123" === password) {
      // navigate("/student");
    // }
  };
  
  return (
    <div className="h-96 bg-orange-50/30 font-sans  flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-12 w-full max-w-md flex flex-col justify-center fixed top-30    ">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-orange-100 rounded-full w-24 h-24 flex items-center justify-center mb-4">
              <UserRound className="size-10 text-orange-500" />
            </div>
            <h2 className="text-3xl font-normal text-black">Log In</h2>
          </div>
          <form className="space-y-4" onSubmit={HandleLogin}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="off"
              placeholder="Enter E-Mail"
              className="w-full px-4 py-3 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
             <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="off"
                placeholder="Enter Password"
                className="w-full px-4 py-3 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-100 bg-transparent pr-12"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-orange-600 focus:outline-none cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
            <button
              // onClick={HandleLogin}
              className="w-full bg-orange-100 hover:bg-orange-200 text-orange-600 font-medium py-3 cursor-pointer rounded-md transition"
            >
              Login
            </button>          
          </form>
      </div>
    </div>
  );
}

export default Login;