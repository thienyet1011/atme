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

MyApp.getInitialProps = async ({req}) => {
  let url = req && req.headers && req.headers.host ? 'http://' + req.headers.host : window.location.origin
  var categories = [];

  try{
    //get Stickers
    const response = await axios.get(url + '/api/categories', {
      withCredentials: true,
    });

    if(response && response.data && typeof response.data !== 'undefined'){
      categories = response.data
    }
  } catch(error){
    console.error(error)
  }

  return { categories };
}

export default MyApp;
