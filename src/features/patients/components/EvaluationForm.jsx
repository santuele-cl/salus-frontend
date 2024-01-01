import { useAddEvaluationMutation } from "../../evaluation/evaluationApiSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Button, Label, TextInput } from "flowbite-react";

const schema = yup.object().shape({
  physicalExamination: yup
    .string()
    .required("Physical examination is required"),
  diagnosis: yup
    .string()
    .required("Diagnosis is required")
    .min(8, "Min. 6 characters"),
  treatment: yup.string().required("Treatment is required"),
  prescription: yup
    .string()
    .required("Prescription is required.")
    .min(2, "Min. 6 char length"),
});

const evaluationFields = [
  {
    fieldName: "Physical Examination",
    placeholder: "",
    id: "physicalExamination",
  },
  { fieldName: "Diagnosis", placeholder: "", id: "diagnosis" },
  { fieldName: "Treatment", placeholder: "", id: "treatment" },
  { fieldName: "Precription", placeholder: "", id: "prescription" },
];

const EvaluationForm = ({ visitId }) => {
  const [addEvaluation] = useAddEvaluationMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({
    physicalExamination,
    diagnosis,
    treatment,
    prescription,
  }) => {
    try {
      await addEvaluation({
        visitId,
        evaluationData: {
          physicalExamination,
          diagnosis,
          treatment,
          prescription,
        },
      }).unwrap();
      reset();
      toast.success("Evaluation successfully added.");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mb-2 flex flex-col gap-2"
      >
        <div className="flex gap-2 items-center justify-between">
          <h2 className="font-semibold uppercase text-green-600">
            Medical Evaluation
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 ">
            <Button className="flex-grow" onClick={handleSubmit(onSubmit)}>
              Add
            </Button>
            <Button
              outline
              color="failure"
              className="flex-grow"
              onClick={reset}
            >
              Clear
            </Button>
          </div>
        </div>
        <hr />

        {evaluationFields.map(({ fieldName, id }) => {
          return (
            <div key={id} className="flex gap-4 items-center">
              <Label htmlFor={id} value={fieldName} className="w-1/4" />
              <div className="w-full">
                <TextInput
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
      </form>
    </div>
  );
};
export default EvaluationForm;
