import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../pages/admin";
import AdminLogin from "../pages/admin/components/AdminLogin";
import { useAppSelector } from "../redux/hooks";
import PrivateRoute from "./PrivateRoute";

interface Props {}

const AdminRoutes = (props: Props) => {
  const { adminUser } = useAppSelector((state) => state.app);

  return (
    <div className="h-screen w-screen bg-gray-50">
      <Switch>
        <Route exact path="/admin/login" component={AdminLogin} />
        <PrivateRoute path="/admin/en" user={adminUser}>
          <Dashboard />
        </PrivateRoute>
        <Redirect from="/admin" to="/admin/login" />
      </Switch>
    </div>
  );
};

export default AdminRoutes;
