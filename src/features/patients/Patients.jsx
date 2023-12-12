import { Button, Checkbox, Label, TextInput } from "flowbite-react";

const profileFieldsArr = [
  "First name",
  "Last name",
  "Middle name",
  "Name Suffix",
  "Birthdate",
  "Age",
  "Contact Number",
];
const Patients = () => {
  return (
    <form className="flex max-w-md flex-col gap-4 mx-auto">
      <h2 className="text-center uppercase font-bold">Patient Profile</h2>

      {profileFieldsArr.map((field, index) => (
        <div key={field}>
          <div className="mb-2 block">
            <Label htmlFor={field + index + 1} value={field} />
          </div>
          <TextInput id={field + index + 1} required />
        </div>
      ))}

      <Button type="submit">Create profile</Button>
    </form>
  );
};
export default Patients;
