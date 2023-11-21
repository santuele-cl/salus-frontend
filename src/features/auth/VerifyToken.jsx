import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getAccessToken } from "./authSlice";
import { useRefreshQuery } from "./authApiSlice";
import { useEffect, useRef, useState } from "react";
// import LoadingSpinner from "../../components/LoadingSpinner";
import SpinnerWhole from "../../components/SpinnerWhole";

const VerifyToken = () => {
  const strictModeHanlderRef = useRef(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { refetch: refresh } = useRefreshQuery();
  const accessToken = useSelector(getAccessToken);

  useEffect(() => {
    if (
      strictModeHanlderRef.current === true ||
      process.env.NODE_ENV !== "development"
    ) {
      const getNewToken = async () => {
        try {
          console.log("getNewToken called");
          await refresh();
          setIsSuccess(true);
        } catch (error) {
          console.log(error);
        }
      };

      if (!accessToken) getNewToken();
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

export default VerifyToken;
