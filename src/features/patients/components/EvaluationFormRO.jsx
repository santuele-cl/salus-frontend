import { Label, TextInput } from "flowbite-react";
import { PiCaretDownFill } from "react-icons/pi";
import { useState } from "react";

const EvaluationFormRO = ({ evaluationData }) => {
  const evaluationFields = Object.keys(evaluationData);

  const [setshowVitals, setSetshowVitals] = useState(false);

  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mb-2 flex flex-col gap-2"
      >
        <hr />

        <div
          className="flex gap-2 items-center justify-between cursor-pointer"
          onClick={() => setSetshowVitals((prev) => !prev)}
        >
          <h2 className="font-semibold uppercase text-green-600">
            Medical Evaluation
          </h2>
          <PiCaretDownFill />
        </div>
        <hr />

        {setshowVitals &&
          evaluationFields.map((field) => {
            return (
              <div key={field} className="flex gap-4 items-center">
                <Label htmlFor={field} value={field} className="w-1/4" />
                <div className="w-full">
                  <TextInput
                    readOnly
                    id={field}
                    value={evaluationData[field]}
                    className="w-full"
                  />
                </div>
              </div>
            );
          })}
      </form>
    </div>
  );
};
export default EvaluationFormRO;
