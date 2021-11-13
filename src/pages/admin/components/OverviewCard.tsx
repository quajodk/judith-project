import React from "react";
import { Link } from "react-router-dom";
import { classNames } from "../../../utils";

interface Props {
  bgColor: string;
  icon: any;
  title: string;
  count: number;
}

const OverviewCard = ({ bgColor, icon, title, count = 0 }: Props) => {
  return (
    <li className="relative col-span-1 flex shadow-sm rounded-md">
      <div
        className={classNames(
          bgColor,
          "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
        )}
      >
        {icon}
      </div>
      <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
        <div className="flex-1 px-4 py-2 text-sm truncate">
          <Link
            to="#"
            className="text-gray-900 font-medium hover:text-gray-600"
          >
            {title}
          </Link>
          <p className="text-gray-500">{count}</p>
        </div>
      </div>
    </li>
  );
};

export default OverviewCard;
