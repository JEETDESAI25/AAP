import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../api/auth";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await loginUser(email, password);

      if (response.status === 200) {
        const { token } = await response.json();
        localStorage.setItem("authToken", token);
        // Redirect the user to the home page or any other protected route
      } else {
        const { error } = await response.json();
        setError(error);
      }
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <div className="error">{error}</div>}
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
