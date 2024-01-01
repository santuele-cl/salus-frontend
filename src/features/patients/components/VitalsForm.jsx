const VitalsForm = ({ visitId }) => {
  const [addNewVisit] = ();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({
    accompaniedBy,
    chiefComplaint,
    hpi,
    serviceDepartmentId,
  }) => {
    try {
      await addNewVisit({
        patientChartId: patientChartId,
        visitData: {
          chiefComplaint,
          hpi,
          serviceDepartmentId,
          ...(accompaniedBy && { accompaniedBy }),
        },
      }).unwrap();
      reset();
      toast.success("Visit successfully added.");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  return <div>VitalsForm</div>;
};
export default VitalsForm;
