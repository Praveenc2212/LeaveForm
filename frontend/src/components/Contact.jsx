import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/bg-con.jpg';
const Contact = () => {
  const navigate = useNavigate();
  return (
    <div className="h-160 flex flex-col lg:flex-row">
      {/* Left Side - Contact Info */}
      <div className="bg-black text-white w-full lg:w-1/2 p-10 flex flex-col justify-center bg-opacity-80 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="space-y-8 max-w-md">
          <div>
            <h2 className="text-lg font-semibold">🏠︎ Address </h2>
            <p className="text-gray-300 mt-2">
              • Karpagam College of Engineering,<br />
              &nbsp; Coimbatore, Tamilnadu
            </p>
            <p className="text-gray-300 mt-2">
              • KCE : C-Block, 1st Floor, Staff Room,<br />
              &nbsp; HOD Cabin<br />
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">🕻 Mobile No. </h2>
            Dr. Vignesh :
            <p className="inline text-green-500 mt-2"> +91 98946 42277</p>
            <br />
            Mr. Dhanush .N :
            <p className="inline text-green-500 mt-2"> +91 63699 36471</p>
            <br />
            Ms. Harini :
            <p className="inline text-green-500 mt-2"> +91 96263 15930</p>
            <br />
            Mr. Praveen .C :
            <p className="inline text-green-500 mt-2"> +91 93442 72090</p>
            <br />
            Mr. Praveen .M :
            <p className="inline text-green-500 mt-2"> +91 94897 90927</p>
            <br />
            Mr. Shankar .S:
            <p className="inline text-green-500 mt-2"> +91 63824 08775</p>
            <br />
            Mr. Praveen Kumar :
            <p className="inline text-green-500 mt-2"> +91 75488 97689</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">✉︎ General Email Support</h2>
            <p className="text-green-500 mt-2">717823p112@kce.ac.in</p>
            <p className="text-green-500">717823p118@kce.ac.in</p>
            <p className="text-green-500">717823p242@kce.ac.in</p>
            <p className="text-green-500">717823p243@kce.ac.in</p>
            <p className="text-green-500">717823p254@kce.ac.in</p>
            <p className="text-green-500">717823p341@kce.ac.in</p>
          </div>
        </div>
      </div>

      {/* Right Side - Contact Form */}
      <div className="w-full lg:w-1/2 p-10 bg-white">
        <h2 className="text-2xl font-semibold mb-8">Contact Us</h2>
        <form onSubmit={() => navigate("/")} className="space-y-6">
          <div className="flex flex-col md:flex-row md:space-x-4">
            <input
              type="text"
              placeholder="First name"
              className="border border-gray-300 p-3 w-full rounded"
              required
            />
            <input
              type="text"
              placeholder="Last name"
              className="border border-gray-300 p-3 w-full mt-4 md:mt-0 rounded"
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email: example@email.com"
            className="border border-gray-300 p-3 w-full rounded"
            required
          />
          <input
            type="text"
            placeholder="Phone: +91 12345 67890"
            className="border border-gray-300 p-3 w-full rounded"
            required
          />
          <textarea
            rows="4"
            placeholder="Share Your Experience"
            className="border border-gray-300 p-3 w-full rounded"
            required
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-6 py-3 rounded font-semibold"
          >
            SEND
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
