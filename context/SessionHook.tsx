import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { logOut } from "services/SessionService";
import { CurrentSessionDto, UserSessionDto } from "services/SessionService/dtos";
import { PATH } from "@constants/path";
import { saveAccessToken, clearAccessToken } from "services/https";
import { useTheme } from "next-themes";
import { UIMode } from "@constants/globals";
import localforage from "localforage";
import { useTranslation } from "./TranslationHook";

interface SessionProviderProps {
  session?: CurrentSessionDto | null;
  clearSession: () => any;
  logout: () => any;
  login: (token: string) => any;
  setSession: (session: any) => any;
  updateUserSession: (model: UserSessionDto) => any;
}

const Context = createContext<SessionProviderProps>({
  session: null,
  logout: (() => { }),
  clearSession: (() => { }),
  login: ((token: string) => { }),
  setSession: (session: any) => { },
  updateUserSession: (model: UserSessionDto) => { },
});


const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const { setTheme } = useTheme();
  const router = useRouter();
  const { setLocale } = useTranslation();
  const [session, setSession] = useState<CurrentSessionDto | null | undefined>(null);

  useEffect(() => {
    if (session) {
      const clientState = session?.clientState
      
      setSession(session);
      setLocale(clientState.language);
      setTheme(clientState.isDarkMode ? UIMode.Dark : UIMode.Light);
    }
  }, [session])

  const updateUserSession = async (model: UserSessionDto) => {
    if (session) {
      setSession({
        ...session,
        user: {
          ...session.user,
          ...model
        }
      })
    }
  }

  const login = (token: string) => {
    saveAccessToken(token);
    Boolean(router.query?.redirect)
      ? router.push(`${router.query.redirect}`)
      : router.push(PATH.home);
  };

  const clearSession = () => {
    router.push(PATH.Login);
    setSession(null);
    setTheme(UIMode.Light);
    localforage.clear()
    clearAccessToken();
  }

  const logout = async () => {

    logOut()
      .then((res) => { clearSession(); })
      .catch((err) => { console.log(err) })
  };

  const value: SessionProviderProps = {
    session,
    logout,
    login,
    setSession,
    clearSession,
    updateUserSession
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export const useSession = () => useContext(Context);

export default SessionProvider;
