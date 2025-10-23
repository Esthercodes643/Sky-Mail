import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Inbox from './components/Inbox';
import SendEmail from './components/SendEmail';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Mail from './components/Mail';
import Body from './components/Body';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';
import { auth } from './firebase';
import { setAuthUser } from './redux/appSlice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Body />,
    children: [
      { path: '/', element: <Inbox /> },
      { path: '/mail/:id', element: <Mail /> },
    ],
  },
]);

function App() {
  const { authUser } = useSelector((store) => store.app);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setAuthUser({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        );
      }
    });
  }, [dispatch]);

  return (
   <div className='bg-[#F6F8FC] w-screen h-screen overflow-x-hidden'>

      {!authUser ? (
        <Login />
      ) : (
        <>
          <Navbar />  {/* ✅ Only one Navbar here */}
          <RouterProvider router={router} />
          <div className='fixed bottom-0 right-4 sm:right-20 z-50 w-[95%] sm:w-[30%] max-w-lg'>
           <SendEmail />
          </div>

        </>
      )}
    </div>
  );
}

export default App;
