import { useRouter } from "next/router"
import { Chinese, English, Korean, Vietnamese } from "locales"
import React, { createContext, useContext, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";

const dictionary = {
  en: English,
  vn: Vietnamese,
  ko: Korean,
  zh: Chinese,
};

interface TranslationProviderProps {
  setLocale: (language: string) => any;
  locale: string;
  getDictionary: () => any;
}

const Context = createContext<TranslationProviderProps>({
  setLocale: ((language: string) => {  }),
  locale: 'en',
  getDictionary: (() => { }),
});

const TranslationProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<string>('en');

  useEffect(() => {
    if (!getLocale()) {
      setLocale('English');
      setLocaleState('en');
    }
  }, [])
  
  const setLocale = (language: string) => {
    if (typeof window !== "undefined") {
      switch (language) {
        case "Korean":
          localStorage.setItem('locale', 'ko')
          setLocaleState('ko');
          break;
        case "Vietnamese":
          localStorage.setItem('locale', 'vn')
          setLocaleState('vn');
          break;
        case "Chinese":
          localStorage.setItem('locale', 'zh')
          setLocaleState('zh');
          break;
        default:
          localStorage.setItem('locale', 'en')
          setLocaleState('en');
          break;
      }
    }
  }

  const getLocale = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem('locale');;
    }
  }

  const getDictionary = () => {
    return dictionary[locale as keyof typeof dictionary]
  }

  const value: TranslationProviderProps = {
    setLocale, locale, getDictionary
  }

  return (
    <Context.Provider value={value}>
      <IntlProvider
        locale={value.locale}
        messages={value.getDictionary()}>
        {children}
      </IntlProvider>
    </Context.Provider>
  );
}

export const useTranslation = () => useContext(Context);

export default TranslationProvider;