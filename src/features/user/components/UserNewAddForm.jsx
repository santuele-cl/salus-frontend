import { Button, Label, Select, TextInput } from "flowbite-react";
import { useGetRolesQuery } from "../../role/roleApiSlice";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddNewUserMutation } from "../usersApiSlice";
import { toast } from "react-toastify";
import generatePassword from "../../../utils/PasswordGenerator";
import { PiKeyFill } from "react-icons/pi";
const PersonalInfoFields = [
  { fieldName: "First Name", placeholder: "", id: "fname" },
  { fieldName: "Middle Name", placeholder: "", id: "mname" },
  { fieldName: "Last Name", placeholder: "", id: "lname" },
  { fieldName: "Birth Date", placeholder: "", id: "bdate", type: "date" },
  { fieldName: "Contact Number", placeholder: "", id: "contactNumber" },
  { fieldName: "Email Address", placeholder: "", id: "email", type: "email" },
  { fieldName: "Address", placeholder: "", id: "address" },
];

const AccInfoFields = [
  { fieldName: "Username", placeholder: "", id: "username" },
  { fieldName: "Password", placeholder: "", id: "password" },
];

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(2, "Min. 2 char length"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Min. 8 characters"),

  fname: yup
    .string()
    .required("First name is required.")
    .min(2, "Min. 2 char length"),
  mname: yup
    .string()
    .required("Middle name is required.")
    .min(2, "Min. 2 char length"),
  lname: yup
    .string()
    .required("Last name required")
    .min(2, "Min. 2 char length"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  bdate: yup
    .date()
    .typeError("Invalid date")
    .required("Birth date is required."),
  contactNumber: yup
    .string()
    .required("Contact number is required")
    .matches(/^(09|\+639)\d{9}$/, "Invalid contact number format."),
  address: yup.string().required("Address is required"),
});

const UserNewAddForm = () => {
  const { data: roles, isSuccess } = useGetRolesQuery();

  const [addNewUser] = useAddNewUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({
    username,
    password,
    roleId,
    bdate,
    ...therest
  }) => {
    const profile = { bdate: new Date(bdate).toISOString(), ...therest };
    console.log(profile);
    try {
      await addNewUser({ username, password, roleId, profile }).unwrap();
      reset();
      toast.success("User account successfully created.");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col lg:flex-row max-w-screen-xl mx-auto gap-4 my-4"
    >
      <div className="flex-grow flex flex-col gap-4 p-4">
        <h2 className="uppercase font-bold">Personal Info</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-3">
          {/* Account Fields */}
          {PersonalInfoFields.map((field) => (
            <div key={field.id}>
              <div>
                <Label htmlFor={field.id} value={field.fieldName} />
              </div>

              <TextInput
                id={field.id}
                required
                {...register(field.id)}
                type={field?.type}
                helperText={
                  errors[field.id] && <>{errors[field.id]?.message}</>
                }
                color={errors[field.id] && "failure"}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex-grow flex flex-col gap-4 p-4">
        <h2 className="uppercase font-bold">Account Info</h2>
        <div className="flex flex-col gap-5 p-3">
          <div>
            <div>
              <Label htmlFor="role" value="Role" />
            </div>
            <Select id="role" required {...register("roleId")}>
              {isSuccess &&
                roles.ids.map((id) => (
                  <option key={id} value={id}>
                    {roles["entities"][id]["roleName"]}
                  </option>
                ))}
            </Select>
          </div>
          {/* Account Fields */}

          <div>
            <div>
              <Label htmlFor="username" value="Username" />
            </div>

            <TextInput
              id="username"
              required
              {...register("username")}
              helperText={
                errors["username"] && <>{errors["username"]?.message}</>
              }
              color={errors["username"] && "failure"}
            />
          </div>
          <div>
            <div className="flex items-center gap-4 justify-between">
              <Label htmlFor="password" value="Password" />
              <PiKeyFill
                onClick={() => setValue("password", generatePassword())}
                className="cursor-pointer"
              />
            </div>

            <TextInput
              id="password"
              required
              {...register("password")}
              helperText={
                errors["password"] && <>{errors["password"]?.message}</>
              }
              color={errors["password"] && "failure"}
            />
          </div>
          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 ">
            <Button className="flex-grow" onClick={handleSubmit(onSubmit)}>
              Create Account
            </Button>
            <Button
              outline
              color="failure"
              className="flex-grow"
              onClick={reset}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default UserNewAddForm;
