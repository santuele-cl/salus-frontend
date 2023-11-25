import { useEffect } from "react";
import { initFlowbite } from "flowbite";

import { useGetRolesQuery } from "./roleApiSlice";

import SpinnerWhole from "../../components/SpinnerWhole";
import RoleTableFooter from "./components/RoleTableFooter";
import RoleTableHeader from "./components/RoleTableHeader";
import RoleTableBody from "./components/RoleTableBody";

const Roles = () => {
  const {
    data: roles,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetRolesQuery();

  useEffect(() => {
    initFlowbite();
  });

  console.log(error);

  let content;

  if (isFetching || isLoading) {
    content = <SpinnerWhole />;
  } else if (isError) {
    content = <p>{error?.data?.message}</p>;
  } else if (isSuccess && roles) {
    content = (
      <div className="relative overflow-x-auto ">
        <div className="mx-auto max-w-screen-xl border border-gray-300">
          <div className="bg-white dark:bg-gray-800 relative shadow-md  overflow-hidden">
            <RoleTableHeader />
            <RoleTableBody roles={roles} />
            <RoleTableFooter roles={roles} />
          </div>
        </div>
      </div>
    );
  }

  return content;
};
export default Roles;
