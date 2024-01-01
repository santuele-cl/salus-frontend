import ErrorFlexible from "../../../components/ErrorFlexible";
import SpinnerFlexible from "../../../components/SpinnerFlexible";
import VisitForm from "../../visit/VisitForm";
import { useGetVisitsByPatientChartIdQuery } from "../../visit/visitApiSlice";
import Visit from "./Visit";

const PatientVisits = ({ patientChartId }) => {
  const {
    data: visits,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetVisitsByPatientChartIdQuery(patientChartId);

  console.log("id", patientChartId, visits);

  return (
    <div>
      {(isFetching || isLoading) && <SpinnerFlexible />}
      {isError && <ErrorFlexible err={error} />}
      {isSuccess && visits && (
        <Visit visitData={visits[0]} key={visits[0]["id"]} />
      )}
      {/* {isSuccess &&
        visits &&
        visits.map((visit, i) => <Visit visitData={visit} key={i} />)} */}
    </div>
  );
};
export default PatientVisits;
