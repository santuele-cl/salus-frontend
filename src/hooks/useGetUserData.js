// import { useSelector } from "react-redux/es/hooks/useSelector";
// import { getAccessToken } from "../features/auth/authSlice";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { getAccessToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useGetUserData = () => {
  const accessToken = useSelector(getAccessToken);

  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    const { userId, username, roles } = decoded.UserData;

    return {
      userId,
      username,
      roles,
      isLoggedIn: true,
    };
  }

  return {
    username: "",
    roles: "",
    isLoggedIn: false,
  };
};

export default useGetUserData;
