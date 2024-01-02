import { Navigate, Outlet } from "react-router-dom";

// import useGetUserData from "../../hooks/useGetUserData";
// import { roleComparer } from "../../utils/roleComparer";
import useGetUserData from "../../hooks/useGetUserData";

const RequireRole = ({ allowedRoles }) => {
  const { roles } = useGetUserData();
  const isAuthorized = allowedRoles.includes(roles);
  console.log(roles);
  //   const isAuthorized = roleComparer(allowedRoles, roles);

  return isAuthorized ? <Outlet /> : <Navigate to="/404" replace />;
  // return <Outlet />;
};

export default RequireRole;
