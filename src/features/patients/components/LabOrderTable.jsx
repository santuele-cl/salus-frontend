import { Button, Modal, Table } from "flowbite-react";
import { useState } from "react";
import UploadLabOrderForm from "./UploadLabOrderForm";
import { useGetLabOrdersByPatientChartIdQuery } from "../../laborders/labordersApiSlice";

const laborderTableHeaders = [
  { name: "ID", id: "id" },
  { name: "Procedure", id: "LabProcedure" },
  { name: "Requesting Physician", id: "requestingPhysician" },
  { name: "Result", id: "result" },
  //   { name: "Upload date", id: "date" },
];

const LabOrderTable = ({ patientChartId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [updateLabOrderId, setUpdateLabOrderId] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [activePrev, setActivePrev] = useState("");

  const { data: laborders } =
    useGetLabOrdersByPatientChartIdQuery(patientChartId);
  // console.log("updateLabOrderId", updateLabOrderId);

  return (
    <>
      <Table striped>
        <Table.Head>
          {laborderTableHeaders.map(({ name }) => {
            return (
              <>
                <Table.HeadCell>{name}</Table.HeadCell>
              </>
            );
          })}
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {laborders &&
            laborders?.length > 0 &&
            laborders.map((laborder) => (
              <>
                <Table.Row>
                  {laborderTableHeaders.map(({ id }) => {
                    if (id === "requestingPhysician") {
                      const { userProfile } = laborder[id];
                      const { fname, mname, lname } = userProfile;
                      return (
                        <>
                          <Table.Cell>{`${fname} ${mname} ${lname}, MD`}</Table.Cell>
                        </>
                      );
                    } else if (id === "LabProcedure") {
                      const { procedureName } = laborder[id];
                      return (
                        <>
                          <Table.Cell>{`${procedureName}`}</Table.Cell>
                        </>
                      );
                    } else if (id === "result") {
                      const result = laborder[id];
                      return (
                        <>
                          <Table.Cell>
                            <div className="grid grid-cols-1">
                              <div>
                                {result ? (
                                  <img
                                    src={result}
                                    onClick={() => {
                                      setActivePrev(result);
                                      setShowPreview(true);
                                    }}
                                    className="cursor-pointer"
                                  />
                                ) : (
                                  "No Data"
                                )}
                              </div>
                            </div>
                          </Table.Cell>
                        </>
                      );
                    }
                    return (
                      <>
                        <Table.Cell>
                          {laborder[id] ? laborder[id] : "No Data"}
                        </Table.Cell>
                      </>
                    );
                  })}
                  <Table.Cell>
                    <Button
                      onClick={() => {
                        setOpenModal(true), setUpdateLabOrderId(laborder["id"]);
                      }}
                    >
                      Upload
                    </Button>
                  </Table.Cell>
                </Table.Row>
              </>
            ))}
          {(!laborders || laborders.length < 1) && (
            <Table.Row>
              <Table.Cell>No Data</Table.Cell>
              <Table.Cell>No Data</Table.Cell>
              <Table.Cell>No Data</Table.Cell>
              <Table.Cell>No Data</Table.Cell>
              <Table.Cell>No Data</Table.Cell>
              <Table.Cell>No Data</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <Modal show={showPreview} onClose={() => setShowPreview(false)}>
        <Modal.Header>Result View</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <img src={activePrev} />
          </div>
        </Modal.Body>
      </Modal>
      <UploadLabOrderForm
        setOpenModal={setOpenModal}
        openModal={openModal}
        updateLabOrderId={updateLabOrderId}
        setUpdateLabOrderId={setUpdateLabOrderId}
      />
    </>
  );
};
export default LabOrderTable;
