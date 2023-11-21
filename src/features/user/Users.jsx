import SpinnerWhole from "../../components/SpinnerWhole";
import { useGetUsersQuery } from "./usersApiSlice";

const Users = () => {
  const {
    data: users,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetUsersQuery();

  if (isSuccess) {
    console.log(users);
  }

  if (isFetching) {
    return <SpinnerWhole />;
  }

  if (isError) {
    return <p>{error}</p>;
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {Object.keys(users?.entities[users?.ids[0]]).map((key) => (
              <th scope="col" className="px-6 py-3" key={key}>
                {key}
              </th>
            ))}
            <th scope="col" className="px-6 py-3">
              Record
            </th>
          </tr>
        </thead>
        <tbody>
          {users.ids.map((id) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={id}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {users.entities[id].id}
              </th>
              <td className="px-6 py-4">{users.entities[id].username}</td>
              <td className="px-6 py-4">{users.entities[id].role.roleName}</td>
              <td className="px-6 py-4">{users.entities[id].isActive}</td>
              <td className="px-6 py-4">{users.entities[id].createdAt}</td>
              <td className="px-6 py-4">{users.entities[id].updatedAt}</td>
              <td className="px-6 py-4">View</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Users;
