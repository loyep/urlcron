import Link from "next/link";
import Logo from "./logo";
import Navigation from "./navigation";
import { UserDropdown } from "./user-dropdown";
import { BsSearch } from "react-icons/bs";
import Tooltip from '@/components/ui/Tooltip'

export const isMac = typeof window !== "undefined" ? navigator.userAgent.indexOf("Mac") != -1 : false;

export const KBarTrigger = () => {
    return (
      <>
        <Tooltip side="right" content={isMac ? "⌘ + K" : "CTRL + K"}>
          <button
            color="minimal"
            title="search"
            className="group flex rounded-md py-2 px-3 text-sm font-medium hover:bg-gray-100 lg:p-1 lg:hover:bg-gray-200 lg:hover:text-neutral-900">
            <BsSearch className="h-4 w-4 flex-shrink-0 text-inherit" />
          </button>
        </Tooltip>
      </>
    );
  };

  
export default function SideBar() {
    return (
      <aside className="desktop-transparent hidden w-14 flex-col border-r border-gray-100 bg-gray-50 md:flex lg:w-56 lg:flex-shrink-0 lg:px-4">
        <div className="flex h-0 flex-1 flex-col overflow-y-auto pt-3 pb-4 lg:pt-5">
          <header className="items-center justify-between md:hidden lg:flex">
            <Link href="/event-types" legacyBehavior>
              <a className="px-4">
                <Logo small />
              </a>
            </Link>
            <div className="flex space-x-2">
              <button
                color="minimal"
                onClick={() => window.history.back()}
                className="desktop-only group flex text-sm font-medium text-neutral-500 hover:text-neutral-900">
                {/* <Icon.FiArrowLeft className="h-4 w-4 flex-shrink-0 text-neutral-500 group-hover:text-neutral-900" /> */}
              </button>
              <button
                color="minimal"
                onClick={() => window.history.forward()}
                className="desktop-only group flex text-sm font-medium text-neutral-500 hover:text-neutral-900">
                {/* <Icon.FiArrowRight className="h-4 w-4 flex-shrink-0 text-neutral-500 group-hover:text-neutral-900" /> */}
              </button>
              <KBarTrigger />
            </div>
          </header>
  
          <hr className="desktop-only absolute -left-3 -right-3 mt-4 block w-full border-gray-200" />
  
          {/* logo icon for tablet */}
          <Link href="/event-types" legacyBehavior>
            <a className="text-center md:inline lg:hidden">
              <Logo small icon />
            </a>
          </Link>
  
          <Navigation />
        </div>
  
        {/* {isCalcom && <Tips />} */}
        {/* Save it for next preview version
         <div className="hidden mb-4 lg:block">
          <UserV2OptInBanner />
        </div> */}
  
        <div data-testid="user-dropdown-trigger">
          <span className="hidden lg:inline">
            <UserDropdown />
          </span>
          <span className="hidden md:inline lg:hidden">
            <UserDropdown small />
          </span>
        </div>
        {/* <DeploymentInfo /> */}
      </aside>
    );
  }
  