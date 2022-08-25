import useUser from "hook/useUser";
import Head from "next/head";
import { SWRConfig } from "swr";
import Alert from "../components/Alert";
import "../global.css";
import AlertProvider from "../reducer/AlertProvider";

export default function App({ Component, pageProps }: any) {
  const user = useUser();
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
        />
      </Head>
      <AlertProvider>
        <div className="flex flex-col">
          <Component {...pageProps} />
        </div>
        <Alert />
      </AlertProvider>
    </SWRConfig>
  );
}
