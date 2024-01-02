import useGetConfig from "../../../hooks/useGetConfig";
import { PiSignOutBold } from "react-icons/pi";
import useGetUserData from "../../../hooks/useGetUserData";
import { useLogoutMutation } from "../../auth/authApiSlice";
import { useNavigate } from "react-router-dom";

const PatientPageNav = () => {
  const { name, logo } = useGetConfig();
  const { username } = useGetUserData();
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const onLogout = async () => {
    await logout();
    navigate("/auth");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-4 dark:bg-gray-800 dark:border-gray-700 ">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex justify-start items-center">
          <div className="flex items-center justify-between mr-4">
            <div className="flex items-center justify-center">
              <img src={logo} className="mr-3 h-8" alt="logo" />
            </div>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              {name}
            </span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <p>{username}</p>
          <PiSignOutBold
            size={24}
            onClick={onLogout}
            className="cursor-pointer"
          />
        </div>
      </div>
    </nav>
  );
};
export default PatientPageNav;
