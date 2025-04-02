import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store"; // Import your Redux store
import "../styles/globals.css"; // Import global styles (e.g., Tailwind CSS)
import "../config/i18n";
import { appWithTranslation } from "next-i18next";
import { AppGuarg } from "@/components/shared/AppGuard";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <AppGuarg>
        <Component {...pageProps} />
      </AppGuarg>
    </Provider>
  );
};

export default appWithTranslation(App);
