import { GiftIcon, TicketIcon } from "@heroicons/react/outline";
import React, { useEffect, useRef } from "react";
import {
  getAllProducts,
  getOrders,
} from "../../../../redux/actions/appActions";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { columns } from "../../components/options";
import OverviewCard from "../../components/OverviewCard";
import Table from "../../components/Table";

interface Props {}

const DashboardPage = (props: Props) => {
  const { orders, loadingOrders, totalOrders, allProductTotal } =
    useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const init = useRef({ dispatch });

  useEffect(() => {
    const { dispatch } = init.current;
    dispatch(getOrders());
    dispatch(getAllProducts());
  }, []);

  const overview = [
    {
      title: "Products",
      count: allProductTotal,
      bgColor: "bg-pink-600",
      icon: <GiftIcon className="h-6 w-6" />,
    },
    {
      title: "Orders",
      count: totalOrders,
      bgColor: "bg-pink-600",
      icon: <TicketIcon className="h-6 w-6" />,
    },
  ];

  return (
    <div>
      {/* Overview */}
      <div className="px-4 mt-6 sm:px-6 lg:px-8">
        <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
          Overview
        </h2>
        <ul className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-3">
          {overview.map((item, i) => (
            <OverviewCard
              key={i + 1}
              bgColor={item.bgColor}
              count={item.count}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </ul>
      </div>

      {/* Projects table (small breakpoint and up) */}
      <div className="mt-8 px-4 sm:px-6">
        <Table columns={columns} data={orders} loading={loadingOrders} />
      </div>
    </div>
  );
};

export default DashboardPage;
