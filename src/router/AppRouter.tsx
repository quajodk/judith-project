import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import PublicRoute from "./PublicRoute";

interface Props {}

const AppRouter = (props: Props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PublicRoute} />
        <Route path="/admin" component={AdminRoutes} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
