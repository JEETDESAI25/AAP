import { Outlet, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const isAuth = isAuthenticated();

  if (isAuth) {
    return <Outlet>{children}</Outlet>;
  } else {
    return (
      <Navigate
        to={{
          pathname: "/login",
        }}
      />
    );
  }
};

ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ProtectedRoute;
