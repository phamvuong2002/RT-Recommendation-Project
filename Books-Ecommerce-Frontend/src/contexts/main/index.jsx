import { createContext, useRef, useState } from 'react';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [session, setSession] = useState('');
  const [isloading, setIsLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        userId,
        session,
        isloading,
        setUserId,
        setSession,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
