import { Button, Label, TextInput } from "flowbite-react";

const profileFieldsArr = [
  "Patient ID",
  "Time in",
  "Time out",
  "Last visit",
  "Temperature",
  "Pulse Rate",
  "Respiratory Rate",
  "Weight",
  "Smoking status",
];

const Records = () => {
  return (
    <form className="flex max-w-md flex-col gap-4 mx-auto">
      <h2 className="text-center uppercase font-bold">Follow-up record</h2>
      {profileFieldsArr.map((field, index) => (
        <div key={field}>
          <div className="mb-2 block">
            <Label htmlFor={field + index + 1} value={field} />
          </div>
          <TextInput id={field + index + 1} required />
        </div>
      ))}

      <Button type="submit">Add record</Button>
    </form>
  );
};
export default Records;
