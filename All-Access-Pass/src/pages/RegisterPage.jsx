import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../api/auth";
import "../styles/RegisterPage.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await registerUser(email, password);

      if (response.status === 200) {
        setSuccess("Registered Successfully");
      } else {
        const { error } = await response.json();
        setError(error);
      }
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
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
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
