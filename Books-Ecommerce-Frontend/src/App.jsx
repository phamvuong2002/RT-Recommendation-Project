import { Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import { DefaultLayout } from './components/Layouts';
import { NotFound } from './pages/NotFound';
import ScrollToTop from './helpers/ScrollToTop';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from './contexts/main';
import { fetchAPI } from './helpers/fetch';
import { getnumcart } from './apis/cart';
import { getsession, loginGuest } from './apis/access';
import { getUserInfo } from './apis/user';
import FloatingButton from './components/childComponents/FloatingButton';

function App() {
  const {
    userId,
    setUserId,
    session,
    setSession,
    setNumCart,
    setToken,
    setUsername,
    setIsLoading,
  } = useContext(AppContext);

  // Update Local Variables
  //Session

  useEffect(() => {
    const fetchUserAuth = async () => {
      setIsLoading(true);
      const savedSession = localStorage.getItem('session-id');
      const data = await fetchAPI(getsession, 'POST');
      if (data.status === 200) {
        const currentSession = data.metadata.sessionid;
        if (savedSession !== currentSession) {
          localStorage.setItem('session-id', currentSession);
          await fetchUserAuth();
          return;
        } else {
          const userData = await fetchAPI(loginGuest, 'POST');
          if (userData.status !== 200) {
            const userData = await fetchAPI(loginGuest, 'POST');
            if (userData.status !== 200) {
              setIsLoading(false);
              localStorage.setItem('session-id', '');
              window.location.reload();
              return;
            }
          }
          setSession(currentSession);
          if (!userData.metadata?.user?._id) {
            localStorage.setItem('session-id', '');
            window.location.reload();
          } else {
            setUserId(userData.metadata?.user?._id);
          }

          console.log('data session::', userData);
          if (userData.metadata.token) {
            setToken(userData.metadata?.token);
          } else {
            setToken('');
          }
          setIsLoading(false);
          return;
        }
      } else {
        setIsLoading(false);
        // window.location.reload();
        return;
      }
    };
    fetchUserAuth();
  }, []);

  //Num Cart
  useEffect(() => {
    const getNumCart = async () => {
      if (!userId || userId?.length <= 0) return;
      const data = await fetchAPI(`../${getnumcart}`, 'POST', {
        userId,
      });
      if (data.status === 'error') {
        setNumCart(0);
      } else {
        setNumCart(data?.metadata?.numCart || 0);
      }
    };
    getNumCart();
  }, [userId]);

  useEffect(() => {
    const getUsername = async () => {
      if (!userId || userId?.length <= 0) return;
      const data = await fetchAPI(`../${getUserInfo}`, 'POST', {
        userId,
      });
      if (data.status === 'error') {
        setUsername('');
      } else {
        setUsername(data?.metadata?.user_data?.fullname || '');
      }
      // console.log('in call getUsername');
    };

    getUsername();
  }, [userId]);


  return (
    <>
      <ScrollToTop />
      <FloatingButton/>

      <Routes>
        {publicRoutes.map((route, index) => {
          const Layout = route.layout || DefaultLayout;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        <Route
          path="*"
          element={
            <DefaultLayout>
              <NotFound />
            </DefaultLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
