import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useAddVitalsMutation } from "../../vitals/vitalsApiSlice";
import { useState } from "react";
import { PiPlusBold } from "react-icons/pi";

const schema = yup.object().shape({
  heightInCm: yup
    .number()
    .typeError("Height must be a number")
    .positive("Must be a positive number")
    .required("Height is required"),
  weightInKl: yup
    .number()
    .typeError("Weight must be a number")
    .positive("Weight must be a positive number")
    .required("Weight is required"),
  bpSystolic: yup
    .number()
    .typeError("BP Systolic must be a number")
    .positive("BP Systolic must be a positive number")
    .required("BP Systolic is required"),
  bpDiastolic: yup
    .number()
    .typeError("BP Diastolic must be a number")
    .positive("BP Diastolic must be a positive number")
    .required("BP Diastolic is required"),
  pulseRate: yup
    .number()
    .typeError("Pulse Rate  must be a number")
    .positive("Pulse Rate  must be a positive number")
    .required("Pulse Rate is required"),
  respiratoryRate: yup
    .number()
    .typeError("Respiratory Rate must be a number")
    .positive("Respiratory Rate must be a positive number")
    .required("Respiratory Rate is required"),
  bodyTempInCelsius: yup
    .number()
    .typeError("Body Temp. must be a number")
    .positive("Body Temp. must be a positive number")
    .required("Body Temp. is required"),
  oxygenSaturation: yup
    .number()
    .typeError("Oxygen Saturatio must be a number")
    .positive("Oxygen Saturatio must be a positive number")
    .required("Oxygen Saturation is required"),
});

const vitalsFields = [
  {
    fieldName: "Height",
    placeholder: "Unit in cm",
    id: "heightInCm",
  },
  { fieldName: "Weight", placeholder: "Unit in kg", id: "weightInKl" },
  { fieldName: "BP Systolic", placeholder: "", id: "bpSystolic" },
  { fieldName: "BP Diastolic", placeholder: "", id: "bpDiastolic" },
  { fieldName: "Pulse Rate", placeholder: "", id: "pulseRate" },
  { fieldName: "Respiratory Rate", placeholder: "", id: "respiratoryRate" },
  { fieldName: "Body Temp", placeholder: "", id: "bodyTempInCelsius" },
  { fieldName: "Oxygen Saturation", placeholder: "", id: "oxygenSaturation" },
];

const VitalsForm = ({ visitId }) => {
  const [showVitalsForm, setShowVitalsForm] = useState(false);
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
          <Modal.Header>
            <span className="ml-4 text-green-500 font-semibold uppercase">
              Vital Signs Form
            </span>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={(e) => e.preventDefault()} className="py-4">
              <div className="grid grid-cols-2 gap-4">
                {vitalsFields.map(({ fieldName, id, placeholder }) => {
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
