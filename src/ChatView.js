import React, { useEffect, useCallback } from "react";
import "./ChatView.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectSelectedImage } from "./features/appSlice";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function ChatView() {
  const selectedImage = useSelector(selectSelectedImage);
  const navigate = useNavigate();

  const exit = useCallback(() => {
    navigate("/chats");
  }, [navigate]);

  useEffect(() => {
    if (!selectedImage) {
      exit();
    }

    // La fonction de nettoyage, si nécessaire
    return () => {
      // Nettoyer les ressources ou les abonnements si nécessaire
    };
  }, [selectedImage, exit]);

  return (
    <div className='chatView'>
      <img src={selectedImage} onClick={exit} alt='' />
      <div className='chatView__timer'>
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={6}
          size={50}
          colors={[
            ["#004777", 0.33],
            ["#F78801", 0.33],
            ["#A30000", 0.33],
          ]}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              exit();
            }
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}

export default ChatView;
