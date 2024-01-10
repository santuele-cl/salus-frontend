import { Button, Modal, Table, TextInput, Tooltip } from "flowbite-react";
import { useState } from "react";
import { useLazyGetPatientByIdQuery } from "./patientApiSlice";
import SpinnerFlexible from "../../components/SpinnerFlexible";
import ErrorFlexible from "../../components/ErrorFlexible";
import PatientProfile from "./components/PatientProfile";
import PatientChart from "./components/PatientChart";
import {
  PiArrowCounterClockwiseBold,
  PiMagnifyingGlassBold,
  PiPencilSimpleLineFill,
  PiPlusBold,
} from "react-icons/pi";
import VisitForm from "../visit/VisitForm";
import PatientForm from "./components/PatientForm";
import PatientPageNav from "./components/PatientPageNav";
import LabOrderTable from "./components/LabOrderTable";
import LabOrderForm from "./components/LabOrderForm";
import useGetUserData from "../../hooks/useGetUserData";

const PatientTest = () => {
  const { roles } = useGetUserData();

  const [patientId, setPatientId] = useState("");
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [showLabOrderForm, setShowLabOrderForm] = useState(false);

  const [
    trigger,
    { data: patient, isSuccess, isLoading, isFetching, isError, error },
  ] = useLazyGetPatientByIdQuery();
  console.log(patient);
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
    <div className="bg-gray-300 min-h-[100vh]">
      <PatientPageNav />
      <div className="max-w-screen-2xl mx-auto ">
        <div className="flex flex-col md:flex-row gap-8 p-4 min-h-[90vh] ">
          {/* PROFILE */}
          <div className="rounded-md  w-full md:w-2/6 flex flex-col gap-4 bg-white p-2">
            <div className="flex items-center gap-2 rounded-md  bg-green-500  p-2">
              <TextInput
                className="flex-grow"
                id="patientId"
                value={patientId}
                placeholder="Patient ID..."
                onChange={(e) => setPatientId(e.target.value)}
              />
              <Tooltip content="Find patient">
                <Button onClick={onPatientSearch}>
                  <PiMagnifyingGlassBold />
                </Button>
              </Tooltip>
              <Tooltip content="New Patient">
                <Button onClick={() => setShowPatientForm((prev) => !prev)}>
                  <PiPlusBold />
                </Button>
              </Tooltip>
            </div>
            <div className="rounded-md border border-gray-400">
              <div className="bg-green-500 py-2 px-4 ">
                <h2 className="text-center text-gray-200 font-semibold uppercase tracking-widest">
                  Profile
                </h2>
              </div>
              {(isFetching || isLoading) && <SpinnerFlexible />}
              {isError && <ErrorFlexible err={error} />}
              {isSuccess && patient && (
                <PatientProfile patientProfile={patient["patientProfile"]} />
              )}
            </div>
          </div>

          {/* VISITS */}
          <div className="rounded-md  w-full md:w-4/6 bg-white p-2 min-h-[90vh]">
            <div className="flex gap-2 mb-2 items-center">
              <div className="bg-green-500 py-2 px-4 rounded-md  w-[90%]">
                <h2 className="text-center text-gray-200 font-semibold uppercase tracking-widest">
                  VISITS
                </h2>
              </div>
              <Button
                className="w-[10%]"
                onClick={() => setShowVisitForm((prev) => !prev)}
              >
                <PiPencilSimpleLineFill size={20} />
              </Button>
            </div>
            <div className="max-h-[83vh] overflow-y-scroll">
              {(isFetching || isLoading) && <SpinnerFlexible />}
              {isError && <ErrorFlexible err={error} />}
              {isSuccess && patient && (
                <>
                  <Modal
                    show={showVisitForm}
                    size="5xl"
                    onClose={() => setShowVisitForm(false)}
                    popup
                  >
                    <Modal.Header>Patient Visit Form</Modal.Header>
                    <Modal.Body>
                      {/* <div className="space-y-6"> */}
                      <VisitForm
                        patientChartId={patient["patientChart"]["id"]}
                        setShowVisitForm={setShowVisitForm}
                      />
                      {/* </div> */}
                    </Modal.Body>
                  </Modal>
                  <PatientChart
                    patientChartId={patient["patientChart"]["id"]}
                  />
                </>
              )}
            </div>
            <div className="mt-4">
              <div className="bg-green-500 py-3 px-4 rounded-md items-center">
                <div className="flex items-center justify-between">
                  <h2 className="text-center text-gray-200 font-semibold uppercase tracking-widest">
                    Laboratory Orders
                  </h2>
                  {isSuccess && patient && (
                    <Button
                      color="gray"
                      onClick={() => setShowLabOrderForm((prev) => !prev)}
                      disabled={!roles || !roles === "PHYSICIAN"}
                    >
                      <PiPlusBold />
                    </Button>
                  )}
                </div>
              </div>
              <div className="w-full overflow-scroll">
                {(isFetching || isLoading) && <SpinnerFlexible />}
                {isError && <ErrorFlexible err={error} />}
                {isSuccess && patient && (
                  <LabOrderTable
                    patientChartId={
                      patient && isSuccess ? patient["patientChart"]["id"] : "0"
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSuccess && patient && (
        <LabOrderForm
          setShowLabOrderForm={setShowLabOrderForm}
          showLabOrderForm={showLabOrderForm}
          patientChartId={
            patient && isSuccess ? patient["patientChart"]["id"] : "0"
          }
        />
      )}
      <Modal
        show={showPatientForm}
        size="5xl"
        onClose={() => setShowPatientForm(false)}
        popup
      >
        <Modal.Header>New Patient Form</Modal.Header>
        <Modal.Body>
          {/* <div className="space-y-6"> */}
          <PatientForm setShowPatientForm={setShowPatientForm} />
          {/* </div> */}
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default PatientTest;
