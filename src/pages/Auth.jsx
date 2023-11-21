import { Link, Navigate, useLocation } from "react-router-dom";
// import Logo from "../components/Logo";
import AuthForm from "../components/auth/AuthForm";
import useGetUserData from "../hooks/useGetUserData";
const Auth = () => {
  const { isLoggedIn } = useGetUserData();
  const { state } = useLocation();

  if (isLoggedIn) {
    return <Navigate to={`${state?.from ? state?.from : "/dashboard"}`} />;
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen bg-no-repeat bg-cover bg-center bg-[radial-gradient(rgba(0,0,0,.50),rgba(0,0,0,0)),url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1706&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 gap-6 shadow-lg">
        <div className=" w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Link to="/dashboard" className="flex items-center justify-center ">
              <img src="/react.svg" className="mr-3 h-8" alt="Flowbite Logo" />
              {/* <span className="self-center text-2xl font-semibold whitespace-nowrap  dark:text-white">
                Salus Rekord
              </span> */}
            </Link>
            <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Welcome to <span className="text-red-800">Salus!</span>
              {/* <span className="block text-[20px] font-normal">
                Sign in to continue
              </span> */}
            </h1>
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
