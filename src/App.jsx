import React  from 'react'
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import Layout from './components/Layout'
import HostLayout from './components/HostLayout'
import Home from './pages/Home'
import About from './pages/About'
import Login, { action as loginAction } from './pages/Login'
import Register, { action as registerAction } from './pages/Register'
import Vans, { loader as vansLoader } from './pages/Vans/Vans'
import VanDetail, {loader as vansDetailLoader} from './pages/Vans/VanDetail'
import Dashboard, {loader as hostVansLoaderDashboard} from './pages/Host/Dashboard'
import Income from './pages/Host/Income'
import Reviews from './pages/Host/Reviews'
import AddHostVan, { action as addVanAction } from './pages/Host/AddHostVan'
import HostVans, {loader as hostVansLoader} from './pages/Host/HostVans'
import HostVanDetail, {loader as hostDetailLoader} from './pages/Host/HostVanDetail'
import HostVanInfo from './pages/Host/HostVanInfo'
import HostVanPhotos from './pages/Host/HostVanPhotos'
import HostVanPricing from './pages/Host/HostVanPricing'
import NotFound from './pages/NotFound'
import AuthRequired from './components/AuthRequired'
import { AuthProvider } from './components/AuthContext'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'vans',
        element: <Vans />,
        loader: vansLoader,
      },
      {
        path: 'vans/:id',
        element: <VanDetail />,
        loader: vansDetailLoader
      },
      {
        path: 'register',
        action: registerAction,
        element: <Register />,
      },
      {
        path: 'login',
        action: loginAction,
        element: <Login />,
      },
      {
        element: <AuthRequired />,
        children: [
          { path: 'host',
            element: <HostLayout />,
            children: [
          {
            index: true,
            element: <Dashboard />,
            loader: hostVansLoaderDashboard
          },
          {
            path: 'income', 
            element: <Income />,
          },
          {
            path: 'reviews',
            element: <Reviews />,
          },
          {
            path: 'addvan',
            element: <AddHostVan />,
            action: addVanAction
          },
          {
            path: 'vans',
            element: <HostVans />,
            loader: hostVansLoader
          },
          {
            path: 'vans/:id',
            element: <HostVanDetail />,
            loader: hostDetailLoader,
            children: [
              {
                index: true,
                element: <HostVanInfo />,
              },
              {
                path: 'pricing',
                element: <HostVanPricing />,
              },
              {
                path: 'photos',
                element: <HostVanPhotos />,
              },
            ],
          },
        ],
      }]},
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
  


function App() {
  return (
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App;