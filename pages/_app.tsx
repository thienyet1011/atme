import '../styles/Global.css';
import '../styles/css/lala-slider/doc.min.css'
import '../styles/css/lala-slider/font.min.css'
import '../styles/css/font-awesome.css'

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import "../styles/css/slick/slick.css"; 
import "../styles/css/slick/slick-theme.css";

import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AppProvider } from '../context';
import { CategoryModel } from 'model/Category';

import axios from 'axios';
axios.defaults.baseURL = process.env.BASEURL;
axios.defaults.timeout = 1000;

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AppProvider>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}

export default MyApp;
