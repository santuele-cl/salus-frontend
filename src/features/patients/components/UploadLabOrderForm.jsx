import { Button, Card, Label, Modal, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useUpdateLabOrderMutation } from "../../laborders/labordersApiSlice";

const schema = yup.object().shape({
  result: yup.string().required("Result is required"),
});

const UploadLabOrderForm = ({
  openModal,
  setOpenModal,
  updateLabOrderId,
  setUpdateLabOrderId,
}) => {
  const [update] = useUpdateLabOrderMutation();

  const { register, handleSubmit, reset, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const onUpdate = async (data) => {
    try {
      await update({
        updatedLabOrderData: { ...data },
        labOrderId: updateLabOrderId,
      }).unwrap();
      reset();
      setUpdateLabOrderId("");
      setOpenModal(false);
      toast.success("Laboratory data updated.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      show={openModal}
      onClose={() => {
        setOpenModal(false);
        reset();
        setUpdateLabOrderId("");
      }}
    >
      <Modal.Header>Upload Laboratory Result</Modal.Header>
      <Modal.Body>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="space-y-6"
        >
          <div className="">
            <div className="mb-2 block">
              <Label htmlFor="resultImg" value="Lab Result" />
            </div>
            <TextInput
              id="resultImg"
              {...register("result")}
              placeholder="Paste result link here..."
              addon="📸"
              required
            />
          </div>
          <div>
            <Card className="" imgSrc={`${watch("result")}`}>
              {!watch("result") && "Empty"}
            </Card>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit(onUpdate)}>Upload</Button>
        <Button
          color="gray"
          onClick={() => {
            setOpenModal(false);
            reset();
            setUpdateLabOrderId("");
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default UploadLabOrderForm;
