import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Sales from './pages/Sales';
import Orders from './pages/Orders';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <LandingPage />
          <Footer />
        </>
      )
    },
    {
      path: "/login",
      element: (
        <>
          
          <Login />
          
        </>
      ),
    },
    {
      path: "/sales",
      element: (
        <>
          <Navbar />
          <Sales />
          <Footer />
        </>
      )
    },
    {
      path: "/orders",
      element: (
        <>
          <Navbar />
          <Orders />
          <Footer />
        </>
      )
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
