const ErrorFlexible = ({ err }) => {
  return (
    <div className="flex justify-center items-center">
      <p className="text-center">{err?.data?.message}</p>
      <p className="text-center">{err?.message}</p>
    </div>
  );
};
export default ErrorFlexible;
