import { Navigate } from "react-router-dom";

import { selectAuth } from "../../redux/Selectors";
import { paths } from "Utils/paths";

import { TProtectedRouteTypes, useAppSelector } from "../../typesData";



const ProtectedRoute = ({ element, onlyNotAuth = false, ...rest }: TProtectedRouteTypes) => {
  const auth = useAppSelector(selectAuth);

  if (!auth && !onlyNotAuth) {
    return <Navigate to={paths.login} />;
  }

  if (auth && onlyNotAuth) {
    return <Navigate to={paths.home} />;
  }
  return element;
};

export const Auth = ProtectedRoute;
export const NotAuth = ({ element }: { element: JSX.Element }) => (
  <ProtectedRoute onlyNotAuth element={element} />
);
