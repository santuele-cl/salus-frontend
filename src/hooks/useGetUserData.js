// import { useSelector } from "react-redux/es/hooks/useSelector";
// import { getAccessToken } from "../features/auth/authSlice";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { getAccessToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useGetUserData = () => {
  const accessToken = useSelector(getAccessToken);

  // let isManager = false;
  // let isAdmin = false;
  // let status = "employee";

  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    const { username, roles } = decoded.UserData;

    // isManager = roles.includes("manager");
    // isAdmin = roles.includes("admin");

    // if (isManager) status = "manager";
    // if (isAdmin) status = "admin";

    return {
      username,
      roles,
      // status, isManager, isAdmin,
      isLoggedIn: true,
    };
  }

  return {
    username: "",
    roles: "",
    // isManager,
    // isAdmin,
    // status,
    isLoggedIn: false,
  };
};

export default useGetUserData;
