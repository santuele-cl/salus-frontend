// import NavbarSearchIcon from "./NavbarSearchIcon";

import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import useGetUserData from "../../hooks/useGetUserData";
import { PiUserCircleFill } from "react-icons/pi";
import { useGetUserByIdQuery } from "../../features/user/usersApiSlice";
import SpinnerWhole from "../SpinnerWhole";

const NavbarProfile = () => {
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const onLogout = async () => {
    await logout();
    navigate("/auth");
  };

  const { username, userId } = useGetUserData();


  return (
    <div className="flex items-center lg:order-2">
      <p className="font-bold text-blue-500">{username}</p>

      <button
        type="button"
        className="flex mx-3 text-sm rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="dropdown"
      >
        <span className="sr-only">Open user menu</span>
        <PiUserCircleFill size={24} />
      </button>
      {/* Dropdown menu */}
      <div
        className="hidden z-50 my-4 w-56 text-base list-none bg-white  divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl"
        id="dropdown"
      >
        <div className="py-3 px-4">
          <span className="block text-md font-semibold text-gray-900 dark:text-white">
            {username}
          </span>
          <span className="block text-sm text-gray-900 truncate dark:text-white">
            ID: {userId}
          </span>
        </div>
        <ul
          className="py-1 text-gray-700 dark:text-gray-300"
          aria-labelledby="dropdown"
        >
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
            >
              My profile
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
            >
              Account settings
            </a>
          </li>
        </ul>

        <ul
          className="py-1 text-gray-700 dark:text-gray-300"
          aria-labelledby="dropdown"
        >
          <li>
            <button
              type="button"
              className="block w-full p-2 mr-1 text-gray-500 rounded-lg  hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              onClick={onLogout}
            >
              <span className="block w-full py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Sign out
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default NavbarProfile;
