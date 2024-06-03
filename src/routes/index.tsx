import { createBrowserRouter } from 'react-router-dom';
import LayoutNavBar from '../layout'; // Adjust the path as necessary
import Home from '../pages/home'; // Adjust the path as necessary
import Signin from '../pages/signin';
import Signup from '../pages/signup';
import Profilepage from '../pages/profile';
import ProtectedRoute from './protection';
import AdminProtection from './AdminProtection';
import UploadProduct from '../pages/upload-product';
import ForgotPassword from '../pages/forgotPassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <LayoutNavBar />
      </ProtectedRoute>
  ),
    children: [
      {
        index: true,
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/profile',
        element: <Profilepage />
      }
    ]
  },
  {
    path: '/upload-image',
    element: (
      <AdminProtection>
        <UploadProduct/>
      </AdminProtection>
    )
  },
  {
    path: "/signIn",
    element: <Signin />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  }
  
]);

export default router;
