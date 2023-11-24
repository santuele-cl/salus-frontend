import { Label, Select, TextInput } from "flowbite-react";
import { useGetRolesQuery } from "../../role/roleApiSlice";
import SpinnerWhole from "../../../components/SpinnerWhole";

const UserAddFormFields = [
  { fieldName: "Username", placeholder: "", id: "username" },
  { fieldName: "Password", placeholder: "", id: "password", type: "password" },
  {
    fieldName: "Confirm Password",
    placeholder: "",
    id: "password_confirmation",
    type: "password",
  },
];

const UserAddForm = ({ register, errors }) => {
  const {
    data: roles,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetRolesQuery();

  let content;

  if (isFetching | isLoading) {
    content = <SpinnerWhole />;
  } else if (isError) {
    content = <p>{error}</p>;
  } else if (isSuccess && roles) {
    content = (
      <form onSubmit={(e) => e.preventDefault()} className="w-full mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Role" />
          </div>
          <Select id="countries" required {...register("roleId")}>
            {roles.ids.map((roleId) => (
              <option key={roleId} value={roles.entities[roleId].id}>
                {roles.entities[roleId].roleName}
              </option>
            ))}
          </Select>
        </div>
        {UserAddFormFields.map((field) => (
          <div className="relative z-0 w-full mb-5 group" key={field.id}>
            <div className="mb-2 block">
              <Label htmlFor={field.id} value={field.fieldName} />
            </div>
            <TextInput
              {...register(field.id)}
              id={field.id}
              type={field?.type}
              placeholder=" "
              required
              helperText={errors[field.id] && <>{errors[field.id]?.message}</>}
              color={errors[field.id] && "failure"}
            />
          </div>
        ))}
      </form>
    );
  }

  return content;
};
export default UserAddForm;
