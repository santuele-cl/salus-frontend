import { TextInput, Label } from "flowbite-react";
import EvaluationForm from "./EvaluationForm";
import VitalsForm from "./VitalsForm";
import EvaluationFormRO from "./EvaluationFormRO";
import VitalsFormRO from "./VitalsFormRO";

const visitFields2 = [
  { fieldName: "Chief Complaint", value: "chiefComplaint" },
  { fieldName: "HPI", value: "hpi" },
  { fieldName: "Accompanied By", value: "accompaniedBy" },
  { fieldName: "Date of Visit", value: "createdAt" },
  { fieldName: "Service Dept.", value: "serviceDepartment" },
];

const Visit = ({ visitData }) => {
  console.log(visitData);
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
          {!visitData["vitals"] ? (
            <VitalsForm visitId={visitData["id"]} />
          ) : (
            <VitalsFormRO vitalsData={visitData["vitals"]} />
          )}
        </div>
        <div>
          {!visitData["evaluation"] ? (
            <EvaluationForm visitId={visitData["id"]} />
          ) : (
            <EvaluationFormRO evaluationData={visitData["evaluation"]} />
          )}
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
