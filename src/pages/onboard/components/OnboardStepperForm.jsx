import OnboardStepperFormOne from "./OnboardFormOne";
import OnboardStepperFormTwo from "./OnboardFormTwo";
import OnboardStepperFormThree from "./OnboardFormThree";

const OnboardStepperForm = ({ currentStep }) => {
  let content;

  if (currentStep === 0) {
    content = <OnboardStepperFormOne />;
  } else if (currentStep === 1) {
    content = <OnboardStepperFormTwo />;
  } else {
    content = <OnboardStepperFormThree />;
  }

  return content;
};
export default OnboardStepperForm;
