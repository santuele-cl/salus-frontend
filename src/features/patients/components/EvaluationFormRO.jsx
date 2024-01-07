import { Label, TextInput, Textarea } from "flowbite-react";
import { PiCaretDownFill } from "react-icons/pi";
import { useState } from "react";

const evalFormROFields = [
  { fieldName: "Physical Exam", id: "physicalExamination" },
  { fieldName: "Diagnosis", id: "diagnosis" },
  { fieldName: "Doctor's  Note", id: "doctorsNote" },
];
const medicationFields = [
  {
    fieldName: "Drug Name",
    placeholder: "",
    id: "drugName",
  },
  { fieldName: "Strength", placeholder: "", id: "strength" },
  { fieldName: "Form", placeholder: "", id: "form" },
  { fieldName: "Dosage", placeholder: "", id: "dosage" },
  { fieldName: "Frequency", placeholder: "", id: "frequency" },
  { fieldName: "Duration", placeholder: "", id: "duration" },
  { fieldName: "Direction", placeholder: "", id: "direction" },
];
const EvaluationFormRO = ({ evaluationData }) => {
  const [setshowVitals, setSetshowVitals] = useState(true);
  console.log("evaluationData", evaluationData);
  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mb-2 flex flex-col gap-2"
      >
        <hr />

        <div
          className="flex gap-2 items-center justify-between cursor-pointer bg-green-500 text-white p-2 rounded-sm"
          onClick={() => setSetshowVitals((prev) => !prev)}
        >
          <h2 className="font-semibold uppercase ">Medical Evaluation</h2>
          <PiCaretDownFill />
        </div>
        <hr />
        {setshowVitals && (
          <div className="grid grid-cols-1 gap-2 px-4">
            {evalFormROFields.map(({ fieldName, id }) => {
              return (
                <div key={id} className="flex gap-4 items-center">
                  <Label
                    htmlFor={id}
                    value={fieldName}
                    className="font-semibold w-1/4"
                  />
                  <div className="w-full">
                    <Textarea
                      readOnly
                      id={id}
                      value={evaluationData[id]}
                      className="w-full resize-none"
                    />
                  </div>
                </div>
              );
            })}
            <div className="flex gap-4 items-center">
              <Label
                htmlFor="medications"
                value="Medications"
                className="font-semibold w-1/4"
              />
              <div className="border border-blue-300 p-2 w-full grid grid-cols-1 gap-4">
                {evaluationData["medication"] ? (
                  evaluationData["medication"].map((med, i) => (
                    <>
                      <h2 className="font-semibold my-2">
                        <span className="bg-blue-300 p-2 rounded-md">
                          Medication #{i + 1}
                        </span>
                      </h2>
                      <div
                        key={med["drugName"]}
                        className="grid grid-cols-1 md:grid-cols-2 gap-2"
                      >
                        {medicationFields.map(({ fieldName, id }) => {
                          return (
                            <div
                              key={id}
                              className="grid grid-cols-4 items-center"
                            >
                              <Label
                                htmlFor={id}
                                value={fieldName}
                                className="font-semibold col-span-1"
                              />
                              <div className="col-span-3">
                                <TextInput
                                  readOnly
                                  id={id}
                                  className="w-full"
                                  value={med[id]}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ))
                ) : (
                  <p>No medication data</p>
                )}
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <Label
                htmlFor="physician"
                value="Physician"
                className="font-bold w-1/4"
              />
              <div className="w-full">
                <TextInput
                  readOnly
                  id="physician"
                  value={`${evaluationData["physician"]["userProfile"]["fname"]} ${evaluationData["physician"]["userProfile"]["lname"]}, MD  `}
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <Label
                htmlFor="physicianContacts"
                value="Physician Contacts"
                className="font-bold w-1/4"
              />
              <div className="w-full">
                <TextInput
                  readOnly
                  id="physicianContacts"
                  value={`📞 ${evaluationData["physician"]["userProfile"]["contactNumber"]}    📧 ${evaluationData["physician"]["userProfile"]["email"]}`}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
export default EvaluationFormRO;
