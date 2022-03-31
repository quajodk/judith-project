import { EyeIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import Modal from "../../../components/Modal";
import ViewOrder from "./ViewOrder";

type Props = {
  order: Record<string, any>;
  className?: string;
};

const OrderActionMenu = ({
  order,
  className = "inline-flex items-center justify-start",
}: Props) => {
  const [viewModal, setViewModal] = useState(false);

  const actions = [
    {
      title: "View",
      icon: <EyeIcon className="h-5 w-5 text-indigo-400" aria-hidden="true" />,
      onClick: () => {
        setViewModal(true);
      },
    },
  ];

  return (
    <>
      <div
        className={`bg-white ${className} text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 rounded-md border border-gray-100 divide-x divide-gray-100`}
      >
        {actions.map((action, index: number) => (
          <button
            key={index + 1}
            type="button"
            className="px-3 py-2 border border-gray-100 hover:shadow-md shadow-none flex"
            onClick={action.onClick}
          >
            {action?.icon}{" "}
            <span className="text-sm mx-1 font-semibold">{action?.title}</span>
          </button>
        ))}
      </div>
      <Modal open={viewModal} setopen={() => setViewModal(!viewModal)}>
        <ViewOrder order={order} closeModal={() => setViewModal(!viewModal)} />
      </Modal>
    </>
  );
};

export default OrderActionMenu;
