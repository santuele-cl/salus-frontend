import { useState } from "react";
import OnboardStepperHeader from "./components/OnboardStepperHeader";
import OnboardStepperForm from "./components/OnboardStepperForm";

const stepsHeader = ["Personal Info", "Account Info", "Confirmation"];

const Onboard = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const onNextStep = () => {
    if (currentStep < stepsHeader.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };
  const onBackStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  return (
    <div>
      <OnboardStepperHeader
        stepsHeader={stepsHeader}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <OnboardStepperForm
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <button onClick={onBackStep}>Back</button>
      <button onClick={onNextStep}>Next</button>
    </div>
  );
};
export default Onboard;
