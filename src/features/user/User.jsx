import { useParams } from "react-router-dom";
import SpinnerWhole from "../../components/SpinnerWhole";
import { useGetUserByIdQuery } from "./usersApiSlice";

const User = () => {
  const { userId } = useParams();
  console.log(userId);
  const {
    data: user,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetUserByIdQuery({ id: userId });
  console.log(user);

  let content;

  if (isFetching || isLoading) {
    content = <SpinnerWhole />;
  } else if (isError) {
    content = <p>{error?.data?.message}</p>;
  } else if (isSuccess && user) {
    content = <pre className="text-lg">{JSON.stringify(user, null, 8)}</pre>;
  }
  return content;
};
export default User;
