import {
  BrowserRouter as Router,
  useLocation,
  useRoutes,
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

  const routes = useRoutes([
    { path: "/", element: <LoginPage /> },

    { path: "/register", element: <RegisterPage /> },
    { path: "/home", element: isLoggedIn ? <HomePage /> : <ProtectedRoute /> },
    {
      path: "/gallery",
      element: isLoggedIn ? <GalleryPage /> : <ProtectedRoute />,
    },
    {
      path: "/rewards",
      element: isLoggedIn ? <RewardsPage /> : <ProtectedRoute />,
    },
    {
      path: "/events",
      element: isLoggedIn ? <EventPage /> : <ProtectedRoute />,
    },
  ]);

  return (
    <>
      {isLoggedIn &&
        location.pathname !== "/" &&
        location.pathname !== "/register" && <Header />}
      <main>{routes}</main>
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
