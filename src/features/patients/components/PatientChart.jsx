import PatientVisits from "./PatientVisits";

const PatientChart = ({ patientChartId }) => {
  return (
    <div>
      <PatientVisits patientChartId={patientChartId} />
    </div>
  );
};
export default PatientChart;
