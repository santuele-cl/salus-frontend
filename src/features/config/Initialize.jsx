import { Outlet } from "react-router-dom";
import SpinnerWhole from "../../components/SpinnerWhole";
import { getConfigurationData, setConfig } from "./configurationSlice";
import { useGetConfigurationQuery } from "./configurationApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

const Initialize = () => {
  const { refetch } = useGetConfigurationQuery();
  const { config } = useSelector(getConfigurationData);
  const strictModeHanlderRef = useRef(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (
      strictModeHanlderRef.current === true ||
      process.env.NODE_ENV !== "development"
    ) {
      const getConfig = async () => {
        try {
          await refetch();
          setIsSuccess(true);
        } catch (error) {
          console.log(error);
        }
      };

      if (!config) getConfig();
    }

    return () => {
      strictModeHanlderRef.current = true;
    };
  }, []);

  if (!isSuccess) {
    return <SpinnerWhole />;
  }
  return <Outlet />;
};
export default Initialize;
