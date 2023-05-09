import "../styles/GalleryPage.css";
import gallery1 from "../assets/gallery1.jpg";
import gallery2 from "../assets/gallery2.jpg";
import gallery3 from "../assets/gallery3.png";
import gallery4 from "../assets/gallery4.jpg";
import gallery5 from "../assets/gallery5.jpeg";
import gallery6 from "../assets/gallery6.jpg";
import gallery7 from "../assets/gallery7.png";
import gallery8 from "../assets/gallery8.jpg";
import gallery9 from "../assets/gallery9.png";
import gallery10 from "../assets/gallery10.jpeg";
import gallery11 from "../assets/gallery11.jpeg";
import gallery12 from "../assets/gallery12.jpg";

const GalleryPage = () => {
  return (
    <div>
      <h1 className="center">NFT Gallery</h1>
      <div className="container">
        <div className="img-grid">
          <img src={gallery1} />
          <img src={gallery2} />
          <img src={gallery3} />
          <img src={gallery4} />
          <img src={gallery5} />
          <img src={gallery6} />
          <img src={gallery7} />
          <img src={gallery8} />
          <img src={gallery9} />
          <img src={gallery10} />
          <img src={gallery11} />
          <img src={gallery12} />
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
