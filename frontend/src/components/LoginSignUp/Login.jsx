import React ,{useState} from 'react'
import bg from "../../assets/bg.jpg";
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png";
import {Link} from "react-router-dom";
import AuthHeader from './AuthHeader';
function Login() {
  const [email , setEmail ] = useState("");
  const [password , setPassword] = useState("");
  const admin = "ppp@kce.ac.in"
  const passkey = "123"
  const navigate = useNavigate()
  const HandleLogin = (e)=>{
    e.preventDefault();
    if(email === admin && (passkey === password))
    {
        navigate("/student");
    }
    if((email==="sss@kce.ac.in") &&(passkey === password) ){
      navigate("/staff");

    }
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-orange-300 to-white-300 font-sans p-4">
      <div className='p-0'>
      {/* <AuthHeader /> */}

      </div>
      <div className="flex justify-center mt-10 mb-6 relative z-10">
          <div className="bg-white/20 backdrop-blur-md border border-white p-6 shadow-lg rounded-2xl w-11/12 sm:w-4/5 md:w-2/3 lg:w-1/3 xl:w-1/4">
            <h1 className="text-center text-black text-2xl font-bold mb-6">Login</h1>
  
            <form onSubmit={HandleLogin} >
  
              <div className="mb-4">
                <label htmlFor="email" className="block text-black font-semibold mb-1 text-lg">
                  E-Mail:
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={(e)=>setEmail(e.target.value)}
                  autoComplete="off"
                  placeholder="Enter E-Mail"
                  className="w-full px-4 py-2 bg-transparent border border-gray/60 text-gray rounded focus:outline-none focus:ring-2 focus:ring-white/70"
                />
              </div>
  
              <div className="mb-6">
                <label htmlFor="password" className="block text-black font-semibold mb-1 text-lg">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full px-4 py-2 bg-transparent border border-gray/60 text-gray rounded focus:outline-none focus:ring-2 focus:ring-white/70"
                />
              </div>
  
              <button
                type="submit"
                // onClick={ HandleLogin  }
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-700 transition-colors duration-300"
              > 
                Login
              </button>
              <p className="text-center mt-4 text-black text-lg">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-pink-500 hover:text-purple-700 underline transition-colors duration-300 hover:drop-shadow-md"
              >
                signup in here
              </Link>
            </p>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Login