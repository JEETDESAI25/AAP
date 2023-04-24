import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import RewardsPage from "./pages/RewardsPage";
import EventPage from "./pages/EventPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  return (
    <>
      {isLoggedIn &&
        location.pathname !== "/" &&
        location.pathname !== "/register" && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <ProtectedRoute path="/home" element={<HomePage />} />
          <ProtectedRoute path="/gallery" element={<GalleryPage />} />
          <ProtectedRoute path="/rewards" element={<RewardsPage />} />
          <ProtectedRoute path="/events" element={<EventPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
