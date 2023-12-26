import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import { getUser } from "../../services/actions/Registration";
import PropTypes from "prop-types";
import { getDataAuth } from "Selectors";
import { paths } from "Utils/paths";

export const ProtectedRoute = ({ element, onlyNotAuth = false, ...rest }) => {
  const { auth } = useSelector(getDataAuth);

  if (!auth && !onlyNotAuth) {
    return <Navigate to={paths.login} />;
  }

  if (auth && onlyNotAuth) {
    return <Navigate to={paths.home} />;
  }
  return element;
};

ProtectedRoute.propTypes = {
  props: PropTypes.node,
  onlyNotAuth: PropTypes.bool,
  children: PropTypes.node,
};
