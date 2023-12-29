import { Button, TextInput } from "flowbite-react";
import useGetConfig from "../../hooks/useGetConfig";
import { PiCheckFatFill, PiXBold } from "react-icons/pi";
import { useUpdateConfigurationMutation } from "./configurationApiSlice";
import { useState } from "react";
import { toast } from "react-toastify";

const Configuration = () => {
  const { name, logo, loginBg } = useGetConfig();
  const [update] = useUpdateConfigurationMutation();

  const [updateName, setUpdateName] = useState("");
  const [updateLogo, setUpdateLogo] = useState("");
  const [updateLoginBg, setUpdateLoginBg] = useState("");

  const onReset = () => {
    setUpdateName("");
    setUpdateLogo("");
    setUpdateLoginBg("");
  };

  const onUpdate = async () => {
    console.log("update clicked");
    if (
      [!updateName && !updateLogo && !updateLoginBg].every(
        (item) => item !== true
      )
    ) {
      try {
        await update({
          ...(updateName && { name: updateName }),
          ...(updateLogo && { logo: updateLogo }),
          ...(updateLoginBg && { loginBg: updateLoginBg }),
        });
        toast.success("Site configuration updated.");
        onReset();
      } catch (error) {
        toast.error("An error has occured try again.");

        console.log(error);
      }
    } else {
      toast.warning("Empty fields.");
    }
  };

  return (
    <div>
      <div className="p-4 flex flex-col gap-4 ">
        <div className="flex gap-4 bg-green-600 text-white rounded-md py-4 px-4 justify-between items-center">
          <div className="tracking-wide">Edit Site Configuration</div>
          <div className="flex gap-4">
            <button onClick={onUpdate}>
              <PiCheckFatFill />
            </button>

            <button onClick={onReset}>
              <PiXBold />
            </button>
          </div>
        </div>
        <hr />

        <div className="my-2 flex flex-col gap-4 md:px-8 justify-center">
          {/* # NAME */}
          <div className="flex gap-5 items-center">
            {/* ##  Field*/}
            <h2 className="flex-shrink-0 w-[100px] font-semibold">Name</h2>
            {/* ##  Value */}
            <div className="flex-grow gap-5 xl:gap-[80px] flex flex-col md:flex-row  md:justify-between ">
              {/* Current */}
              <div className="lg:max-w-[300px] flex-1 flex flex-col gap-1">
                <p className="font-bold text-sm">Current:</p>
                <p>{name}</p>
              </div>
              {/* Update */}
              <div className="flex-1 flex flex-col gap-1">
                <p className="font-bold text-sm">Update name:</p>

                <TextInput
                  value={updateName}
                  onChange={(e) => setUpdateName(e.target.value)}
                  placeholder="Type here the updated name..."
                />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="my-2 flex flex-col gap-4 md:px-8 justify-center">
          {/* # NAME */}
          <div className="flex gap-5 items-center">
            {/* ##  Field*/}
            <h2 className="flex-shrink-0 w-[100px] font-semibold">Logo</h2>
            {/* ##  Value */}
            <div className="flex-grow gap-5 xl:gap-[80px] flex flex-col md:flex-row md:items-center md:justify-between ">
              {/* Current */}

              <div className="lg:max-w-[300px] flex-1 flex flex-col gap-1 border-2 rounded-md border-dashed border-gray-300 p-2">
                {logo ? (
                  <img src={logo} alt="logo" className="block w-full" />
                ) : (
                  <p>No image</p>
                )}
              </div>
              {/* Update */}

              <div className="flex-1 flex flex-col gap-2 xl:flex-row lg:gap-8">
                <div className="xl:w-1/3 flex flex-col gap-2">
                  <p className="font-bold text-sm">Update Image:</p>
                  <TextInput
                    value={updateLogo}
                    onChange={(e) => setUpdateLogo(e.target.value)}
                    placeholder="Input the new image..."
                  />
                </div>
                <div className="xl:w-2/3 flex flex-col gap-2">
                  <p className="font-bold text-sm">Preview:</p>
                  <div className="w-full p-2 border-2 rounded-md border-dashed border-gray-300">
                    {updateLogo ? (
                      <img
                        src={updateLogo}
                        alt="logo"
                        className="block w-full"
                      />
                    ) : (
                      <p>No image</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />

        <div className="my-2 flex flex-col gap-4 md:px-8 justify-center">
          {/* # NAME */}
          <div className="flex gap-5 items-center">
            {/* ##  Field*/}
            <h2 className="flex-shrink-0 w-[100px] font-semibold">
              Login Background Image
            </h2>
            {/* ##  Value */}
            <div className="flex-grow gap-5 xl:gap-[80px] flex flex-col md:flex-row md:items-center md:justify-between ">
              {/* Current */}

              <div className="lg:max-w-[300px] flex-1 flex flex-col gap-1 border-2 rounded-md border-dashed border-gray-300 p-4">
                {loginBg ? (
                  <img
                    src={loginBg}
                    alt="login background image"
                    className="block w-full"
                  />
                ) : (
                  <p>No image</p>
                )}
              </div>
              {/* Update */}

              <div className="flex-1 flex flex-col gap-2 xl:flex-row lg:gap-8">
                <div className="xl:w-1/3 flex flex-col gap-2">
                  <p className="font-bold text-sm">Update image:</p>
                  <TextInput
                    value={updateLoginBg}
                    onChange={(e) => setUpdateLoginBg(e.target.value)}
                    placeholder="Input the new image..."
                  />
                </div>
                <div className="xl:w-2/3 flex flex-col gap-2">
                  <p className="font-bold text-sm">Preview:</p>
                  <div className="w-full p-2 border-2 rounded-md border-dashed border-gray-300">
                    {updateLoginBg ? (
                      <img
                        src={updateLoginBg}
                        alt="logo"
                        className="block w-full"
                      />
                    ) : (
                      <p>No image</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Configuration;
