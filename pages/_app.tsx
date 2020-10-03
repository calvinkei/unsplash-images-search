import React from 'react'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { CssBaseline } from '@material-ui/core'
import Head from 'next/head'
import { FavListsProvider } from '../contexts/FavListsContext'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Unsplash Image Search App</title>
        <meta
          name="description"
          content="Simple application for searching and saving Unsplash images"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <CssBaseline />
      <FavListsProvider>
        <Component {...pageProps} />
      </FavListsProvider>
    </>
  )
}

export default App
