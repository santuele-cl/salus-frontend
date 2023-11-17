import { Button } from "flowbite-react";
import { toast } from "react-toastify";

const Header = () => {
  return (
    <div className="max-w-screen-lg mx-auto">
      <Button onClick={() => toast.success("Toast toast successfully!")}>
        Toast
      </Button>
    </div>
  );
};
export default Header;
