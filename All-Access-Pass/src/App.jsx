import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import RewardsPage from "./pages/RewardsPage";
import EventPage from "./pages/EventPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/events" element={<EventPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
