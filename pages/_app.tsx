import "../styles/globals.scss";
import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import { AuthProvider } from "../providers/AuthContext";
import { DataProvider } from "../providers/DataContext";
import "semantic-ui-css/semantic.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  );
}

export default MyApp;
