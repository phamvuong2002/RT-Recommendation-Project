import { createContext, useRef, useState } from 'react';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [session, setSession] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState('');
  const [numCart, setNumCart] = useState(0);

  return (
    <AppContext.Provider
      value={{
        userId,
        session,
        numCart,
        isloading,
        activePage,
        setUserId,
        setSession,
        setNumCart,
        setIsLoading,
        setActivePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
