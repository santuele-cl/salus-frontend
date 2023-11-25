import { Button, Modal } from "flowbite-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useAddNewUserMutation } from "../usersApiSlice";
import UserAddForm from "./UserAddForm";

const UserAddModal = ({ openAddUserModal, setOpenAddUserModal }) => {
  const [addNewUser] = useAddNewUserMutation();

  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(2, "Min. 2 char length"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Min. 8 characters"),
    password_confirmation: yup
      .string()
      .required("Password Confirmation is required")
      .oneOf([yup.ref("password"), null], "Passwords do not match."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({ username, password, roleId }) => {
    try {
      await addNewUser({ username, password, roleId }).unwrap();
    } catch (error) {
      toast.error(error?.data?.message);
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
            <UserAddForm register={register} errors={errors} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit(onSubmit)}>Create User</Button>
          <Button onClick={reset}>Reset Form</Button>
          <Button color="gray" onClick={() => setOpenAddUserModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default UserAddModal;
