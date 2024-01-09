import { Button, Label, Modal, Select } from "flowbite-react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useAddLabOrderMutation } from "../../laborders/labordersApiSlice";
import { useGetLabProcedureCategoriesQuery } from "../../labProcCategories/labProcCategories";
import { useState } from "react";
import SpinnerFlexible from "../../../components/SpinnerFlexible";

const schema = yup.object().shape({
  labProcedureId: yup.string().required("Laboratory Procedure is required"),
});

const LabOrderForm = ({
  setShowLabOrderForm,
  showLabOrderForm,
  patientChartId,
}) => {
  const {
    data: categories,
    isFetching,
    isLoading,
    isSuccess,
  } = useGetLabProcedureCategoriesQuery();
  const [add] = useAddLabOrderMutation();

  const [activeCategory, setActiveCategory] = useState("hematology");

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onAddLabOrder = async (data) => {
    console.log("selected procedure", data);
    try {
      await add({
        labOrderData: { ...data },
        patientChartId,
      }).unwrap();
      reset();
      setShowLabOrderForm(false);
      toast.success("Laboratory data updated.");
    } catch (err) {
      toast.error(`${err?.data?.message}`);

      console.log(err);
    }
  };

  return (
    <Modal
      show={showLabOrderForm}
      onClose={() => {
        setShowLabOrderForm(false);
        reset();
      }}
    >
      <Modal.Header>Add Laboratory Order</Modal.Header>
      <Modal.Body>
        {(isFetching || isLoading) && <SpinnerFlexible />}
        {isSuccess && categories.length > 0 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="space-y-6"
          >
            <div className="">
              <div className="mb-2 block">
                <Label htmlFor="countries" value="Select category" />
              </div>
              <Select
                id="countries"
                required
                onChange={(e) => setActiveCategory(e.target.value)}
              >
                {categories.map(({ categoryName }) => (
                  <>
                    <option value={categoryName}>{categoryName}</option>
                  </>
                ))}
              </Select>
            </div>
            <div className="">
              <div className="mb-2 block">
                <Label htmlFor="countries" value="Select procedure" />
              </div>

              <Select id="countries" {...register("labProcedureId")}>
                {categories
                  .filter(
                    ({ categoryName }) => categoryName === activeCategory
                  )[0]
                  .labProcedure.map((proc) => {
                    return (
                      <>
                        <option value={proc["id"]}>
                          {proc["procedureName"]}
                        </option>
                      </>
                    );
                  })}

                {/* {categories.map(({ labProcedure }) => (
                  <>
                    <option value={labProcedure}>{labProcedure}</option>
                  </>
                ))} */}
              </Select>
            </div>
          </form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit(onAddLabOrder)}>Add</Button>
        <Button
          color="gray"
          onClick={() => {
            setShowLabOrderForm(false);
            reset();
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default LabOrderForm;
