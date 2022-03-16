/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import PageTitle from "./components/PageTitle";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import AdminProductsPage from "./pages/products";
import OrdersPage from "./pages/orders";
import { navigation } from "../../utils";
import AddProduct from "./components/AddProduct";
import { useAppDispatch } from "../../redux/hooks";
import { persistUser } from "../../redux/actions/appActions";
import { setDone } from "../../redux/reducers/app/appReducer";

export default function Dashboard() {
  const { path } = useRouteMatch();
  const dispatch = useAppDispatch();
  const init = useRef({ dispatch });

  useEffect(() => {
    const { dispatch } = init.current;
    dispatch(persistUser());
    dispatch(setDone(false));
  }, []);

  return (
    <>
      <div className="min-h-screen overflow-x-hidden">
        <Sidebar />
        {/* Main column */}
        <div className="lg:pl-64 flex flex-col">
          <div>
            <Switch>
              {/* Page title & actions */}

              {navigation.map((item, i) => (
                <Route
                  key={i + 1}
                  path={`${path}/${item.path}`}
                  exact={item.exact}
                  render={(props) => <PageTitle name={item.name} {...props} />}
                />
              ))}
              <Route
                path={`${path}/add`}
                render={(props) => (
                  <PageTitle name={"Add Product"} {...props} />
                )}
              />
            </Switch>
          </div>
          <main className="overflow-x-hidden w-full h-full">
            <Switch>
              <Route
                exact
                path="/admin/en/dashboard"
                component={DashboardPage}
              />
              <Route
                exact
                path="/admin/en/products"
                component={AdminProductsPage}
              />
              <Route
                exact
                path="/admin/en/products/add"
                component={AddProduct}
              />
              <Route
                path="/admin/en/products/edit/:id"
                component={AddProduct}
              />
              <Route exact path="/admin/en/orders" component={OrdersPage} />
              <Redirect from="/admin/en" to="/admin/en/dashboard" />
            </Switch>
          </main>
        </div>
      </div>
    </>
  );
}
