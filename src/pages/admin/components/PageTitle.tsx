import { ArrowLeftIcon } from "@heroicons/react/outline";
import React from "react";
import { useHistory, useRouteMatch } from "react-router";

interface Props {
  name: string;
}

const PageTitle = (props: Props) => {
  const { name } = props;
  const history = useHistory();
  const { path } = useRouteMatch();

  const isOrders = path.includes("orders");
  const isAddOrEdit = path.includes("add") || path.includes("edit");

  return (
    <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
          {name}
        </h1>
      </div>
      {(!isOrders || !isAddOrEdit) && (
        <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <button
            type="button"
            className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
            onClick={() => history.push(`/admin/en/products/add`)}
          >
            Add product
          </button>
        </div>
      )}
      {isAddOrEdit && (
        <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <button
            type="button"
            className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
            onClick={() => history.goBack()}
          >
            <ArrowLeftIcon className="h-5 w-5" /> Back
          </button>
        </div>
      )}
    </div>
  );
};

export default PageTitle;
