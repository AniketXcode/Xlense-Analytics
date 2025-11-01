import React from "react";
import { BackgroundLines } from "../components/ui/background-lines";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full bg-black text-white relative overflow-hidden">
      {/* Left: Form Area */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 z-10 relative">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Right: Branding with Background Lines */}
      <div className="hidden md:flex w-1/2 relative items-center justify-center px-6">
        {/* Background animation */}
        <BackgroundLines className="absolute inset-0 z-0 bg-black" />

        {/* Text content */}
        <div className="relative z-10 text-center">
          <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 text-4xl font-bold tracking-tight leading-tight">
            Xlense Analytics
          </h2>
          <p className="mt-4 text-neutral-400 text-base max-w-md mx-auto leading-relaxed">
            Experience the future of spreadsheet analytics. Upload your Excel or
            CSV files and watch them transform into interactive, intelligent
            2D and 3D visual dashboards. Xlense turns raw data into clear,
            meaningful insights — instantly and effortlessly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
