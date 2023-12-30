import { Navigate } from "react-router-dom";

import { getDataAuth } from "../../redux/Selectors";
import { paths } from "Utils/paths";

import { TProtectedRouteTypes, useAppSelector } from "../../typesData";



export const ProtectedRoute = ({ element, onlyNotAuth = false, ...rest }: TProtectedRouteTypes) => {
  const { auth } = useAppSelector(getDataAuth);

  if (!auth && !onlyNotAuth) {
    return <Navigate to={paths.login} />;
  }

  if (auth && onlyNotAuth) {
    return <Navigate to={paths.home} />;
  }
  return element;
};

