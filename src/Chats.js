// Importez useNavigate à la place de useHistory
import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Chats.css";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { auth, db } from "./firebase";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/appSlice";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useNavigate } from "react-router-dom"; // Mise à jour de l'import
import { resetCameraImage } from "./features/cameraSlice";

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // Utilisez useNavigate à la place de useHistory
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

    return () => {
      unsubscribe(); // Nettoyer l'abonnement lorsque le composant est démonté
    };
  }, []); // Pas de dépendances, car nous n'utilisons pas de variables dans l'effet

  const takeSnap = () => {
    dispatch(resetCameraImage());
    // Utilisez navigate au lieu de history.push
    navigate("/");
  };

  return (
    <div className='chats'>
      <div className='chats__header'>
        <Avatar
          src={user?.profilePic}
          onClick={() => auth.signOut()}
          className='chats__avatar'
        />
        <div className='chats__search'>
          <SearchIcon className='chats__searchIcon' />
          <input placeholder='Amis' type='text' />
        </div>
        <ChatBubbleIcon className='chats__chatIcon' />
      </div>

      <div className='chats__posts'>
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
      </div>

      <RadioButtonUncheckedIcon
        className='chats__takePicIcon'
        onClick={takeSnap}
        fontSize='large'
      />
    </div>
  );
}

export default Chats;
