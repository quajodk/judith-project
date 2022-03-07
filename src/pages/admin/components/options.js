import ActionMenu from "./ActionMenu";

export const columns = [
  {
    Header: "Order #",
    accessor: "order_number",
  },
  {
    Header: "Product",
    accessor: "",
  },
  {
    Header: "Quantity",
    accessor: "",
  },
  {
    Header: "Customer",
    accessor: "",
  },
  {
    Header: "Payment Status",
    accessor: "",
  },
  {
    Header: "Payment Method",
    accessor: "",
  },
  {
    Header: "Actions",
    accessor: "",
    Cell: ({ row }) => <ActionMenu order={row?.original} />,
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
