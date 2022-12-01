import classNames from "classnames";
import React from "react";

interface Props {
  small?: boolean;
}

export function UserDropdown({ small }: React.PropsWithChildren<Props>) {
  const user = {
    away: false,
    name: 'John Doe',
    username: 'johndoe',
  };
  return (
    <button className="group flex w-full cursor-pointer appearance-none items-center  rounded-full p-2 text-left outline-none hover:bg-gray-200 sm:pl-3 md:rounded lg:pl-2">
      <span
        className={classNames(
          small ? "h-6 w-6" : "h-8 w-8 mr-2",
          "relative flex-shrink-0 rounded-full bg-gray-300 "
        )}
      >
        {
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="rounded-full"
            src={"https://avatars.githubusercontent.com/u/10214025?v=4"}
            alt={"Nameless User"}
          />
        }
        {!user.away && (
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
        )}
        {user.away && (
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-yellow-500" />
        )}
      </span>
      {!small && (
        <span className="flex flex-grow items-center truncate">
          <span className="flex-grow truncate text-sm">
            <span className="block truncate font-medium text-gray-900">
              {user.name || "Nameless User"}
            </span>
            <span className="block truncate font-normal text-gray-900">
              {user.username
                ? process.env.NEXT_PUBLIC_WEBSITE_URL === "https://cal.com"
                  ? `cal.com/${user.username}`
                  : `/${user.username}`
                : "No public page"}
            </span>
          </span>
          {/* <Icon.FiMoreVertical
            className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          /> */}
        </span>
      )}
    </button>
  );
}
