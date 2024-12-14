import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";

const GPUInfo = () => {
  const [gpuUsage, setGpuUsage] = useState("Loading...");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/gpu`)
      .then((response) => setGpuUsage(response.data.gpu_usage))
      .catch(() => setGpuUsage("Error fetching GPU data"));
  }, []);

  const isNaNUsage = gpuUsage === "N/A"; 

  const sliderStyle = {
    background: isNaNUsage
      ? "#C0C0C0" 
      : `linear-gradient(to right, #00b5d6 ${gpuUsage}%, #C0C0C0 ${gpuUsage}%)`, 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyan-800 p-6 animate__animated animate__fadeIn">
      <div className="space-y-4 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          GPU Information
        </h2>
        <div className="space-y-4 text-center">
          <div className="relative w-full">
            <input
              type="range"
              min="0"
              max="100"
              value={isNaNUsage ? 0 : gpuUsage} 
              className="w-full h-2 rounded-full appearance-none cursor-pointer transition-all ease-out duration-300 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              style={sliderStyle}
              readOnly
            />
          </div>
          <p className="text-xl text-gray-800">
            <strong>GPU Usage:</strong> {isNaNUsage ? "N/A" : `${gpuUsage}%`}
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

export default GPUInfo;
