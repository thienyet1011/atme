import Document, { Html, Head, Main, NextScript } from "next/document";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
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
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
