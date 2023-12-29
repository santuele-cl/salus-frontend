import { Outlet } from "react-router-dom";
import useGetConfig from "../hooks/useGetConfig";
import { useEffect } from "react";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

const RootRouteLayout = () => {
  const { name } = useGetConfig();
  useEffect(() => {
    document.title = name;
  }, []);
  return (
    <>
      {/* <Header /> */}
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
};
export default RootRouteLayout;
