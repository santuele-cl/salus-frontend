import { Label, TextInput } from "flowbite-react";
import { format, parseISO } from "date-fns";

const PatientProfile = ({ patientProfile }) => {
  console.log(patientProfile);
  const patientProfileFields = Object.keys(patientProfile);
  const excludeFields = ["id", "patientId"];
  const filteredPatientProfileFields = patientProfile.maps;
  const patientFields = [
    { name: "Patient ID", id: "patientId" },
    { name: "First Name", id: "fname" },
    { name: "Middle Name", id: "mname" },
    { name: "Last Name", id: "lname" },
    { name: "Age", id: "age" },
    { name: "Birthdate", id: "bdate" },
    { name: "Birthplace", id: "bplace" },
    { name: "Civil Status", id: "civilStatus" },
    { name: "Occupation", id: "occupation" },
    { name: "Contact Number", id: "contactNumber" },
    { name: "Email", id: "email" },
    { name: "Address", id: "address" },
    { name: "Alert Medication", id: "alertMedication" },
    { name: "Allergies", id: "allergies" },
    { name: "Smoking", id: "isSmoking", bool: true },
    { name: "Covid Vaccinated", id: "isCovidVaccinated", bool: true },
    { name: "Dengvaxia Vaccinated", id: "isDengvaxiaVaccinated", bool: true },
  ];
  return (
    <div className="max-h-[75vh] overflow-scroll">
      <div className="rounded-md p-4 flex flex-col gap-2">
        {patientFields.map(({ name, id, bool }) => {
          let value = patientProfile[id] ? `${patientProfile[id]}` : "No data";
          if (id === "bdate") {
            value = patientProfile[id]
              ? format(parseISO(patientProfile[id]), "MMM dd, yyyy")
              : "";
          }
          if (bool) {
            value = patientProfile[id] ? "yes" : "no";
          }
          return (
            <div key={id} className="grid grid-cols-4 gap-4 items-center">
              <Label htmlFor={id} value={name} className="w-1/4 col-span-1" />
              <TextInput
                readOnly
                id={id}
                value={value}
                className="col-span-3"
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
