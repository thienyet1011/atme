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

const queryClient = new QueryClient();

interface MyAppProps extends AppProps {
  categories: CategoryModel[];
}

const MyApp = ({ Component, pageProps, categories }: MyAppProps) => {
  console.log('categories: ', JSON.stringify(categories));  

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
