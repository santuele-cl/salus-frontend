<div>
  <form onSubmit={(e) => e.preventDefault()}>
    <div className="flex-grow flex flex-col gap-4 p-4">
      <h2 className="uppercase font-bold">Account Info</h2>
      <div className="flex flex-col gap-5 p-3">
        <div>
          <Label htmlFor="serviceDept" value="serviceDepartmentId" />
          <Select id="serviceDept" required {...register("roleId")}>
            {serviceDept.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Select>
        </div>
        {/* Account Fields */}
        {visitFormFields.map(({ id, fieldName, type }) => (
          <div key={id}>
            <div>
              <Label htmlFor={id} value={fieldName} />
            </div>

            <TextInput
              id={id}
              required
              {...register(id)}
              type={type}
              helperText={errors[id] && <>{errors[id]?.message}</>}
              color={errors[id] && "failure"}
            />
          </div>
        ))}
        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 ">
          <Button className="flex-grow" onClick={handleSubmit(onSubmit)}>
            Create Account
          </Button>
          <Button outline color="failure" className="flex-grow" onClick={reset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  </form>
</div>;
