import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store"; // Import your Redux store
import "../styles/globals.css"; // Import global styles (e.g., Tailwind CSS)
import "../config/i18n";
import { appWithTranslation } from "next-i18next";
import { AppGuarg } from "@/components/shared/AppGuard";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>PDD Moldova</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=1, minimum-scale=1, maximum-scale=5"
        />
      </Head>
      <Provider store={store}>
        <AppGuarg>
          <Component {...pageProps} />
        </AppGuarg>
      </Provider>
    </>
  );
};

export default appWithTranslation(App);
