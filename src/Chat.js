import React from "react";
import "./Chat.css";
import { Avatar } from "@material-ui/core";
import ReactTimeago from "react-timeago";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import { selectImage } from "./features/appSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Mise à jour de l'import
import { db } from "./firebase";

function Chat({ id, username, timestamp, read, imageUrl, profilePic }) {
  const dispatch = useDispatch();

  // Utilisez useNavigate à la place de useHistory
  const navigate = useNavigate();

  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      db.collection("posts").doc(id).set(
        {
          read: true,
        },
        { merge: true }
      );
      // Utilisez navigate au lieu de history.push
      navigate("/chats/view");
    }
  };

  return (
    <div onClick={open} className='chat'>
      <Avatar className='chat__avatar' src={profilePic} />
      <div className='chat__info'>
        <h4>{username}</h4>
        <p>
          {!read && "Cliquez pour afficher -"}{" "}
          <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
        </p>
      </div>
      {!read && <StopRoundedIcon className='chat__readIcon' />}
    </div>
  );
}

export default Chat;
