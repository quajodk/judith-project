import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { IUser } from "../utils/models";

interface Props extends RouteProps {
  children: React.ReactNode;
  user: IUser | null;
}

const PrivateRoute = ({ children, user, ...rest }: Props) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/admin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
