
import { Routes, Route } from 'react-router-dom'
import { publicRoutes, privateRoutes } from './routes';
import { DefaultLayout } from './components/Layouts'
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <>
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
