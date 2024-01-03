import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useUpdateUserMutation } from "../usersApiSlice";
import { toast } from "react-toastify";

const UserSearchContent = ({ user }) => {
  const tbHeader = ["id", "username", "name", "role", "Status"];

  const [updateuser] = useUpdateUserMutation();

  const onActiveStatusChange = async () => {
    try {
      await updateuser({
        id: user["id"],
        updatedData: { isActive: !user["isActive"] },
      }).unwrap();
      toast.success("User account successfully created.");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="uppercase">
            {tbHeader.map((header, i) => (
              <th scope="col" className="px-4 py-3" key={i}>
                {header}
              </th>
            ))}
            <th scope="col" className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {user ? (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700  text-sm ">
              <td className="px-4 py-3">{user["id"]}</td>
              <td className="px-4 py-3">{user["username"]}</td>
              <td className="px-4 py-3">{`${user["userProfile"]["fname"]} ${user["userProfile"]["mname"]} ${user["userProfile"]["lname"]}`}</td>
              <td className="px-4 py-3">{user["role"]["roleName"]}</td>
              <td className="px-4 py-3">
                {user["isActive"] ? (
                  <span className="text-green-500 font-bold">Active</span>
                ) : (
                  <span className="text-red-500 font-bold">Deactivated</span>
                )}
              </td>

              <td className="px-4 py-3">
                {user["isActive"] && (
                  <Button size="xs" onClick={onActiveStatusChange}>
                    Deactivate
                  </Button>
                )}
                {!user["isActive"] && (
                  <Button size="xs" onClick={onActiveStatusChange}>
                    Activate
                  </Button>
                )}
              </td>
            </tr>
          ) : (
            "Empty"
          )}
        </tbody>
      </table>
    </div>
  );
};
export default UserSearchContent;
