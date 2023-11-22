import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
// import { getUser } from "../../services/actions/Registration";
import PropTypes from "prop-types";
import { getDataAuth } from "Selectors";
import { getUser } from "Action/authorization";

export const ProtectedRoute = ({ onlyAuth = false, element, ...rest }) => {
  console.log("onlyAuth", onlyAuth);
  const { auth } = useSelector(getDataAuth);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    console.log(auth, "реакция");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!auth && onlyAuth) {
    return (
      <Navigate
        to={{
          pathname: "/login",
          state: { from: location },
        }}
      />
    );
  }

  return element;
};

ProtectedRoute.propTypes = {
  props: PropTypes.node,
  onlyAuth: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
