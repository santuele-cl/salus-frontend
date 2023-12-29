import { useSelector } from "react-redux/es/hooks/useSelector";
import { getConfigurationData } from "../features/config/configurationSlice";

const useGetConfig = () => {
  const config = useSelector(getConfigurationData);

  if (config) {
    const { name, logo, loginBg } = config;
    // console.log("config", config);
    return {
      name,
      logo,
      loginBg,
      isInitialized: true,
    };
  }

  return {
    name: "",
    logo: "",
    loginBg: "",
    isInitialized: false,
  };
};

export default useGetConfig;
