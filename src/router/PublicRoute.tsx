import React from "react";
import { Route, Switch } from "react-router-dom";

import CheckoutForm from "../components/CheckoutForm";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import HomePage from "../pages/home";
import ProductPage from "../pages/product";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Notification from "../components/Notification";
import { closeNotification } from "../redux/actions/appActions";

interface Props {}

const PublicRoute = (props: Props) => {
  const dispatch = useAppDispatch();
  const { notificationMessage, notify } = useAppSelector((state) => state.app);

  return (
    <div>
      <Navbar />
      <Notification
        show={notify}
        setShow={() => dispatch(closeNotification())}
        message={notificationMessage ?? {}}
      />
      <Switch>
        <Route path="/product/:id" component={ProductPage} />
        <Route path="/checkout/:id" component={CheckoutForm} />
        <Route path="/" component={HomePage} />
      </Switch>

      <Footer />
    </div>
  );
};

export default PublicRoute;
