import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Layout from './Layout.jsx'
import { BrowserRouter, Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider, } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AboutUs from './pages/AboutUs.jsx'
import './index.css'
import MainContextProvider, { MainContext } from './contexts/context.jsx'
import Profile from './pages/Profile.jsx'
import WriteReview from './pages/WriteReview.jsx'
import Browse from './pages/Browse.jsx'
import Book from './pages/Book.jsx'
import Login from './pages/Login.jsx'
const router = createBrowserRouter(
   createRoutesFromElements(
     <Route path='/' element= {<Layout />}>
       <Route path='' element={ <Home />} />
       <Route path='about' element={ <AboutUs />} />
       <Route path='profile' element={ <Profile />} />
       <Route path='browse' element={ <Browse />} />
       <Route path='write-review' element={ <WriteReview/>} />
       <Route path='book/:bookId' element={ <Book/> } />
       <Route path='login' element={ <Login/> } />
     </Route>
   )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainContextProvider>
    <RouterProvider router={router} />
    </MainContextProvider>
  </StrictMode>,
)
