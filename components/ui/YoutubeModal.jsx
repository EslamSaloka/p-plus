

const YoutubeModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal">
          <button onClick={onClose} className="close-button">Close</button>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/watch?v=qaTB_u1THVs"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    );
  };

  export default YoutubeModal