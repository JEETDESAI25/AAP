import "../styles/RewardsPage.css";

const RewardsPage = () => {
  return (
    <div className="rewards-page">
      <h1>Redeem Rewards</h1>
      <p>As a member of our community, you can redeem your loyalty points for exclusive rewards:</p>
      <ul>
        <li>A signed copy of our latest book</li>
        <li>Access to a private networking event</li>
        <li>A limited edition NFT</li>
      </ul>
      <p>To redeem your points, simply fill out the form below:</p>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="points">Number of points to redeem:</label>
        <input type="number" id="points" name="points" min="1" max="100" />
        <button type="submit">Redeem Now</button>
      </form>
    </div>
  );
};

export default RewardsPage;
