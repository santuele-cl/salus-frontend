// import { Sidebar } from "flowbite-react";
// import {
//   PiChartDonutFill,
//   PiUsersThreeFill,
//   PiChartLineUpBold,
//   PiStethoscopeBold,
// } from "react-icons/pi";

import { useState } from "react";
import MainPlaceholder from "../components/dashboard/MainPlaceholder";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
// import { initFlowbite } from "flowbite";
// import { useEffect } from "react";
// import { initFlowbite } from "flowbite";
const Dashboard = () => {
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   initFlowbite();
  // }, []);

  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      <Navbar />
      {/* Sidebar */}
      <Sidebar />
      {/* Main */}
      <MainPlaceholder />
      <p>{count}</p>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        Increment
      </button>
    </div>
  );
};
export default Dashboard;
