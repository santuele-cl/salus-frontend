import { Button } from "flowbite-react";
import RoleDeleteModal from "./RoleDeleteModal";
import { useState } from "react";
import { useUpdateRoleMutation } from "../roleApiSlice";
import { format, parseISO } from "date-fns";

const RoleTableBody = ({ roles }) => {
  console.log(roles);
  console.log(Object.keys(roles.entities[roles?.ids[0]]));

  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [updateRole] = useUpdateRoleMutation();

  const onUpdateRole = async (roleId) => {
    try {
      await updateRole({ roleId, roleName: role });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {Object.keys(roles?.entities[roles?.ids[0]]).map((key) => (
              <th scope="col" className="px-4 py-3" key={key}>
                {key}
              </th>
            ))}
            {/* <th scope="col" className="px-4 py-3">
              Action
            </th> */}
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
              <td className="px-4 py-3">{roles.entities[id].roleName}</td>

              <td className="px-4 py-3">
                {format(parseISO(roles.entities[id].createdAt), "MMM dd, yyyy")}
              </td>
              <td className="px-4 py-3">
                {format(parseISO(roles.entities[id].updatedAt), "MMM dd, yyyy")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <RoleDeleteModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        setDeleteId={setDeleteId}
        roleId={deleteId}
      />
    </div>
  );
};
export default RoleTableBody;
