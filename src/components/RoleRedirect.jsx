import { Navigate } from "react-router-dom";
import useGetUserData from "../hooks/useGetUserData";

const RoleRedirect = () => {
  const { roles } = useGetUserData();
  console.log(roles);
  if (roles === "ADMIN") {
    return <Navigate to="/dashboard" />;
  } else if (roles === "NURSE" || roles === "PHYSICIAN") {
    return <Navigate to="/patient" />;
  } else {
    return <Navigate to="/unauthenticated" />;
  }
};
export default RoleRedirect;
