import { Spinner as Spin } from "flowbite-react";
const SpinnerWhole = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Spin aria-label="Extra large spinner example" size="xl" />
    </div>
  );
};

export default SpinnerWhole;
