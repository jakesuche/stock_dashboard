import "styles/globals.css";
import type { AppProps } from "next/app";
import { ComponentType, ReactElement, ReactNode } from "react";
import { NextPage } from "next";


export type NextPageWithLayout<P = unknown> = NextPage<P> & {
  // You can disable whichever you don't need
  getLayout?: (page: ReactElement) => ReactNode;
  layout?: ComponentType;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  return <>{getLayout(<Component {...pageProps} />)}</>;
}
