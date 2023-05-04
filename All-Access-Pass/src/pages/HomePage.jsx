import "../styles/HomePage.css";
import home1 from "../assets/home1.jpg";
import home2 from "../assets/home2.png";
import home3 from "../assets/home3.jpg";
import home4 from "../assets/home4.jpg";

const HomePage = () => {
  return (
    <div>
      <h1 class="center">All-Access Pass</h1>
      <div id="captioned-gallery">
        <figure class="slider">
          <figure>
            <img src={home1} />
          </figure>
          <figure>
            <img src={home2} />
          </figure>
          <figure>
            <img src={home3} />
          </figure>
          <figure>
            <img src={home4} />
          </figure>
        </figure>
      </div>
    </div>
  );
};

export default HomePage;
