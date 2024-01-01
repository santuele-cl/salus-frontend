import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useAddVisitMutation } from "./visitApiSlice";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  accompaniedBy: yup.string(),
  chiefComplaint: yup
    .string()
    .required("Chief complaint is required")
    .min(8, "Min. 8 characters"),
  hpi: yup.string().required("HPI is required"),
  serviceDepartmentId: yup
    .string()
    .required("Service department is required.")
    .min(2, "Min. 2 char length"),
});

const visitFormFields = [
  { fieldName: "Chief Complaint", placeholder: "", id: "chiefComplaint" },
  { fieldName: "HPI", placeholder: "", id: "hpi" },
  { fieldName: "Accompanied by", placeholder: "", id: "accompaniedBy" },
];

const serviceDept = [
  { id: "SD1003", name: "Outpatient Department" },
  { id: "SD1001", name: "Emergency Department" },
  { id: "SD1002", name: "Admitting Section" },
];

const VisitForm = ({ patientChartId }) => {
  const [addNewVisit] = useAddVisitMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({
    accompaniedBy,
    chiefComplaint,
    hpi,
    serviceDepartmentId,
  }) => {
    try {
      await addNewVisit({
        patientChartId: patientChartId,
        visitData: {
          chiefComplaint,
          hpi,
          serviceDepartmentId,
          ...(accompaniedBy && { accompaniedBy }),
        },
      }).unwrap();
      reset();
      toast.success("Visit successfully added.");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <div>
      <div className="rounded-md border border-gray-400 p-4 mb-2">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mb-2 flex flex-col gap-2"
        >
          <div className="flex gap-2 items-center justify-between">
            <h2 className="font-semibold uppercase text-green-600">
              New Visit
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
          <div className="flex gap-4 items-center">
            <Label
              htmlFor="serviceDept"
              value="Service Department"
              className="w-1/4"
            />
            <Select
              id="serviceDept"
              {...register("serviceDepartmentId")}
              className="w-full"
            >
              {serviceDept.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Select>
          </div>
          {visitFormFields.map(({ fieldName, id }) => {
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
    </div>
  );
};
export default VisitForm;
