import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useLazyGetPatientByIdQuery } from "./patientApiSlice";
import SpinnerFlexible from "../../components/SpinnerFlexible";
import ErrorFlexible from "../../components/ErrorFlexible";
import PatientProfile from "./components/PatientProfile";
import PatientChart from "./components/PatientChart";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import VisitForm from "../visit/VisitForm";

const PatientTest = () => {
  const [patientId, setPatientId] = useState("");

  const [
    trigger,
    { data: patient, isSuccess, isLoading, isFetching, isError, error },
  ] = useLazyGetPatientByIdQuery();

  const onPatientSearch = async () => {
    if (patientId) {
      try {
        await trigger({ id: patientId }).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8 p-4">
        <div className=" w-full md:w-2/6 flex flex-col gap-4">
          <div className="flex gap-2 rounded-md border-2 border-gray-400 p-2">
            <TextInput
              className="flex-grow"
              id="patientId"
              value={patientId}
              placeholder="Patient ID..."
              onChange={(e) => setPatientId(e.target.value)}
            />
            <Button onClick={onPatientSearch}>Find Patient</Button>
          </div>
          <div className="rounded-md border-2 border-gray-400">
            <h2 className="text-center">Profile</h2>
            {(isFetching || isLoading) && <SpinnerFlexible />}
            {isError && <ErrorFlexible err={error} />}
            {isSuccess && patient && (
              <PatientProfile data={patient["patientProfile"]} />
            )}
          </div>
        </div>
        <div className=" w-full md:w-4/6">
          <div className="flex gap-2 mb-2">
            <div className="bg-green-500 py-2 px-4 rounded-md  w-[90%]">
              <h2 className="text-center text-gray-200 font-semibold uppercase tracking-widest">
                VISITS
              </h2>
            </div>
            <Button className="w-[10%]">
              <PiPencilSimpleLineFill size={20} />
            </Button>
          </div>

          {(isFetching || isLoading) && <SpinnerFlexible />}
          {isError && <ErrorFlexible err={error} />}
          {isSuccess && patient && (
            <>
              <VisitForm patientChartId={patient["patientChart"]["id"]} />

              <PatientChart patientChartId={patient["patientChart"]["id"]} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default PatientTest;
