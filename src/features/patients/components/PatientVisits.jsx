import {
  PiArrowCounterClockwiseBold,
  PiMagnifyingGlassBold,
  PiPencilSimpleLineFill,
} from "react-icons/pi";
import ErrorFlexible from "../../../components/ErrorFlexible";
import SpinnerFlexible from "../../../components/SpinnerFlexible";
import { useGetVisitsByPatientChartIdQuery } from "../../visit/visitApiSlice";
import Visit from "./Visit";
import { Button, Label, TextInput } from "flowbite-react";

const PatientVisits = ({ patientChartId }) => {
  const {
    data: visits,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    error,
    refetch,
  } = useGetVisitsByPatientChartIdQuery(patientChartId);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4 justify-between">
        <div className="flex-grow flex gap-2">
          <TextInput
            id="visitId"
            icon={PiMagnifyingGlassBold}
            placeholder="Visit ID"
          />
          <Button className="w-[10%]">Search</Button>
        </div>
        <Button className="w-[10%]" onClick={refetch}>
          <PiArrowCounterClockwiseBold size={20} />
        </Button>
      </div>

      {(isFetching || isLoading) && <SpinnerFlexible />}
      {isError && <ErrorFlexible err={error} />}
      {/* {isSuccess && visits && (
        <Visit visitData={visits[0]} key={visits[0]["id"]} />
      )} */}
      {isSuccess &&
        visits &&
        visits.map((visit, i) => (
          <Visit visitData={visit} key={i} refetch={refetch} />
        ))}
    </div>
  );
};
export default PatientVisits;
