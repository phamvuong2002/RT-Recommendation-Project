import { createContext, useRef, useState } from 'react';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [session, setSession] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState('');

  return (
    <AppContext.Provider
      value={{
        userId,
        session,
        isloading,
        activePage,
        setUserId,
        setSession,
        setIsLoading,
        setActivePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
