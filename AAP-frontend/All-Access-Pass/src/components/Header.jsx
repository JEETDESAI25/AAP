import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/rewards">Rewards</Link>
        <Link to="/events">Events</Link>
      </nav>
    </header>
  );
};

export default Header;
