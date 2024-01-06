import { TextInput, Label, Textarea } from "flowbite-react";
import EvaluationForm from "./EvaluationForm";
import VitalsForm from "./VitalsForm";
import EvaluationFormRO from "./EvaluationFormRO";
import VitalsFormRO from "./VitalsFormRO";
import { useState } from "react";
import { PiCaretDownFill } from "react-icons/pi";
import { format, parseISO } from "date-fns";
import useGetUserData from "../../../hooks/useGetUserData";

const visitFields2 = [
  { fieldName: "Chief Complaint", value: "chiefComplaint" },
  { fieldName: "HPI", value: "hpi" },
  { fieldName: "Accompanied By", value: "accompaniedBy" },
  // { fieldName: "Date of Visit", value: "createdAt" },
  { fieldName: "Service Dept.", value: "serviceDepartment" },
];

const Visit = ({ visitData }) => {
  const { roles } = useGetUserData();
  const [showVisitInfo, setShowVisitInfo] = useState(false);
  const [showVisitInfo2, setShowVisitInfo2] = useState(false);
  console.log("visitData", visitData);
  return (
    <div>
      <div className="rounded-md border border-gray-400 p-4 flex flex-col gap-2">
        <div className="flex gap-2 items-center justify-between">
          <h2 className="bg-green-400 py-2 px-4 rounded-md">
            {visitData["id"]}
          </h2>
          <div className="flex gap-4 items-center">
            <p>
              Date: {format(parseISO(visitData["createdAt"]), "MMM dd, yyyy")}
            </p>
            <div className="p-2">
              <PiCaretDownFill
                onClick={() => setShowVisitInfo((prev) => !prev)}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>

        {showVisitInfo && (
          <>
            {visitFields2.map(({ fieldName, value }) => {
              return (
                <div key={value} className="flex gap-4 items-center">
                  <Label htmlFor={value} value={fieldName} className="w-1/4" />
                  {value === "hpi" ? (
                    <Textarea
                      readOnly
                      id={value}
                      value={
                        value === "serviceDepartment"
                          ? visitData["serviceDepartment"]["serviceDeptName"]
                          : value === "createdAt"
                          ? format(
                              parseISO(visitData["createdAt"]),
                              "MMM dd, yyyy"
                            )
                          : visitData[value]
                      }
                      className="w-full"
                    />
                  ) : (
                    <TextInput
                      readOnly
                      id={value}
                      value={
                        value === "serviceDepartment"
                          ? visitData["serviceDepartment"]["serviceDeptName"]
                          : value === "createdAt"
                          ? format(
                              parseISO(visitData["createdAt"]),
                              "MMM dd, yyyy"
                            )
                          : visitData[value]
                      }
                      className="w-full"
                    />
                  )}
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
            {
              <div>
                {!visitData["evaluation"] ? (
                  roles === "PHYSICIAN" && (
                    <EvaluationForm visitId={visitData["id"]} />
                  )
                ) : (
                  <EvaluationFormRO evaluationData={visitData["evaluation"]} />
                )}
              </div>
            }
          </>
        )}
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
