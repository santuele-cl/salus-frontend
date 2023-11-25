import { useEffect } from "react";
import { initFlowbite } from "flowbite";

import { useGetUsersQuery } from "./usersApiSlice";

import SpinnerWhole from "../../components/SpinnerWhole";
import UsersTableHeader from "./components/UsersTableHeader";
import UsersTableBody from "./components/UsersTableBody";
import UsersTableFooter from "./components/UsersTableFooter";

const Users = () => {
  const {
    data: users,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetUsersQuery();

  useEffect(() => {
    initFlowbite();
  });

  let content;

  if (isFetching | isLoading) {
    content = <SpinnerWhole />;
  } else if (isError) {
    content = <p>{error?.data?.message}</p>;
  } else if (isSuccess && users) {
    content = (
      <div className="relative overflow-x-auto ">
        <div className="mx-auto max-w-screen-xl border border-gray-300">
          <div className="bg-white dark:bg-gray-800 relative shadow-md  overflow-hidden">
            <UsersTableHeader />
            <UsersTableBody users={users} />
            <UsersTableFooter users={users} />
          </div>
        </div>
      </div>
    );
  }

  return content;
};
export default Users;
