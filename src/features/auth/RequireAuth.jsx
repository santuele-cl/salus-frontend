/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";

import useGetUserData from "../../hooks/useGetUserData";

const RequireAuth = () => {
  const { isLoggedIn } = useGetUserData();

  return isLoggedIn ? <Outlet /> : <Navigate to="/404" replace />;
};

export default RequireAuth;
