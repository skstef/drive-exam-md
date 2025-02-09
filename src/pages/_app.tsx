import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store"; // Import your Redux store
import "../styles/globals.css"; // Import global styles (e.g., Tailwind CSS)
import "../config/i18n";
import { appWithTranslation, useTranslation } from "next-i18next";
import { AppGuarg } from "@/components/shared/AppGuard";
import Head from "next/head";
import { useRouter } from "next/router";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { t, i18n } = useTranslation("common");

  return (
    <>
      <Head>
        <title>PDD Moldova</title>
        <meta name="description" content={t("seo_description")} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=1, minimum-scale=1, maximum-scale=5"
        />

        {router.pathname !== "/404" && (
          <>
            {/* Open Graph definitions */}
            <meta property="og:type" content="website" />
            <meta property="og:locale" content={i18n.language} />
            <meta
              property="og:url"
              content={`https://drive-exam-md.vercel.app${router.asPath}`}
            />
            <meta property="og:image:width" content="1024" />
            <meta property="og:image:height" content="1024" />
            <meta
              property="og:image"
              content={`https://drive-exam-md.vercel.app/images/og.png`}
            />
          </>
        )}
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
