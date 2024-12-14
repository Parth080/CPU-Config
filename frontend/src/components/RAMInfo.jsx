import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RAMInfo = () => {
  const [ramUsage, setRamUsage] = useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/system`)
      .then((response) => setRamUsage(response.data.ram_usage))
      .catch(() => setRamUsage(0));
  }, []);

  
  const sliderStyle = {
    background: `linear-gradient(to right, #00b5d6 ${ramUsage}%, #C0C0C0 ${ramUsage}%)`,
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyan-800 p-6 animate__animated animate__fadeIn">
      <div className="space-y-6 bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          RAM Usage
        </h2>

        <div className="space-y-4 text-center">
          <div className="relative w-full">
            <input
              type="range"
              min="0"
              max="100"
              value={ramUsage}
              className="w-full h-2 rounded-full appearance-none cursor-pointer transition-all ease-out duration-300 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              style={sliderStyle}
              readOnly
            />
          </div>

          <p className="text-xl font-medium text-gray-800 mt-4">
            <strong>{ramUsage}%</strong> RAM Used
          </p>
          <Link
            to="/"
            className="inline-block bg-cyan-500 text-white py-2 px-4 rounded-lg shadow hover:bg-cyan-600 focus:outline-none flex justify-center align-middle transition-all ease-out duration-300"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RAMInfo;
