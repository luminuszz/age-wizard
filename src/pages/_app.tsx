import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

const CustomApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default CustomApp;
