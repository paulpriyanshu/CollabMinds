const VideoCard = ({ image, title }:any) => {
  return (
    <div className="m-10 card-container q duration-50 ease-in-out hover:scale-110 transition-transform duration-350">
      <div className="w-80 h-60 m-4 flex flex-col items-center justify-center border-none bg-black rounded-2xl shadow-xl">
      <img src={image} alt="Video Thumbnail" className="w-full h-40 object-cover" />
      <h3 className="mt-2 text-xl font-sans font-bold  break-words p-2 text-center text-white">{title}</h3>
    </div>
    </div>
  );
};

export default VideoCard;