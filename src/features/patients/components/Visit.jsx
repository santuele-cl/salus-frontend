import { TextInput, Label } from "flowbite-react";
import VisitForm from "../../visit/VisitForm";

const excludedFields = ["id", "patientChardId", "updatedAt"];

const visitFields2 = [
  { fieldName: "Chief Complaint", value: "chiefComplaint" },
  { fieldName: "HPI", value: "accompaniedBy" },
  { fieldName: "Accompanied By", value: "hpi" },
  { fieldName: "Date of Visit", value: "createdAt" },
  { fieldName: "Service Dept.", value: "serviceDepartment" },
  //   { fieldName: "Vitals", value: "" },
];

const Visit = ({ visitData }) => {
  const visitFields = Object.keys(visitData);

  return (
    <div>
      <div className="rounded-md border border-gray-400 p-4 flex flex-col gap-2">
        <div className="flex gap-4 items-center outline-[green-500] py-2 rounded-md">
          <Label
            htmlFor="id"
            value="VISIT ID"
            className="bg-green-400 p-2 w-1/4 rounded-md"
          />
          <TextInput
            id="id"
            readOnly
            value={visitData["id"]}
            className="w-full"
          />
        </div>

        {visitFields2.map(({ fieldName, value }) => {
          return (
            <div key={value} className="flex gap-4 items-center">
              <Label htmlFor={value} value={fieldName} className="w-1/4" />
              <TextInput
                readOnly
                id={value}
                value={
                  value === "serviceDepartment"
                    ? visitData["serviceDepartment"]["serviceDeptName"]
                    : visitData[value]
                }
                className="w-full"
              />
            </div>
          );
        })}
        <div>
          <h2 className="uppercase font-semibold">Vitals</h2>
        </div>
        <div>
          <h2 className="uppercase font-semibold">Evaluation</h2>
        </div>
      </div>
      {/* <pre className="text-lg">{JSON.stringify(visitData, null, 8)}</pre> */}
    </div>
  );
};
export default Visit;

// {visitFields.map((field, i) => (
//     <div key={i} className="flex items-center">
//       <Label htmlFor={field} value={field} className="w-1/4" />
//       <TextInput id={field} value={visitData[field]} className="w-full" />
//     </div>
//   ))}
