import ErrorBoundary from "@/components/ErrorBoundary";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";
import SideBar from "./components/sider-bar";

function Layout(props: LayoutProps) {
  return (
    <div className="h-screen overflow-hidden">
      <div
        className="flex h-screen overflow-hidden"
        data-testid="dashboard-shell"
      >
        <SideBar />
        <div className="flex w-0 flex-1 flex-col overflow-hidden">
          <MainContainer {...props} />
        </div>
      </div>
    </div>
  );
}

type LayoutProps = {
  centered?: boolean;
  title?: string;
  heading?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  CTA?: ReactNode;
  large?: boolean;
  SettingsSidebarContainer?: ReactNode;
  MobileNavigationContainer?: ReactNode;
  SidebarContainer?: ReactNode;
  TopNavContainer?: ReactNode;
  //   drawerState?: DrawerState;
  HeadingLeftIcon?: ReactNode;
  backPath?: string | boolean; // renders back button to specified path
  // use when content needs to expand with flex
  flexChildrenContainer?: boolean;
  isPublic?: boolean;
  withoutMain?: boolean;
  // Gives you the option to skip HeadSEO and render your own.
  withoutSeo?: boolean;
  // Gives the ability to include actions to the right of the heading
  actions?: JSX.Element;
};

function MainContainer({
  //   SettingsSidebarContainer: SettingsSidebarContainerProp = (
  //     <SettingsSidebarContainerDefault />
  //   ),
  //   MobileNavigationContainer: MobileNavigationContainerProp = (
  //     <MobileNavigationContainer />
  //   ),
  //   TopNavContainer: TopNavContainerProp = <TopNavContainer />,
  ...props
}: LayoutProps) {
  //   const [sideContainerOpen, setSideContainerOpen] = props.drawerState || [
  //     false,
  //     noop,
  //   ];
  const [sideContainerOpen, setSideContainerOpen] = useState(true);

  return (
    <main className="relative z-0 flex flex-1 flex-col overflow-y-auto bg-white focus:outline-none">
      {/* show top navigation for md and smaller (tablet and phones) */}
      {/* {TopNavContainerProp} */}
      {/* The following is used for settings navigation on medium and smaller screens */}
      <div
        className={classNames(
          "overflow-none fixed z-40 m-0 h-screen w-screen overscroll-none bg-black opacity-50",
          sideContainerOpen ? "" : "hidden"
        )}
        onClick={() => {
          setSideContainerOpen(false);
        }}
      />
      {/* {SettingsSidebarContainerProp} */}
      <div className="max-w-full px-4 py-2 lg:py-8 lg:px-12">
        <ErrorBoundary>
          {/* add padding to top for mobile when App Bar is fixed */}
          <div className="pt-14 sm:hidden" />
          {!props.withoutMain ? (
            <ShellMain {...props}>{props.children}</ShellMain>
          ) : (
            props.children
          )}
        </ErrorBoundary>
        {/* show bottom navigation for md and smaller (tablet and phones) on pages where back button doesn't exist */}
        {/* {!props.backPath ? MobileNavigationContainerProp : null} */}
      </div>
    </main>
  );
}

export function ShellMain(props: LayoutProps) {
  // const router = useRouter();
  // const { isLocaleReady } = useLocale();
  return (
    <>
      <div className="flex items-baseline sm:mt-0">
        {/* {!!props.backPath && (
            <Button
              size="icon"
              color="minimal"
              onClick={() =>
                typeof props.backPath === "string" ? router.push(props.backPath as string) : router.back()
              }
              StartIcon={Icon.FiArrowLeft}
              aria-label="Go Back"
              className="ltr:mr-2 rtl:ml-2"
            />
          )} */}
        {props.heading && (
          <header
            className={classNames(
              props.large && "py-8",
              "mb-4 flex w-full max-w-full items-center pt-4 md:p-0 lg:mb-10"
            )}
          >
            {props.HeadingLeftIcon && (
              <div className="ltr:mr-4">{props.HeadingLeftIcon}</div>
            )}
            <div className="w-full ltr:mr-4 rtl:ml-4 sm:block">
              {props.heading && (
                <h1 className="font-cal max-w-28 sm:max-w-72 md:max-w-80 mb-1 hidden truncate text-xl font-bold tracking-wide text-black sm:block xl:max-w-full">
                  {props.heading}
                </h1>
              )}
              {props.subtitle && (
                <p className="hidden text-sm text-neutral-500 sm:block">
                  {props.subtitle}
                </p>
              )}
            </div>
            {props.CTA && (
              <div
                className={classNames(
                  props.backPath
                    ? "relative"
                    : "fixed right-4 bottom-[75px] z-40 ",
                  "flex-shrink-0 sm:relative sm:bottom-auto sm:right-auto"
                )}
              >
                {props.CTA}
              </div>
            )}
            {props.actions && props.actions}
          </header>
        )}
      </div>
      <div
        className={classNames(
          props.flexChildrenContainer && "flex flex-1 flex-col"
        )}
      >
        {props.children}
      </div>
    </>
  );
}

export default Layout;