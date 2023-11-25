// import NavbarSearchIcon from "./NavbarSearchIcon";

import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import useGetUserData from "../../hooks/useGetUserData";
import { PiSignOutBold } from "react-icons/pi";

const NavbarProfile = () => {
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const { username, roles, isLoggedIn } = useGetUserData();

  const onLogout = async () => {
    await logout();
    navigate("/auth");
  };
  return (
    <div className="flex items-center lg:order-2">
      {/* Search Icon */}
      {/* <NavbarSearchIcon /> */}
      {/* Notifications */}
      <p className="font-bold text-blue-500">{username}</p>

      <button
        type="button"
        className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="dropdown"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
          alt="user photo"
        />
      </button>
      {/* Dropdown menu */}
      <div
        className="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl"
        id="dropdown"
      >
        <div className="py-3 px-4">
          <span className="block text-sm font-semibold text-gray-900 dark:text-white">
            {username}
          </span>
          <span className="block text-sm text-gray-900 truncate dark:text-white">
            name@flowbite.com
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
              data-dropdown-toggle="notification-dropdown"
              className="p-2 mr-1 text-gray-500 rounded-lg  hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              onClick={onLogout}
            >
              <span className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
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
