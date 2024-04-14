
import { Routes, Route } from 'react-router-dom'
import { publicRoutes, privateRoutes } from './routes';
import { DefaultLayout } from './components/Layouts'
import { NotFound } from './pages/NotFound';
import ScrollToTop from './helpers/ScrollToTop';
import { useEffect, useState } from 'react';

function App() {
  const [username, setUsername] = useState('Account')

  useEffect(() => {
    const fetchUserAuth = async () => {
        try {
            const url = '/api/v1/api/access/get-session'
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": import.meta.env.VITE_X_API_VERSION_KEY,
                },
                credentials: 'include',
                // body: JSON.stringify(data),
            });
            if (!res.ok) return

            const data = await res.json()
            console.log(data)
            // setSession(data.isValid)
            localStorage.setItem('session', data.isvalid);
            setUsername(data.username?.name || "GEST")
        } catch (error) {
            console.log('There was an error fetch auth', error.message)
            return
        }
    }
    fetchUserAuth()
  }, [])

  useEffect(() => {
    console.log('Username::', username);
  }, [username])

  return (
    <>
      <ScrollToTop />
      <Routes>
        {
          publicRoutes.map((route, index) => {
            const Layout = route.layout || DefaultLayout
            const Page = route.component
            return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
          })
        }
        <Route path="*" element={<DefaultLayout><NotFound /></DefaultLayout>} />
      </Routes>
    </>
  );
}

export default App;
