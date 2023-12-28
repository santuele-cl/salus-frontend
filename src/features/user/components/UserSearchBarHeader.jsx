import { Button, Label, Spinner, TextInput } from "flowbite-react";
import {
  PiMagnifyingGlassBold,
  PiUserBold,
  PiUsersThreeFill,
} from "react-icons/pi";
import SpinnerWhole from "../../../components/SpinnerWhole";
import { useGetUserByIdQuery } from "../usersApiSlice";
import { useState } from "react";
import UserSearchContent from "./UserSearchContent";

const UserSearchBarHeader = () => {
  const [userId, setUserId] = useState(null);

  const {
    data: user,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetUserByIdQuery({ id: userId });

  let content;

  if (isFetching || isLoading) {
    content = <Spinner className="mx-auto" />;
  } else if (isError) {
    content = <p className="text-center">{error?.data?.message}</p>;
  } else if (isSuccess && user) {
    content = <UserSearchContent user={user} />;
  }

  return (
    <div className="p-4 flex flex-col gap-4 ">
      <div className="flex gap-4 bg-green-600 text-white rounded-md py-2 px-4 justify-between items-center">
        <div className="tracking-wide">Find User</div>
        <div className="flex gap-2 items-center">
          <TextInput
            id="userId"
            icon={PiUserBold}
            placeholder="Input User ID here"
            onChange={(e) => setUserId(e.target.value)}
            required
          />
          {/* <Button color="success">
            <PiMagnifyingGlassBold />
            <span className="ml-2">Search User</span>
          </Button> */}
        </div>
      </div>
      <hr />
      <div className="">{content}</div>
    </div>
  );
};
export default UserSearchBarHeader;
