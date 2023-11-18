// import { Sidebar } from "flowbite-react";
// import {
//   PiChartDonutFill,
//   PiUsersThreeFill,
//   PiChartLineUpBold,
//   PiStethoscopeBold,
// } from "react-icons/pi";

import MainPlaceholder from "../components/dashboard/MainPlaceholder";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";

// import { initFlowbite } from "flowbite";
const Dashboard = () => {
  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      <Navbar />
      {/* Sidebar */}
      <Sidebar />
      {/* Main */}
      <MainPlaceholder />
    </div>
  );
};
export default Dashboard;
