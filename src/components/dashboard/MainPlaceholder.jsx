import { Outlet } from "react-router-dom";

const MainPlaceholder = () => {
  return (
    <main className="rounded-lg p-4 md:ml-64 min-h-screen pt-20">
      <div className="h-[540px] mb-4">
        <Outlet />
      </div>
    </main>
  );
};
export default MainPlaceholder;

// border-2 border-dashed  border-gray-300 dark:border-gray-600
