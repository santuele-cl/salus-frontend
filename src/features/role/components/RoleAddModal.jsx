import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useAddNewRoleMutation } from "../roleApiSlice";
import { useState } from "react";

const RoleAddModal = ({ openAddModal, setOpenAddModal }) => {
  const [addNewRole] = useAddNewRoleMutation();
  const [role, setRole] = useState("");

  const onAddNewRole = async () => {
    try {
      await addNewRole({ roleName: role });
      setOpenAddModal(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Modal
        dismissible
        show={openAddModal}
        onClose={() => setOpenAddModal(false)}
      >
        <Modal.Header>
          New Role{" "}
          <span className="block font-normal text-[16px]">
            Input the name of the role below.
          </span>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="">
              <div className="mb-2 block">
                <Label htmlFor="roleName" value="Role Name" />
              </div>
              <TextInput
                id="roleName"
                onChange={(e) => setRole(e.target.value)}
                addon="🔒"
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onAddNewRole}>Add</Button>
          <Button color="gray" onClick={() => setOpenAddModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default RoleAddModal;
