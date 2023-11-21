import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { PiLockKeyOpenFill } from "react-icons/pi";
import { useDeleteRoleMutation } from "../roleApiSlice";

const RoleDeleteModal = ({
  openDeleteModal,
  setOpenDeleteModal,
  roleId,
  setDeleteId,
}) => {
  const [deleteRole] = useDeleteRoleMutation();

  const onDeleteConfirm = async () => {
    try {
      await deleteRole({ roleId });
      setOpenDeleteModal(false);
      setDeleteId(null);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      show={openDeleteModal}
      size="md"
      onClose={() => setOpenDeleteModal(false)}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <PiLockKeyOpenFill className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this role?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={onDeleteConfirm}>
              {"Yes, I'm sure"}
            </Button>
            <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default RoleDeleteModal;
