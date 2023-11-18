import { PiUserFill, PiLockKeyFill } from "react-icons/pi";
import { Button, Label, TextInput } from "flowbite-react";
import { toast } from "react-toastify";

const AuthForm = () => {
  return (
    <form className="flex max-w-md flex-col gap-4 mx-auto ">
      {/* # USERNAME */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Username" />
        </div>
        <TextInput
          id="email1"
          type="email"
          placeholder="example@email.com"
          icon={PiUserFill}
          required
        />
      </div>
      {/* # PASSWORD */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Password" />
        </div>
        <TextInput
          id="password1"
          type="password"
          placeholder="********"
          icon={PiLockKeyFill}
          required
        />
      </div>

      <Button type="submit" onClick={() => toast.success("Login btn clicked!")}>
        Login
      </Button>
    </form>
  );
};
export default AuthForm;
