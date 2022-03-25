import "../styles/Global.css";
import "../styles/css/lala-slider/doc.min.css";
import "../styles/css/lala-slider/font.min.css";
import "../styles/css/font-awesome.css";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../styles/css/slick/slick.css";
import "../styles/css/slick/slick-theme.css";

import { useEffect } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";

import { AppProvider } from "../context";
import { useStore } from "../store";

import axios from "axios";
axios.defaults.baseURL = process.env.BASEURL;

import theme from "../theme";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = useStore(pageProps.initialReduxState);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // Server side
  return (
    <Provider store={store}>
      <AppProvider>
        <QueryClientProvider client={queryClient}>
          <Head>
            <title>ATME</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
            <meta charSet="UTF-8"></meta>
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            
            <meta
              name="description"
              content="Công ty TNHH MTV Thương mại điện tử ATME Việt Nam chuyên sản xuất cung cấp thiết bị điện tử, mạch điện tử trên toàn lãnh thổ Việt Nam."
            />
  
            <meta
              name="keywords"
              content="ATME VIỆT NAM, atme.vn, Công ty TNHH MTV Thương mại điện tử ATME Việt Nam, thiết bị điện tử, mạch điện tử, công nghệ,điện tử nha trang, atme, điện tử tự động, tự động hóa, board PLC, board stm32"
            />
  
            <link rel="shortcut icon" href={prefix + '/favicon.ico'} />
  
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
            <link href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" rel="stylesheet" />
          </Head>

          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </QueryClientProvider>
      </AppProvider>
    </Provider>
  );
};

export default MyApp;
