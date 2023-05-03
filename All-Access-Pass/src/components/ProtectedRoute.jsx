
import PropTypes from 'prop-types';
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ path = "/", ...props }) => {
    const isAuth = isAuthenticated();

    if (isAuth) {
        return <Route {...props} path={path} />;
    } else {
        return (
            <Navigate
                to={{
                    pathname: "/login",
                    state: { from: path },
                }}
            />
        );
    }
};

ProtectedRoute.propTypes = {
    path: PropTypes.string.isRequired,
};

export default ProtectedRoute;
