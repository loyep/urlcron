import type { Session } from "next-auth";
import { Analytics } from "@vercel/analytics/react";
import type {
  AppProps as NextAppProps,
  AppProps as NextJsAppProps,
} from "next/app";
import { NextRouter } from "next/router";
import { ComponentProps, ReactNode } from "react";

// tRPC =>
import { trpc } from "@/utils/trpc";

// Auth =>
import { SessionProvider } from "next-auth/react";

// Styles =>
import "@/styles/globals.css";
import "superkey/styles.css";
import Show from "@/motions/show";
import { Toaster } from "react-hot-toast";

// Layout =>
import Layout from "@/layout";

// SEO =>
import { DefaultSeo } from "next-seo";
import nextSeoConfig from "next-seo.config";

// Next progress =>
import NextNProgress from "nextjs-progressbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";

// Workaround for https://github.com/vercel/next.js/issues/8592
export type AppProps = Omit<NextAppProps, "Component"> & {
  Component: NextAppProps["Component"] & {
    requiresLicense?: boolean;
    isThemeSupported?: boolean | ((arg: { router: NextRouter }) => boolean);
    getLayout?: (page: React.ReactElement, router: NextRouter) => ReactNode;
  };
  /** Will be defined only is there was an error */
  err?: Error;
  session: Session | null;
};

// Use the layout defined at the page level, if available

const MyApp = (props: AppProps) => {
  const { Component, pageProps, err, router, session } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <div className="min-h-screen">
      <NextNProgress
        color="#979797"
        startPosition={0.3}
        stopDelayMs={200}
        height={2}
        showOnShallow={true}
      />
      <DefaultSeo {...nextSeoConfig} />
      <TooltipProvider>
        <SessionProvider session={session}>
          {getLayout(<Component {...pageProps} err={err} />, router)}
          {/* <Layout>
          <Show routerKey={router.route}>
            <Component {...pageProps} />
          </Show>
        </Layout> */}
        </SessionProvider>
      </TooltipProvider>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Analytics />
    </div>
  );
};

export default trpc.withTRPC(MyApp);
