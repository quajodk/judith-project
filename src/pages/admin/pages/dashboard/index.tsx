import { GiftIcon, TicketIcon } from "@heroicons/react/outline";
import React from "react";
import OverviewCard from "../../components/OverviewCard";

interface Props {}

const overview = [
  {
    title: "Products",
    count: 12,
    bgColor: "bg-pink-600",
    icon: <GiftIcon className="h-6 w-6" />,
  },
  {
    title: "Orders",
    count: 12,
    bgColor: "bg-pink-600",
    icon: <TicketIcon className="h-6 w-6" />,
  },
];

const DashboardPage = (props: Props) => {
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

      {/* Projects list (only on smallest breakpoint) */}
      <div className="mt-10 sm:hidden">
        <div className="px-4 sm:px-6">
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
            Orders
          </h2>
        </div>
        <ul className="mt-3 border-t border-gray-200 divide-y divide-gray-100"></ul>
      </div>

      {/* Projects table (small breakpoint and up) */}
      <div className="hidden mt-8 sm:block">
        <div className="align-middle inline-block min-w-full border-b border-gray-200">
          <table className="min-w-full">
            <thead>
              <tr className="border-t border-gray-200">
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="lg:pl-2">Orders</span>
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Members
                </th>
                <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last updated
                </th>
                <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100"></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
