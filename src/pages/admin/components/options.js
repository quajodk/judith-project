import _ from "lodash";
import OrdersActionMenu from "./OrdersActionMenu";
import ActionMenu from "./ActionMenu";

export const columns = [
  {
    Header: "Order #",
    accessor: "id",
  },
  {
    Header: "Product",
    accessor: "product.title",
    Cell: ({ row }) => <OrderProductRender row={row} />,
  },
  {
    Header: "Quantity",
    accessor: "products.quantity",
    Cell: ({ row }) => <OrderQtyRender row={row} />,
  },
  {
    Header: "Customer",
    accessor: "customer.name",
    Cell: ({ row }) => <CustomerRender row={row} />,
  },
  {
    Header: "Payment Status",
    accessor: "paymentStatus",
    Cell: ({ value }) => {
      return (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-md ${
            value === "success"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {_.startCase(_.toLower(value))}
        </span>
      );
    },
  },
  {
    Header: "Payment Method",
    accessor: "paymentMethod",
    Cell: ({ value }) => {
      return (
        <span
          className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-md text-gray-700`}
        >
          {_.startCase(_.toLower(value))}
        </span>
      );
    },
  },
  {
    Header: "Actions",
    accessor: "",
    Cell: ({ row }) => <OrdersActionMenu order={row?.original} />,
  },
];

export const productColumns = [
  {
    Header: "Product",
    accessor: "",
    Cell: ({ row }) => {
      return <ProductRender row={row} />;
    },
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Currency",
    accessor: "currency",
  },
  {
    Header: "Availability",
    accessor: "isAvailable",
    Cell: ({ value }) => {
      return (
        <span
          className={`px-2 text-sm rounded-md font-medium  ${
            value ? "bg-green-200 text-green-600" : "bg-gray-300 text-gray-700"
          }`}
        >
          {value ? "In Stock" : "Out of Stock"}
        </span>
      );
    },
  },

  {
    Header: "Actions",
    Cell: ({ row }) => <ActionMenu order={row?.original} />,
  },
];

const ProductRender = ({ row }) => {
  return (
    <div className="flex items-center">
      <div className="mr-2">
        <img
          src={row.original.imageSrc}
          alt={row.original.imageAlt}
          className="h-12 w-12 rounded-md"
        />
      </div>
      <span className="text-sm font-medium">{row.original.title}</span>
    </div>
  );
};

const CustomerRender = ({ row }) => {
  return (
    <div className="flex flex-col">
      <span className="font-medium text-sm">{row.original.customer?.name}</span>
      <span className="text-xs">{row.original.customer?.email}</span>
    </div>
  );
};

const OrderProductRender = ({ row }) => {
  return (
    <div className="flex flex-col">
      {row.original.products.map((product, index) => (
        <span className="font-medium text-sm" key={index}>
          {product?.product.title}
        </span>
      ))}
    </div>
  );
};

const OrderQtyRender = ({ row }) => {
  return (
    <div className="flex flex-col">
      {row.original.products.reduce((acc, product) => {
        return acc + product.quantity;
      }, 0)}
    </div>
  );
};
