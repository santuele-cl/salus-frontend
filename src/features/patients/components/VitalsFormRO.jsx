import { Label, TextInput, Tooltip } from "flowbite-react";
import { useState } from "react";
import { PiCaretDownFill, PiWarningFill } from "react-icons/pi";

const vitalsFormROFields = [
  { fieldName: "Height", id: "heightInCm" },
  { fieldName: "Weight", id: "weightInKl" },
  { fieldName: "Body Temp.", id: "bodyTempInCelsius", min: 35, max: 37 },
  { fieldName: "BP Systolic", id: "bpSystolic", min: 90, max: 120 },
  { fieldName: "BP Diastolic", id: "bpDiastolic", min: 60, max: 80 },
  { fieldName: "Oxygen Saturation", id: "oxygenSaturation", min: 95, max: 100 },
  { fieldName: "Pulse Rate", id: "pulseRate", min: 60, max: 100 },
  { fieldName: "Respiratory Rate", id: "respiratoryRate", min: 12, max: 18 },
];

const VitalsFormRO = ({ vitalsData }) => {
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
          <h2 className="font-semibold uppercase ">Vitals</h2>
          <PiCaretDownFill />
        </div>
        <hr />
        {setshowVitals && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-4">
              {vitalsFormROFields.map(({ fieldName, id, min, max }) => {
                return (
                  <div key={id} className="flex gap-4 items-center">
                    <Label htmlFor={id} value={fieldName} className="w-1/4" />
                    <div className="w-full flex items-center gap-2">
                      <TextInput
                        readOnly
                        id={id}
                        value={vitalsData[id]}
                        className="w-full"
                      />
                      {(vitalsData[id] < min || vitalsData[id] > max) && (
                        <Tooltip content="This is below or above normal">
                          <PiWarningFill color="red" />
                        </Tooltip>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="px-4 grid grid-cols-1 gap-2">
              <div className="flex gap-4 items-center">
                <Label htmlFor="nurse" value="Nurse" className="w-1/4" />
                <div className="w-full">
                  <TextInput
                    readOnly
                    id="nurse"
                    value={`${vitalsData["nurse"]["userProfile"]["fname"]} ${vitalsData["nurse"]["userProfile"]["lname"]}, MD  `}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <Label
                  htmlFor="nurseContacts"
                  value="Nurse Contacts"
                  className="w-1/4"
                />
                <div className="w-full">
                  <TextInput
                    readOnly
                    id="nurseContacts"
                    value={`📞 ${vitalsData["nurse"]["userProfile"]["contactNumber"]}    📧 ${vitalsData["nurse"]["userProfile"]["email"]}`}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
};
export default VitalsFormRO;
