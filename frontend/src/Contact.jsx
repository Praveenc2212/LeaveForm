import React from 'react';
import bgImage from './assets/bg-con.jpg';
const Contact = () => {
  return (
    <div className="h-158 flex flex-col lg:flex-row">
      {/* Left Side - Contact Info */}
      <div className="bg-black text-white w-full lg:w-1/2 p-10 flex flex-col justify-center bg-opacity-80 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})`}}>
        <div className="space-y-8 max-w-md">
          <div>
            <h2 className="text-lg font-semibold">📍 Address</h2>
            <p className="text-gray-300">
              Karpagam College of Engineering<br />
              Coimbatore,Tamilnadu
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">📞 Let's Talk</h2>
            <p className="text-green-500">+91 7548897689</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">✉️ General Support</h2>
            <p className="text-green-500">www.bytesforge.com</p>
            <p className="text-green-500">praveenraja4493@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Right Side - Contact Form */}
      <div className="w-full lg:w-1/2 p-10 bg-white">
        <h2 className="text-2xl font-semibold mb-8">Send Us A Message</h2>
        <form className="space-y-6">
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
            placeholder="Eg. example@email.com"
            className="border border-gray-300 p-3 w-full rounded"
            required
          />
          <input
            type="text"
            placeholder="Eg. +1 800 000000"
            className="border border-gray-300 p-3 w-full rounded"
          />
          <textarea
            rows="4"
            placeholder="Write us a message"
            className="border border-gray-300 p-3 w-full rounded"
            required
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded font-semibold"
          >
            SEND MESSAGE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
