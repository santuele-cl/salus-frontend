import { Label, TextInput } from "flowbite-react";

const PatientProfile = ({ patientProfile }) => {
  console.log(patientProfile);
  const patientProfileFields = Object.keys(patientProfile);
  return (
    <div>
      <div className="rounded-md border border-gray-400 p-4 flex flex-col gap-2">
        {/* <div className="flex gap-4 items-center outline-[green-500] py-2 rounded-md">
          <Label
            htmlFor="id"
            value="VISIT ID"
            className="bg-green-400 p-2 w-1/4 rounded-md"
          />
          <TextInput id="id" value={visitData["id"]} className="w-full" />
        </div> */}

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
