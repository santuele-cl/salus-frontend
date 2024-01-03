import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useAddVitalsMutation } from "../../vitals/vitalsApiSlice";
import { useState } from "react";
import { PiPlusBold } from "react-icons/pi";

const schema = yup.object().shape({
  heightInCm: yup.number().positive().required("Height is required"),
  weightInKl: yup.number().positive().required("Weight is required"),
  bloodPressure: yup.string().required("Treatment is required"),
  pulseRate: yup.string().required("Treatment is required"),
  respiratoryRate: yup.string().required("Treatment is required"),
  bodyTemperatureInCelsius: yup
    .number()
    .positive()
    .required("Treatment is required"),
  oxygenSaturation: yup.string().required("Treatment is required"),
});

const evaluationFields = [
  {
    fieldName: "Height",
    placeholder: "Unit in cm",
    id: "heightInCm",
  },
  { fieldName: "Weight", placeholder: "Unit in kg", id: "weightInKl" },
  { fieldName: "Blood Pressure", placeholder: "", id: "bloodPressure" },
  { fieldName: "Pulse Rate", placeholder: "", id: "pulseRate" },
  { fieldName: "Respiratory Rate", placeholder: "", id: "respiratoryRate" },
  { fieldName: "Body Tempt", placeholder: "", id: "bodyTemperatureInCelsius" },
  { fieldName: "Oxygen Saturation", placeholder: "", id: "oxygenSaturation" },
];

const VitalsForm = ({ visitId }) => {
  const [showVitalsForm, setShowVitalsForm] = useState(false);
  console.log(visitId);
  const [addVitals] = useAddVitalsMutation({ id: visitId });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await addVitals({
        visitId,
        vitalsData: {
          ...data,
        },
      }).unwrap();
      reset();
      toast.success("Vitals successfully added.");
      setShowVitalsForm(false);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div>
      <div className="mb-2 flex flex-col gap-2">
        <hr />
        <div className="flex gap-2 items-center justify-between">
          <h2 className="font-semibold uppercase text-green-600">
            Vital Signs
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 ">
            <Button
              className="flex-grow"
              onClick={() => setShowVitalsForm((prev) => !prev)}
            >
              <PiPlusBold />
            </Button>
          </div>
        </div>
        <hr />

        <Modal
          show={showVitalsForm}
          size="5xl"
          onClose={() => setShowVitalsForm(false)}
          popup
        >
          <Modal.Header>Vital Signs Form</Modal.Header>
          <Modal.Body>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                {evaluationFields.map(({ fieldName, id, placeholder }) => {
                  return (
                    <div key={id} className="flex gap-4 items-center">
                      <Label htmlFor={id} value={fieldName} className="w-1/4" />
                      <div className="w-full">
                        <TextInput
                          id={id}
                          className="w-full"
                          placeholder={placeholder}
                          {...register(`${id}`)}
                          helperText={errors[id] && <>{errors[id]?.message}</>}
                          color={errors[id] && "failure"}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-2 mt-2">
                <Button className="flex-grow" onClick={handleSubmit(onSubmit)}>
                  Add
                </Button>
                <Button
                  outline
                  color="failure"
                  className="flex-grow"
                  onClick={() => reset()}
                >
                  Clear
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};
export default VitalsForm;
