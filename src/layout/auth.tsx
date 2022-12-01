import React from "react";
import classNames from "classnames";

interface AuthLayoutProps {
  title: string;
  description: string;
  footerText?: React.ReactNode | string;
  showLogo?: boolean;
  heading?: string;
  loading?: boolean;
}

export default function AuthLayout(
  props: React.PropsWithChildren<AuthLayoutProps>
) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-[#f3f4f6] py-12 sm:px-6 lg:px-8">
      {props.showLogo && <div className="mb-auto h-4 text-center text-black">URL Cron</div>}
      <div
        className={classNames(
          props.showLogo ? "text-center" : "",
          "sm:mx-auto sm:w-full sm:max-w-md"
        )}
      >
        {props.heading && (
          <h2 className="font-cal text-center text-3xl text-neutral-900">
            {props.heading}
          </h2>
        )}
      </div>
      {props.loading && (
        <div className="absolute z-50 flex h-screen w-full items-center bg-gray-50">
          {/* <Loader /> */}
        </div>
      )}
      <div className="mb-auto mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="border-1 mx-2 rounded-md border-gray-200 bg-white px-4 py-10 sm:px-10">
          {props.children}
        </div>
        <div className="mt-8 text-center text-sm text-neutral-600">
          {props.footerText}
        </div>
      </div>
    </div>
  );
}
