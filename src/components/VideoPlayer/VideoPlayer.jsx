"use client";

import YouTube from "react-youtube";
import { useState,useEffect } from "react";
import "@/app/globals.css"

const VideoPlayer = ({ youtubeId }) => {
  const [videoShow, setVideoShow] = useState(false);


  const handleButtonVideo = () => {
    setVideoShow((previous) => !previous);
  };
  const render = {
    width: "570",
    height: "250",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const VideoYoutube = () => {
    return (
      <div className=" max-w-2xl mx-auto">
        <div>
          <button onClick={handleButtonVideo} className="px-1 float-right rounded-t-sm font-extrabold">X</button>
        </div>
        <>
          <YouTube
            videoId={youtubeId}
            onReady={(e) => {
              e.target.pauseVideo();
            }}
            opts={render}
            className="youtubeContainer"/>      
        </>
      </div>
    );
  };

  const ButtonShowVideo = () => {
    return (
      <div className="my-3 lg:my-0 px-[5px] transition-all ease-in inline-block text-center text-sm lg:text-base hover:bg-main-accent hover:border-main-dark hover:text-main-dark border-[1px] w-fit border-main-accent text-main-accent">
        <button onClick={handleButtonVideo} >Show Trailer</button>
      </div>
    );
  };


  return videoShow ? <VideoYoutube /> : <ButtonShowVideo />;
};

export default VideoPlayer;
