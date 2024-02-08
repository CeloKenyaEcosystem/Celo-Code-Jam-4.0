import React from "react";
import HomeNavbar from "../components/HomeNavbar";
import SideBar from "../components/sideBar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-full h-screen w-full bg-send ">
      <HomeNavbar />

      <div className="flex justify-center items-center h-full w-full">
        <div className="h-1/2 w-1/2  text-green-100">
          <h1 className="text-5xl font-bold text-center mb-4 text-gray-500">
            Welcome to StreamPay
          </h1>
          <p className="text-xl text-center mb-8 text-white">
            We offer the best services for your needs.
          </p>
          <div className="flex justify-center">
            <button onClick={()=>{navigate("/add")}} className="px-8 py-3 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="flex flex-col items-center bg-gray-900 text-white py-12">
        <h2 className="text-3xl font-semibold mb-6">Our Services</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Service Card 1 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Money Streaming </h3>
            <p className="text-gray-400">
            Automatically send recurring payments in cUSDx to a chosen recipient based on specified conditions.
            </p>
          </div>

          {/* Service Card 2 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Freelancer Management </h3>
            <p className="text-gray-400">
            Oversee freelancers for projects, with tools for communication, contract management, and secure payments.
            </p>
          </div>

          {/* Service Card 3 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Pay-On-Time</h3>
            <p className="text-gray-400">
            Ensure timely payments, fostering trust and responsible payment behavior in transactions.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center bg-gray-800 text-white py-12">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-6">About Us</h2>
          <p className="text-gray-400 max-w-lg mx-auto">
          A revolutionary DApp offering seamless money streaming for cUSDx, efficient freelancer management, and timely payments. Empowering individuals and businesses with blockchain and cryptocurrencies, MoneyFlow ensures secure and frictionless financial interactions. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
