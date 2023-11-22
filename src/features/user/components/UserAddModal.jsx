import { Button, Modal } from "flowbite-react";
import { useAddNewUserMutation } from "../usersApiSlice";
import UserAddForm from "./UserAddForm";

const UserAddModal = ({ openAddUserModal, setOpenAddUserModal }) => {
  const [addNewUser] = useAddNewUserMutation();

  const onAddNewRole = async () => {
    try {
      await addNewUser({ roleName: role });
      setOpenAddUserModal(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Modal
        dismissible
        show={openAddUserModal}
        onClose={() => setOpenAddUserModal(false)}
      >
        <Modal.Header>
          New User Form
          <span className="block font-normal text-[16px]">
            Fill out the form below.
          </span>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <UserAddForm />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onAddNewRole}>Create User</Button>
          <Button color="gray" onClick={() => setOpenAddUserModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default UserAddModal;
