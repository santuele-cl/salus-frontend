import { useEffect } from "react";
import { initFlowbite } from "flowbite";

import UserSearchBarHeader from "./components/UserSearchBarHeader";
import UserNewAddForm from "./components/UserNewAddForm";

const Users = () => {
  useEffect(() => {
    initFlowbite();
  });

  return (
    <div className="relative overflow-x-auto ">
      <div className="mx-auto max-w-screen-xl border border-gray-300 mb-4 rounded-lg bg-white">
        <UserSearchBarHeader />
      </div>
      <div className="mx-auto max-w-screen-xl border border-gray-300 mb-4 rounded-lg bg-white p-4">
        <h2 className=" rounded-md uppercase p-4 font-bold text-lg bg-green-600 text-gray-200">
          Add new user
        </h2>
        <hr />
        <UserNewAddForm />
      </div>
    </div>
  );
};
export default Users;
