import { Label, TextInput, Textarea } from "flowbite-react";
import { PiCaretDownFill } from "react-icons/pi";
import { useState } from "react";

const evalFormROFields = [
  { fieldName: "Physical Exam", id: "physicalExamination" },
  { fieldName: "Diagnosis", id: "diagnosis" },
  { fieldName: "Treatment", id: "treatment" },
  { fieldName: "Prescription", id: "prescription" },
];

const EvaluationFormRO = ({ evaluationData }) => {
  const [setshowVitals, setSetshowVitals] = useState(true);

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
                  <Label htmlFor={id} value={fieldName} className="w-1/4" />
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
              <Label htmlFor="physician" value="Physician" className="w-1/4" />
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
                className="w-1/4"
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
