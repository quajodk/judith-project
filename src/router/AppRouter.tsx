import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthWrapper from "../layouts/AuthWrapper";
import AdminRoutes from "./AdminRoutes";
import PublicRoute from "./PublicRoute";

interface Props {}

const AppRouter = (props: Props) => {
  return (
    <AuthWrapper>
      <Router>
        <Switch>
          <Route path="/admin" component={AdminRoutes} />
          <Route path="/" component={PublicRoute} />
        </Switch>
      </Router>
    </AuthWrapper>
  );
};

export default AppRouter;
