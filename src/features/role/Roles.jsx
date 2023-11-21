import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import SpinnerWhole from "../../components/SpinnerWhole";
import { useGetRolesQuery, useUpdateRoleMutation } from "./roleApiSlice";
import { PiLockKeyOpenFill, PiPlusBold } from "react-icons/pi";
import { initFlowbite } from "flowbite";
import RoleDeleteModal from "./components/RoleDeleteModal";
import RoleAddModal from "./components/RoleAddModal";

const Roles = () => {
  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  const {
    data: roles,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetRolesQuery();

  const [updateRole] = useUpdateRoleMutation();

  const onUpdateRole = async (roleId) => {
    try {
      await updateRole({ roleId, roleName: role });
    } catch (e) {
      console.log(e);
    }
  };

  console.log(roles);
  useEffect(() => {
    initFlowbite();
  }, []);

  if (isFetching | isLoading) {
    return <SpinnerWhole />;
  } else if (isError) {
    return <p>{error}</p>;
  } else if (isSuccess && roles) {
    // if (isSuccess) {
    //   console.log(Object.keys(roles?.entities[roles?.ids[0]]));
    //   console.log(roles?.ids[0]);
    // }
    return (
      <div className="relative overflow-x-auto ">
        <div className="mx-auto max-w-screen-xl border border-gray-300">
          <div className="bg-white dark:bg-gray-800 relative shadow-md  overflow-hidden">
            {/* TABLE HEADER */}
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <div className="flex  items-center gap-4">
                  <div>
                    <PiLockKeyOpenFill color="black" size={30} />
                  </div>
                  <div>
                    <h5 className="mr-3 font-semibold dark:text-white">
                      Roles and Access
                    </h5>
                    <p className="text-gray-500 dark:text-gray-400">
                      Manage all your existing roles or add a new one
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <Button color="success" onClick={() => setOpenAddModal(true)}>
                  <PiPlusBold />
                  <span className="ml-2">Add new role</span>
                </Button>
              </div>
            </div>

            {/* TABLE BODY */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {Object.keys(roles?.entities[roles?.ids[0]]).map((key) => (
                      <th scope="col" className="px-4 py-3" key={key}>
                        {key}
                      </th>
                    ))}
                    <th scope="col" className="px-4 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {roles.ids.map((id) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={id}
                    >
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {roles.entities[id].id}
                      </th>
                      <td className="px-4 py-3">
                        {roles.entities[id].roleName}
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <Button
                          color="blue"
                          onClick={() => onUpdateRole(roles.entities[id].id)}
                        >
                          Update
                        </Button>
                        <Button
                          color="red"
                          onClick={() => {
                            setOpenDeleteModal(true);
                            setDeleteId(roles.entities[id].id);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* TABLE FOOTER */}
            <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing
                <span className="font-semibold text-gray-900 dark:text-white mx-2">
                  {roles?.ids.length}
                </span>
                of
                <span className="font-semibold text-gray-900 dark:text-white mx-2">
                  {roles?.ids.length}
                </span>
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    ...
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    100
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* MODAL */}
        <RoleDeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          setDeleteId={setDeleteId}
          roleId={deleteId}
        />
        <RoleAddModal
          openAddModal={openAddModal}
          setOpenAddModal={setOpenAddModal}
        />
      </div>
    );
  }
};
export default Roles;
