import { Link, Navigate, useLocation } from "react-router-dom";
// import Logo from "../components/Logo";
import AuthForm from "../components/auth/AuthForm";
import useGetUserData from "../hooks/useGetUserData";
import useGetConfig from "../hooks/useGetConfig";
const Auth = () => {
  const { name, loginBg, logo } = useGetConfig();

  const { isLoggedIn } = useGetUserData();
  const { state } = useLocation();

  if (isLoggedIn) {
    return <Navigate to={`${state?.from ? state?.from : "/dashboard"}`} />;
  }

  return (
    <section
      style={{
        backgroundImage: `radial-gradient(rgba(0,0,0,.50),rgba(0,0,0,0)),url('${loginBg}')`,
      }}
      className="bg-gray-300 dark:bg-gray-900 min-h-screen bg-no-repeat bg-cover bg-center"
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 gap-6 shadow-lg">
        <div className=" w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div
              to="/dashboard"
              className="flex items-center justify-center flex-col gap-4"
            >
              <img src={logo} className="h-8" alt="Logo" />
              <h2 className="self-center text-2xl text-center  dark:text-white  max-w-sm">
                <span>{name}</span>
              </h2>
            </div>

            <AuthForm />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Auth;

// import AuthForm from "../components/auth/AuthForm";
// import AuthHero from "../components/auth/AuthHero";

// export const Auth = () => {
//   return (
//     <div className="min-h-screen flex">
//       <div className="flex-grow">
//         <AuthHero />
//       </div>

//       <div className="w-[600px] flex-shrink-0 pt-[200px]">
//         <AuthForm />
//       </div>
//     </div>
//   );
// };

/**
 * bg-no-repeat bg-cover bg-center bg-[radial-gradient(rgba(0,0,0,.95),rgba(0,0,0,0)),url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1706&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]
 */
