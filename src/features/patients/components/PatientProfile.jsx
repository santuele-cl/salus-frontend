const PatientProfile = ({ data }) => {
  return (
    <div>
      PatientProfile
      <pre className="text-lg">{JSON.stringify(data, null, 8)}</pre>
    </div>
  );
};
export default PatientProfile;
