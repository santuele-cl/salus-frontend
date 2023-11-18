import AuthForm from "../components/auth/AuthForm";
import AuthHero from "../components/auth/AuthHero";

export const Auth = () => {
  return (
    <div className="min-h-screen flex">
      <div className="flex-grow">
        <AuthHero />
      </div>

      <div className="w-[600px] flex-shrink-0 pt-[200px]">
        <AuthForm />
      </div>
    </div>
  );
};
