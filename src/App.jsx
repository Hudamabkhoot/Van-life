import React  from 'react'
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import Layout from './components/Layout'
import HostLayout from './components/HostLayout'
import SettingsLayout from './components/SettingsLayout'
import Home, { loader as homeLoader } from './pages/Home'
import About from './pages/About'
import Login, { action as loginAction } from './pages/Login'
import Register, { action as registerAction } from './pages/Register'
import Vans, { loader as vansLoader } from './pages/Vans/Vans'
import VanDetail, {loader as vansDetailLoader } from './pages/Vans/VanDetail'
import Dashboard  from './pages/Host/Dashboard'
import Income from './pages/Host/Income'
import Reviews from './pages/Host/Reviews'
import Profile from './pages/Host/Settings/Profile'
import Account from './pages/Host/Settings/Account'
import AddHostVan, { action as addVanAction } from './pages/Host/AddHostVan'
import HostVans  from './pages/Host/HostVans'
import HostVanDetail, {loader as hostDetailLoader} from './pages/Host/HostVanDetail'
import HostVanInfo, { loader as VanInfoLoader } from './pages/Host/HostVanInfo'
import HostVanPhotos from './pages/Host/HostVanPhotos'
import HostVanPricing from './pages/Host/HostVanPricing'
import { AuthProvider } from './components/AuthContext';
import NotFound from './pages/NotFound'
import AuthRequired from './components/AuthRequired'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader
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
        loader: vansDetailLoader,
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
            element: <Dashboard />
          },
          {
            path: 'income', 
            element: <Income />,
          },
          {
            path: 'reviews',
            element: <Reviews />
          },
          {
            path: 'settings',
            element: <SettingsLayout />,
            children: [
              {
                index: true,
                element: <Profile />
              },
              {
                path: 'account',
                element: <Account />,
              },
            ],
          },
          {
            path: 'addvan',
            element: <AddHostVan />,
            action: addVanAction
          },
          {
            path: 'vans',
            element: <HostVans />
          },
          {
            path: 'vans/:id',
            element: <HostVanDetail />,
            loader: hostDetailLoader,
            children: [
              {
                index: true,
                element: <HostVanInfo />,
                loader: VanInfoLoader
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