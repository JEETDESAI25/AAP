import "../styles/GalleryPage.css";

const GalleryPage = () => {
  return (
    <div>
      <h1>NFT Gallery</h1>
    </div>
    </div>
    <><h2>Buy Football Tickets</h2><p>Join us for the upcoming football match by purchasing your tickets now.</p><form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="tickets">Number of tickets:</label>
        <input type="number" id="tickets" name="tickets" min="1" max="10" />
        <button type="submit">Buy Now</button>
      </form></>
  </div>
  );
};

export default GalleryPage;
