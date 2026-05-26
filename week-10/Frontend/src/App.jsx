import React from 'react'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import ForgotPassword from './components/ForgotPassword'
import AddArticle from './components/AddArticle'
import UserDashboard from './components/UserDashboard'
import AuthorDashboard from './components/AuthorDashboard'
import AdminDashboard from './components/AdminDashboard'
import ArticleByID from './components/ArticleByID'
import EditArticle from './components/EditArticle'
import WriteArticle from './components/WriteArticle'
import AuthorArticles from './components/AuthorArticles'
import Articles from './components/Articles'
import Footer from './components/Footer'
import UsersList from './components/UsersList'
import AuthorsList from './components/AuthorsList'
import {createBrowserRouter, RouterProvider} from 'react-router'
import RootLayout from './components/RootLayout'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'
import Unauthorized from './components/Unauthorized'
import ErrorPage from './components/ErrorPage'
function App() {
  const routerobj=createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      errorElement:<ErrorPage/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/register',
          element:<Register/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/forgot-password',
          element:<ForgotPassword/>
        },
         {
          path: "user-profile",
          element: 
          <ProtectedRoute role={["USER"]}>
            <UserDashboard />
          </ProtectedRoute>,
        },{
          path:'/author-profile',
          element:<ProtectedRoute role={["AUTHOR"]}><AuthorDashboard/></ProtectedRoute>,
          children: [
            {
              path: 'articles',
              element: <AuthorArticles />
            },
            {
              path: 'write-article',
              element: <WriteArticle />
            }
          ]
        },{
          path:'/admin-profile',
          element:<ProtectedRoute role={["ADMIN"]}><AdminDashboard/></ProtectedRoute>,
          children: [
            {
              path: 'users',
              element: <UsersList />
            },
            {
              path: 'authors',
              element: <AuthorsList />
            }
          ]
        },{
          path:'/article/:id',
          element:<ArticleByID/>
        },{
          path:'/edit-article/:id',
          element:<EditArticle/>
        }
        ,{
          path:'/Unauthorized',
          element:<Unauthorized/>
        },
      ]
    }
  ])
  return (
    <>{/* react fragment */}
    <Toaster position='top-center' reverseOrder={false}/>
    <RouterProvider router={routerobj}/>
    </>
  )
}

export default App