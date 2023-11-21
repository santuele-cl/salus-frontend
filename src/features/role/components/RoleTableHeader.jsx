import { PiLockKeyOpenFill, PiPlusBold } from "react-icons/pi";

const RoleTableHeader = () => {
  return (
    <div className="w-full max-w-screen-xl  mx-auto outline-gray-200">
      {/* Start coding here */}
      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
        <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
          <div className="flex justify-center items-center gap-4">
            <div>
              <PiLockKeyOpenFill color="black" size={30} />
            </div>
            <div>
              <h5 className="mr-3 font-semibold dark:text-white">
                Roles and Access
              </h5>
              <p className="text-gray-500 dark:text-gray-400">
                Manage all your existing roles or add a new one
              </p>
            </div>
          </div>
          <button
            type="button"
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 gap-2"
          >
            <PiPlusBold />
            <span>Add new role</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default RoleTableHeader;
