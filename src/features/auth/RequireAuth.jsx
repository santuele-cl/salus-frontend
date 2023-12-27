/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";

import useGetUserData from "../../hooks/useGetUserData";

const RequireAuth = () => {
  const { isLoggedIn } = useGetUserData();

  return isLoggedIn ? <Outlet /> : <Navigate to="/404" replace />;

  // NOTES: For testing only!
  // return <Outlet/>
};

export default RequireAuth;
