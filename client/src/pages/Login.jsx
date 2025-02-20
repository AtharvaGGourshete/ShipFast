import React from "react";
import { LoginForm } from "@/components/ui/login-form";

const Login = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:wght@100..900&display=swap"
        rel="stylesheet"
      />
      <div className="bg-[#161616] min-h-screen text-white font-quicksand">
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
