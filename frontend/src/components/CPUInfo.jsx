import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 

const CPUInfo = () => {
  const [cpuUsage, setCpuUsage] = useState("Loading...");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/system`)
      .then((response) => setCpuUsage(response.data.cpu_usage))
      .catch(() => setCpuUsage("Error fetching CPU data"));
  }, []);

  const isNaNUsage =
    cpuUsage === "Loading..." || cpuUsage === "Error fetching CPU data"; 

  const sliderStyle = {
    background: isNaNUsage
      ? "#C0C0C0" 
      : `linear-gradient(to right, #00b5d6 ${cpuUsage}%, #C0C0C0 ${cpuUsage}%)`, 

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyan-800 p-6 animate__animated animate__fadeIn">
      <div className="space-y-6 bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-700 mb-4">CPU Info</h1>

      
        <div className="space-y-4 text-center">
          <div className="relative w-full">
            <input
              type="range"
              min="0"
              max="100"
              value={isNaNUsage ? 0 : cpuUsage} 
              className="w-full h-2 rounded-full appearance-none cursor-pointer transition-all ease-out duration-300 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              style={sliderStyle}
              readOnly
            />
          </div>

          
          <p className="text-xl font-medium text-gray-800">
            <strong>CPU Usage:</strong> {isNaNUsage ? "N/A" : `${cpuUsage}%`}
          </p>
        </div>

        
        <Link
          to="/"
          className="inline-block bg-cyan-500 text-white py-2 px-4 rounded-lg shadow hover:bg-cyan-600 focus:outline-none transition-all flex justify-center align-middle ease-out duration-300"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default CPUInfo;
