import { Label, TextInput } from "flowbite-react";

const PatientProfile = ({ patientProfile }) => {
  console.log(patientProfile);
  const patientProfileFields = Object.keys(patientProfile);
  return (
    <div className="max-h-[75vh] overflow-scroll">
      <div className="rounded-md p-4 flex flex-col gap-2">
        {patientProfileFields.map((field, i) => {
          return (
            <div key={i} className="flex gap-4 items-center">
              <Label htmlFor={field} value={field} className="w-1/4" />
              <TextInput
                readOnly
                id={field}
                value={patientProfile[field] ? patientProfile[field] : ""}
                className="w-full"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PatientProfile;

{
  /* <div>
      <pre className="text-lg">{JSON.stringify(patientProfile, null, 8)}</pre>
    </div> */
}
