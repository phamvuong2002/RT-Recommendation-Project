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
import {getUserInfo} from './apis/user'

function App() {
  const { userId, setUserId, session, setSession, setNumCart, setToken, setUsername } =
    useContext(AppContext);

  // Update Local Variables
  //Session
  useEffect(() => {
    const fetchUserAuth = async () => {
      const savedSession = localStorage.getItem('session-id');
      const data = await fetchAPI(getsession, 'POST');
      if (data.status === 200) {
        const currentSession = data.metadata.sessionid;
        if (savedSession !== currentSession) {
          localStorage.setItem('session-id', currentSession);
          await fetchUserAuth();
          return;
        } else {
          console.log('save::', savedSession);
          console.log('cureent::', currentSession);
          const data = await fetchAPI(loginGuest, 'POST');
          console.log('login guest::', data);
        }
        // setSession(data.metadata.sessionid);
        // setUserId(1);
        //FOR GUEST
        // setToken(null);
        //FOR LOGINED USER
        // setToken('123456789');
        // setSession(data.metadata.sessionid);
        // setUserId(data.metadata?.user?._id);
        // setToken(data.metadata?.token);
      }
      console.log('data session::', data);
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

  // 
  useEffect(() => {
    const getUsername = async () => {
      if (!userId || userId?.length <= 0) return;
      const data = await fetchAPI(`../${getUserInfo}`, 'POST', {
        userId,
      });
      if (data.status === 'error') {
        setUsername('');
      } else {
        setUsername(data?.metadata?.user_data?.fullname||'');
      }
      console.log('in call getUsername')
    };

    getUsername();
  }, [userId]);

  return (
    <>
      <ScrollToTop />
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
