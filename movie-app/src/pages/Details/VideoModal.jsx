import React from "react";
import ReactPlayer from "react-player/youtube";

function VideoModal({ setShowVideoModal, videoId ,setVideoId}) {
    const closeModal =()=>{
        setShowVideoModal(false)
        setVideoId(null)
    }
  return (
    <div
      className="fixed top-0 bottom-0 right-0 backdrop-blur-[2px] left-0  h-full z-[4]"
      onClick={closeModal}
    >
      <div className="w-full h-full flex justify-center items-center">
        <div className="min-[768px]:w-[60%] min-[768px]:h-[500px] w-[93%] h-[300px] relative ">
          <span className="text-white absolute right-0 top-[-27px] cursor-pointer text-[19px] "
          onClick={closeModal}
          >close</span>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            controls
            width="100%"
            height="100%"
            // playing={true}
          />
        </div>
      </div>
    </div>
  );
}

export default VideoModal;
