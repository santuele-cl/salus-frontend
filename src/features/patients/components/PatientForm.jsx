import {
  Button,
  Label,
  Select,
  TextInput,
  Datepicker,
  Radio,
} from "flowbite-react";
import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useAddPatientMutation } from "../patientApiSlice";

const patientFormFields = [
  {
    fieldName: "First Name",
    id: "fname",
  },
  {
    fieldName: "Middle Name",
    id: "mname",
  },
  {
    fieldName: "Last Name",
    id: "lname",
  },
  {
    fieldName: "Birth Date",
    id: "bdate",
  },
  {
    fieldName: "Birth Place",
    id: "bplace",
  },
  { fieldName: "Age", id: "age" },
  { fieldName: "Gender", id: "gender" },
  {
    fieldName: "Civil Status",
    id: "civilStatus",
  },
  {
    fieldName: "Occupation",
    id: "occupation",
  },
  {
    fieldName: "Contact Number",
    id: "contactNumber",
  },
  {
    fieldName: "Email Address",
    id: "email",
  },
  {
    fieldName: "address",
    id: "address",
  },
];

const radioFields = [
  {
    fieldName: "Smoking",
    id: "isSmoking",
  },
  {
    fieldName: "Covid Vaccinated",
    id: "isCovidVaccinated",
  },
  {
    fieldName: "Dengvaxia Vaccinated",
    id: "isDengvaxiaVaccinated",
  },
];

const civilStatusOptions = ["SINGLE", "MARRIED", "WIDOWED", "SEPARATED"];

const schema = yup.object().shape({
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
    .required("Last name is required")
    .min(2, "Min. 2 char length"),
  age: yup.number().required("Age is required"),
  gender: yup.string().required("Gender is required"),
  bdate: yup
    .date()
    .typeError("Invalid date")
    .required("Birth date is required."),
  bplace: yup.string().required("Birthplace is required"),

  civilStatus: yup.string().required("Civil Status is required"),
  contactNumber: yup
    .string()
    .required("Contact number is required")
    .matches(/^(09|\+639)\d{9}$/, "Invalid contact number format."),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  address: yup.string().required("Address is required"),
  isDengvaxiaVaccinated: yup
    .boolean()
    .required("isDengvaxiaVaccinated field is required"),
  isCovidVaccinated: yup
    .boolean()
    .required("isCovidVaccinated field is required"),
  isSmoking: yup.boolean().required("isSmoking field is required"),
});

const PatientForm = () => {
  const [addNewPatient] = useAddPatientMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  console.log(errors);
  const onSubmit = async (data) => {
    console.log("patient form data", data);
    try {
      await addNewPatient({ profile: { ...data } }).unwrap();
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
        <div className="flex flex-col gap-5 p-3">
          {/* Account Fields */}
          {patientFormFields.map(({ fieldName, id }) => {
            if (id === "bdate") {
              return (
                <div key={id}>
                  <div>
                    <Label htmlFor={id} value={fieldName} />
                  </div>
                  {/* <Datepicker
                    id={id}
                    {...register(id)}
                    ref={null}
                    helperText={errors[id] && <>{errors[id]?.message}</>}
                    color={errors[id] && "failure"}
                  /> */}
                  <input type="date" {...register(id)} />
                </div>
              );
            } else if (id === "civilStatus") {
              return (
                <div key={id}>
                  <div>
                    <Label htmlFor={id} value={fieldName} />
                  </div>
                  <Select id={id} {...register(id)}>
                    {civilStatusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </div>
              );
            } else if (id === "gender") {
              return (
                <div key={id}>
                  <div>
                    <Label value={fieldName} />
                  </div>
                  <Radio
                    id="male"
                    {...register(id)}
                    value="male"
                    defaultChecked
                  />
                  <Label htmlFor="male">male</Label>
                  <Radio id="female" {...register(id)} value="female" />
                  <Label htmlFor="female">female</Label>
                </div>
              );
            } else
              return (
                <div key={id}>
                  <div>
                    <Label htmlFor={id} value={fieldName} />
                  </div>

                  <TextInput
                    id={id}
                    {...register(id)}
                    helperText={errors[id] && <>{errors[id]?.message}</>}
                    color={errors[id] && "failure"}
                  />
                </div>
              );
          })}
          {radioFields.map(({ fieldName, id }) => (
            <div key={id}>
              <div>
                <Label value={fieldName} />
              </div>
              <Radio id="yes" {...register(id)} value={true} />
              <Label htmlFor="yes">Yes</Label>
              <Radio id="no" {...register(id)} value={false} defaultChecked />
              <Label htmlFor="no">No</Label>
            </div>
          ))}
        </div>
        <Button onClick={handleSubmit(onSubmit)}>Add</Button>
      </div>
    </form>
  );
};
export default PatientForm;
