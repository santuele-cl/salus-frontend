import { Button } from "flowbite-react";
import { PiUsersThreeFill, PiPlusBold } from "react-icons/pi";
import UserAddModal from "./UserAddModal";
import { useState } from "react";

const UsersTableHeader = () => {
  const [openAddUserModal, setOpenAddUserModal] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
      <div className="w-full md:w-1/2">
        <div className="flex  items-center gap-4">
          <div>
            <PiUsersThreeFill color="black" size={30} />
          </div>
          <div>
            <h5 className="mr-3 font-semibold dark:text-white">Users</h5>
            <p className="text-gray-500 dark:text-gray-400">
              Manage all existing user or add a new one
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
        <Button color="success" onClick={() => setOpenAddUserModal(true)}>
          <PiPlusBold />
          <span className="ml-2">Add new user</span>
        </Button>
      </div>

      <UserAddModal
        openAddUserModal={openAddUserModal}
        setOpenAddUserModal={setOpenAddUserModal}
      />
    </div>
  );
};
export default UsersTableHeader;
