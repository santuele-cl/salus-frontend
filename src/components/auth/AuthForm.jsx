import { PiUserFill, PiLockKeyFill } from "react-icons/pi";
import { Button, Label, TextInput } from "flowbite-react";
// import { toast } from "react-toastify";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../features/auth/authSlice";

const AuthForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const { accessToken } = await login(data).unwrap();
      dispatch(setAccessToken(accessToken));
      reset();
      navigate("/redirect");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-4 mx-auto "
    >
      {/* # USERNAME */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="usernameId" value="Username" />
        </div>
        <TextInput
          {...register("username")}
          id="usernameId"
          placeholder="Type your username here."
          icon={PiUserFill}
          required
        />
      </div>
      {/* # PASSWORD */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="passwordId" value="Password" />
        </div>
        <TextInput
          {...register("password")}
          id="passwordId"
          type="password"
          placeholder="Type your username here."
          icon={PiLockKeyFill}
          required
        />
      </div>

      <Button
        type="submit"
        // onClick={onToast}
      >
        Login
      </Button>
    </form>
  );
};
export default AuthForm;
