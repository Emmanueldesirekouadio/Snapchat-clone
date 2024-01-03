import React, { useEffect } from "react";
import "./App.css";
import WebcamCapture from "./WebcamCapture";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Mise à jour de l'import
import Preview from "./Preview";
import Chats from "./Chats";
import ChatView from "./ChatView";
import { login, logout, selectUser } from "./features/appSlice";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const { displayName, photoURL, uid } = authUser;
        dispatch(
          login({ username: displayName, profilePic: photoURL, id: uid })
        );
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className='app'>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              className='app__logo'
              src='https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg'
              alt=''
            />
            <div className='app__body'>
              <div className='app__bodyBackground'>
                <Routes>
                  <Route path='/chats/view' element={<ChatView />} />
                  <Route path='/chats' element={<Chats />} />
                  <Route path='/preview' element={<Preview />} />
                  <Route index element={<WebcamCapture />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
