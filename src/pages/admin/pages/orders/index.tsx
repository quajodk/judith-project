import React, { useEffect, useRef } from "react";
import { getOrders } from "../../../../redux/actions/appActions";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { columns } from "../../components/options";
import Table from "../../components/Table";

interface Props {}

const OrdersPage = (props: Props) => {
  const { orders, loadingOrders } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const init = useRef({ dispatch });

  useEffect(() => {
    const { dispatch } = init.current;
    dispatch(getOrders());
  }, []);

  return (
    <div className="mt-8 px-4 sm:px-6">
      {orders && (
        <Table columns={columns} data={orders} loading={loadingOrders} />
      )}
    </div>
  );
};

export default OrdersPage;
