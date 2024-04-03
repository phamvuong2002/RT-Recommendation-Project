
import { Routes, Route } from 'react-router-dom'
import { publicRoutes, privateRoutes } from './routes';
import { DefaultLayout } from './components/Layouts'

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
      </Routes>
    </>
  );
}

export default App;
