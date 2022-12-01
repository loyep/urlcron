import { NextRouter, useRouter } from "next/router";
import { BsLink, BsGear, BsListTask } from "react-icons/bs";
import type { IconType } from "react-icons";
import { Fragment } from "react";
import Link from "next/link";
import classNames from "classnames";
import { useSession } from "next-auth/react";

export type NavigationItemType = {
  name: string;
  href: string;
  badge?: React.ReactNode;
  icon?: IconType;
  child?: NavigationItemType[];
  pro?: true;
  onlyMobile?: boolean;
  onlyDesktop?: boolean;
  isCurrent?: ({
    item,
    isChild,
    router,
  }: {
    item: NavigationItemType;
    isChild?: boolean;
    router: NextRouter;
  }) => boolean;
};

const requiredCredentialNavigationItems = ["Routing Forms"];
const MORE_SEPARATOR_NAME = "more";

const navigation: NavigationItemType[] = [
  {
    name: "我的任务",
    href: "/jobs",
    icon: BsListTask,
  },
  {
    name: "设置",
    href: "/settings/my-account/profile",
    icon: BsGear,
  },
];

const moreSeparatorIndex = navigation.findIndex(
  (item) => item.name === MORE_SEPARATOR_NAME
);

// We create all needed navigation items for the different use cases
const {
  desktopNavigationItems = [],
  mobileNavigationBottomItems = [],
  mobileNavigationMoreItems = [],
} = navigation.reduce<Record<string, NavigationItemType[]>>(
  (items, item, index) => {
    // We filter out the "more" separator in desktop navigation
    if (item.name !== MORE_SEPARATOR_NAME)
      items.desktopNavigationItems?.push(item);
    // Items for mobile bottom navigation
    if (index < moreSeparatorIndex + 1 && !item.onlyDesktop)
      items.mobileNavigationBottomItems?.push(item);
    // Items for the "more" menu in mobile navigation
    else items.mobileNavigationMoreItems?.push(item);
    return items;
  },
  {
    desktopNavigationItems: [],
    mobileNavigationBottomItems: [],
    mobileNavigationMoreItems: [],
  }
);

const Navigation = () => {
  return (
    <nav className="mt-2 flex-1 space-y-1 md:px-2 lg:mt-5 lg:px-0">
      {desktopNavigationItems?.map((item) => (
        <NavigationItem key={item.name} item={item} />
      ))}
      <div className="text-gray-500 lg:hidden">{/* <KBarTrigger /> */}</div>
    </nav>
  );
};

function useShouldDisplayNavigationItem(item: NavigationItemType) {
  const { status } = useSession();
  //   const { data: routingForms } = trpc.viewer.appById.useQuery(
  //     { appId: "routing-forms" },
  //     {
  //       enabled:
  //         status === "authenticated" &&
  //         requiredCredentialNavigationItems.includes(item.name),
  //       trpc: {},
  //     }
  //   );
  return (
    !requiredCredentialNavigationItems.includes(item.name) ||
    // routingForms?.isInstalled
    false
  );
}

const defaultIsCurrent: NavigationItemType["isCurrent"] = ({
  isChild,
  item,
  router,
}) => {
  return isChild
    ? item.href === router.asPath
    : router.asPath.startsWith(item.href);
};

const NavigationItem: React.FC<{
  item: NavigationItemType;
  isChild?: boolean;
}> = (props) => {
  const { item, isChild } = props;
  const router = useRouter();
  const isCurrent: NavigationItemType["isCurrent"] =
    item.isCurrent || defaultIsCurrent;
  const current = isCurrent({ isChild: !!isChild, item, router });
  const shouldDisplayNavigationItem = useShouldDisplayNavigationItem(
    props.item
  );

  if (!shouldDisplayNavigationItem) return null;

  return (
    <Fragment>
      <Link
        href={item.href}
        aria-label={item.name}
        className={classNames(
          "group flex items-center rounded-md py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-100 lg:px-[14px]  [&[aria-current='page']]:bg-gray-200 [&[aria-current='page']]:hover:text-neutral-900",
          isChild
            ? "[&[aria-current='page']]:text-brand-900 hidden pl-16 lg:flex lg:pl-11 [&[aria-current='page']]:bg-transparent"
            : "[&[aria-current='page']]:text-brand-900 "
        )}
        aria-current={current ? "page" : undefined}
      >
        {item.icon && (
          <item.icon
            className="h-4 w-4 flex-shrink-0 text-gray-500 mr-3 [&[aria-current='page']]:text-inherit"
            aria-hidden="true"
            aria-current={current ? "page" : undefined}
          />
        )}
        <span className="hidden w-full justify-between lg:flex">
          <div className="flex">{item.name}</div>
          {item.badge && item.badge}
        </span>
      </Link>
      {item.child &&
        isCurrent({ router, isChild, item }) &&
        item.child.map((item) => (
          <NavigationItem key={item.name} item={item} isChild />
        ))}
    </Fragment>
  );
};

export default Navigation;
