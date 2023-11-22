const UsersTableBody = ({ users }) => {
  const UserObjectPropertiesArr = Object.keys(users?.entities[users?.ids[0]]);
  const TableBodyColumnHeader = UserObjectPropertiesArr.map((key) => (
    <th scope="col" className="px-4 py-3" key={key}>
      {key}
    </th>
  ));

  const TableBodyRowData = users.ids.map((id) => (
    <tr
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      key={id}
    >
      {UserObjectPropertiesArr.map((key) => (
        <td className="px-4 py-3" key={key}>
          {key === "role"
            ? users.entities[id][key].roleName
            : users.entities[id][key]}
        </td>
      ))}
    </tr>
  ));

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>{TableBodyColumnHeader}</tr>
        </thead>
        <tbody>{TableBodyRowData}</tbody>
      </table>
    </div>
  );
};
export default UsersTableBody;
