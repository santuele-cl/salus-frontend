import { PiCaretDoubleRightBold } from "react-icons/pi";

const OnboardStepperHeader = ({ stepsHeader, currentStep, setCurrentStep }) => {
  return (
    <div>
      <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
        {stepsHeader.map((stepHeader, i) => (
          <li
            key={i}
            className={`flex items-center gap-2 cursor-pointer ${
              currentStep === i && "text-blue-600 dark:text-blue-500"
            }`}
            onClick={() => setCurrentStep(i)}
          >
            <span
              className={`flex items-center justify-center w-5 h-5 text-xs border rounded-full shrink-0 ${
                currentStep === i && "border-blue-600 dark:border-blue-500"
              }`}
            >
              {i + 1}
            </span>
            <span>{stepHeader}</span>
            {i !== stepsHeader.length - 1 && <PiCaretDoubleRightBold />}
          </li>
        ))}
      </ol>
    </div>
  );
};
export default OnboardStepperHeader;
