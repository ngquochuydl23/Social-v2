import { useRouter } from "next/router";
import { AppProps } from 'next/app'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from "react";
import { ThemeProvider } from 'next-themes'
import { IntlProvider } from "react-intl";;
import '../styles/styles.scss'
import AccountProvider from "context/SessionHook";
import useTranslation from "context/TranslationHook";
import TranslationProvider from "context/TranslationHook";


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => (page))
  return (
    <ThemeProvider
      enableSystem={false}
      defaultTheme="light"
      forcedTheme={(Component as any).theme || undefined}
      attribute="data-theme">
      <TranslationProvider>
        <AccountProvider>
          {getLayout(<Component {...pageProps} />)}
        </AccountProvider>
      </TranslationProvider>
    </ThemeProvider>
  )
}

export default MyApp;
