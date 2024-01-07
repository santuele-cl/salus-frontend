import { useAddEvaluationMutation } from "../../evaluation/evaluationApiSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  Button,
  Label,
  Modal,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useState } from "react";
import { PiPlusBold } from "react-icons/pi";

const schema = yup.object().shape({
  physicalExamination: yup
    .string()
    .required("Physical examination is required"),
  diagnosis: yup
    .string()
    .required("Diagnosis is required")
    .min(8, "Min. 6 characters"),
  doctorsNote: yup.string(),
});

const medSchema = yup.object().shape({
  drugName: yup.string().required("Drug Name is required"),
  strength: yup.string().required("Strength is required"),
  form: yup.string().required("Form is required"),
  dosage: yup
    .number()
    .typeError("Dosage must be a number")
    .positive("Dosage must be a positive number")
    .required("Dosage is required"),
  frequency: yup.string().required("Frequency is required"),
  duration: yup
    .number()
    .typeError("Duration must be a number")
    .positive("Duration must be a positive number")
    .required("Duration is required"),
  direction: yup.string().required("Direction is required"),
});

const evaluationFields = [
  {
    fieldName: "Physical Examination",
    placeholder: "",
    id: "physicalExamination",
  },
  { fieldName: "Diagnosis", placeholder: "", id: "diagnosis" },
  { fieldName: "Doctor's notes", placeholder: "", id: "doctorsNote" },
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

const formSelect = ["TABLET", "CAPSULE", "POWDER", "SYRUP", "DROPS", "CREAM"];

const EvaluationForm = ({ visitId }) => {
  const [showEvaluationForm, setShowEvaluationForm] = useState(false);
  const [showMedForm, setShowMedForm] = useState(false);

  const [addEvaluation] = useAddEvaluationMutation();
  const [meds, setMeds] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const {
    register: medRegister,
    handleSubmit: medHandleSubmit,
    formState: { errors: medErrors },
    reset: medReset,
  } = useForm({ resolver: yupResolver(medSchema) });
  console.log(medErrors);

  console.log(errors);
  const onSubmit = async (data) => {
    console.log("med eval data", data);
    try {
      await addEvaluation({
        visitId,
        evaluationData: {
          ...data,
        },
        medicationData: meds,
      }).unwrap();
      reset();
      toast.success("Evaluation successfully added.");
      setMeds([]);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const onMedSubmit = async (data) => {
    console.log("data", data);
    try {
      setMeds((prevMeds) => [...prevMeds, { ...data }]);
      medReset();
      setShowMedForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mb-2 flex flex-col gap-2">
        <div className="flex gap-2 items-center justify-between">
          <h2 className="font-semibold uppercase text-green-600">
            Medical Evaluation
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 ">
            <Button
              className="flex-grow"
              onClick={() => setShowEvaluationForm((prev) => !prev)}
            >
              <PiPlusBold />
            </Button>
          </div>
        </div>
        <hr />

        <Modal
          show={showEvaluationForm}
          size="5xl"
          onClose={() => {
            setShowEvaluationForm(false);
            reset();
            setMeds([]);
          }}
          popup
        >
          <Modal.Header>
            <span className="ml-4 text-green-500 font-semibold uppercase">
              Medical Evaluation Form
            </span>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={(e) => e.preventDefault()} className="p-4">
              <div className="grid grid-cols-1 gap-4">
                {evaluationFields.map(({ fieldName, id }) => {
                  return (
                    <div key={id} className="flex gap-4 items-center">
                      <Label htmlFor={id} value={fieldName} className="w-1/4" />
                      <div className="w-full">
                        <Textarea
                          id={id}
                          className="w-full"
                          {...register(`${id}`)}
                          helperText={errors[id] && <>{errors[id]?.message}</>}
                          color={errors[id] && "failure"}
                        />
                      </div>
                    </div>
                  );
                })}
                {/* MEDICATION FIELDS */}
                <div className="flex gap-4 items-start">
                  <div className="w-1/4 flex flex-col md:flex-row items-center gap-4 justify-between">
                    <Label htmlFor="asd" value="Medication" />
                    <Button
                      className="w-[40px]"
                      onClick={() => setShowMedForm((prev) => !prev)}
                    >
                      <PiPlusBold />
                    </Button>
                  </div>

                  <div className="w-full">
                    {meds && meds.length > 0 ? (
                      meds.map((medsData, i) => {
                        // const medsDataFields = Object.keys(medsData);
                        const medsDataFields = [
                          {
                            fieldName: "Drug Name",
                            id: "drugName",
                          },
                          { fieldName: "Strength", id: "strength" },
                          { fieldName: "Form", id: "form" },
                          { fieldName: "Dosage", id: "dosage" },
                          { fieldName: "Frequency", id: "frequency" },
                          { fieldName: "Duration", id: "duration" },
                          { fieldName: "Direction", id: "direction" },
                        ];
                        console.log(medsDataFields);
                        return (
                          <>
                            <div className="border border-blue-300 p-2 rounded-md mb-2">
                              <h2 className="font-semibold my-2">
                                <span className="bg-blue-300 p-2 rounded-md">
                                  Medication #{i + 1}
                                </span>
                              </h2>
                              <div
                                key={i}
                                className="grid grid-cols-1 md:grid-cols-3 items-center gap-2 "
                              >
                                {medsDataFields.map(({ fieldName, id }) => (
                                  <div key={id}>
                                    <Label
                                      value={fieldName}
                                      className="col-span-1"
                                    />
                                    <div className="col-span-3">
                                      <TextInput
                                        readOnly
                                        className="w-full"
                                        value={medsData[id]}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        );
                      })
                    ) : (
                      <p>No medication/s.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* BUTTONS */}
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
        <Modal
          show={showMedForm}
          size="3xl"
          onClose={() => {
            setShowMedForm(false);
            medReset();
          }}
          popup
        >
          <Modal.Header>
            <span className="ml-4 text-green-500 font-semibold uppercase">
              Medication Form
            </span>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                {medicationFields.map(({ fieldName, id }) => {
                  if (id === "form") {
                    return (
                      <div key={id} className="grid grid-cols-4 items-center">
                        <Label
                          htmlFor={id}
                          value={fieldName}
                          className="col-span-1"
                        />

                        <Select
                          id="form"
                          {...medRegister(`${id}`)}
                          className="col-span-3"
                        >
                          {formSelect.map((form) => (
                            <option key={form} value={form}>
                              {form}
                            </option>
                          ))}
                        </Select>
                      </div>
                    );
                  }
                  return (
                    <div key={id} className="grid grid-cols-4 items-center">
                      <Label
                        htmlFor={id}
                        value={fieldName}
                        className="col-span-1"
                      />
                      <div className="col-span-3">
                        <TextInput
                          id={id}
                          className="w-full"
                          {...medRegister(`${id}`)}
                          helperText={
                            medErrors[id] && <>{medErrors[id]?.message}</>
                          }
                          color={medErrors[id] && "failure"}
                        />
                      </div>
                    </div>
                  );
                })}
                <div className="flex gap-2 mt-2">
                  <Button
                    className="flex-grow"
                    onClick={medHandleSubmit(onMedSubmit)}
                  >
                    Add
                  </Button>
                  <Button
                    outline
                    color="failure"
                    className="flex-grow"
                    onClick={() => medReset()}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};
export default EvaluationForm;
