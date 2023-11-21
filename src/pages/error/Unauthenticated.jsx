import { Link } from "react-router-dom";

const Unauthenticated = () => {
  return (
    <div className="p-8">
      Please login to continue. Click{" "}
      <Link to="/login" replace className="text-blue-500 font-bold">
        here
      </Link>{" "}
      to go to login page.
    </div>
  );
};

export default Unauthenticated;
