import { Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = (props) => {
  const isAuth = isAuthenticated();

  if (isAuth) {
    return <Route {...props} />;
  } else {
    return (
      <Navigate
        to={{
          pathname: "/",
        }}
      />
    );
  }
};

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
