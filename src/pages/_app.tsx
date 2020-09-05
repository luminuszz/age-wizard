import { NextPage } from 'next';
import { AppProps } from 'next/app';
import React from 'react';
import '../styles/home.scss';

const CustomApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default CustomApp;
