import { Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import { DefaultLayout } from './components/Layouts';
import { NotFound } from './pages/NotFound';
import ScrollToTop from './helpers/ScrollToTop';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from './contexts/main';
import { fetchAPI } from './helpers/fetch';
import { getnumcart } from './apis/cart';
import { getsession } from './apis/access';

function App() {
  const { userId, setUserId, session, setSession, setNumCart } =
    useContext(AppContext);

  // Update Local Variables
  //Session
  useEffect(() => {
    const fetchUserAuth = async () => {
      const data = await fetchAPI(getsession, 'POST');
      if (data.status === 200) {
        setSession(data.metadata.sessionid);
        setUserId(1);
      }
    };
    fetchUserAuth();
  }, []);

  //Num Cart
  useEffect(() => {
    const getNumCart = async () => {
      if (!userId) return;
      const data = await fetchAPI(getnumcart, 'POST', {
        userId,
      });
      if (data.status === 'error') {
        setNumCart(0);
      } else {
        setNumCart(data.metadata.numCart);
      }
    };
    getNumCart();
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
