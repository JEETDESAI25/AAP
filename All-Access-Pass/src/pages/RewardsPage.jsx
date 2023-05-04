import "../styles/RewardsPage.css";

const RewardPage = () => {
  const images = [
    "https://i.etsystatic.com/8759390/r/il/c2681b/2403354424/il_1588xN.2403354424_gkdf.jpg",
    "https://i.etsystatic.com/29958485/r/il/c83a85/4777163463/il_1588xN.4777163463_sxpr.jpg",
    "https://i.etsystatic.com/29958485/r/il/9c2cee/4921473047/il_1588xN.4921473047_9b2o.jpg",
    "https://i.etsystatic.com/19684008/r/il/7201b8/4690284952/il_1588xN.4690284952_4ffy.jpg",
    "https://i.etsystatic.com/42328365/r/il/f83b6b/4830239025/il_1588xN.4830239025_jk48.jpg",
    "https://i.etsystatic.com/42328365/r/il/b76f95/4781967964/il_1588xN.4781967964_lyu7.jpg",
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
