import "../styles/RewardsPage.css";

const RewardPage = () => {
  const images = [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg",
    "https://example.com/image4.jpg",
    "https://example.com/image5.jpg",
    "https://example.com/image6.jpg",
  ];

  return (
    <div className="rewards-container">
      {images.map((image, index) => (
        <div
          key={index}
          className="reward-image"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}
    </div>
  );
};

export default RewardPage;
