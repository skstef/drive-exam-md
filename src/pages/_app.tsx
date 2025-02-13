import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store"; // Import your Redux store
import "../styles/globals.css"; // Import global styles (e.g., Tailwind CSS)
import { appWithTranslation } from "next-i18next";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default appWithTranslation(App);
