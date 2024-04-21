import { Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import { DefaultLayout } from './components/Layouts';
import { NotFound } from './pages/NotFound';
import ScrollToTop from './helpers/ScrollToTop';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from './contexts/main';

function App() {
  const { userId, setUserId, session, setSession } = useContext(AppContext);
  useEffect(() => {
    const fetchUserAuth = async () => {
      try {
        const url = '/api/v1/api/access/get-session';
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          // body: JSON.stringify(data),
        });
        if (!res.ok) return;

        const data = await res.json();
        console.log(data);
        if (data.status === 200) {
          setSession(data.metadata.sessionid);
          setUserId(1);
        }
      } catch (error) {
        console.log('There was an error fetch auth', error.message);
        return;
      }
    };
    fetchUserAuth();
  }, []);

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
