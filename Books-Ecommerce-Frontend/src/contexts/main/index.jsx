import { createContext, useRef, useState } from 'react';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('unknown');
  const [refreshToken, setRefreshToken] = useState('unknown');
  const [session, setSession] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState('');
  const [numCart, setNumCart] = useState(-1);
  const [addressDefault, setAddressDefault] = useState('');
  const [requestAuth, setRequestAuth] = useState(false);

  return (
    <AppContext.Provider
      value={{
        token,
        userId,
        session,
        numCart,
        isloading,
        activePage,
        requestAuth,
        refreshToken,
        addressDefault,
        setToken,
        setUserId,
        setSession,
        setNumCart,
        setIsLoading,
        setActivePage,
        setRequestAuth,
        setRefreshToken,
        setAddressDefault,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
