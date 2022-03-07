import React from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { InformationCircleIcon } from "@heroicons/react/outline";

const Table = ({ columns, data, loading = false, selfPagination = false }) => {
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 10 },
      manualPagination: selfPagination,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { globalFilter, pageSize, pageIndex },
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
  } = tableInstance;

  return (
    <div className="w-full">
      {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
      <div className="sm:hidden flex items-center bg-blue-300 text-blue-500 p-2 mt-5">
        <InformationCircleIcon className="h-6 w-6 mr-4" />
        <span>Please Swipe left to see the remaining fields</span>
      </div>
      <div className="flex w-full justify-between items-center my-3 sm:rounded-lg">
        <div className="">
          <select
            className="border border-gray-300 w-36 p-2"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={50}>50</option>
          </select>
        </div>
        <GlobalFilter
          setGlobalFilter={setGlobalFilter}
          globalFilter={globalFilter}
        />
      </div>
      {/* republican79@12 */}
      <div className="flex flex-col w-full">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 dark:border-gray-200 sm:rounded-none">
              <table
                className="min-w-full divide-y divide-gray-200"
                {...getTableProps({
                  className: "min-w-full w-full divide-y divide-gray-200",
                })}
              >
                <thead className="bg-gray-50">
                  {
                    // Loop over the header rows
                    headerGroups.map((headerGroup) => (
                      // Apply the header row props
                      <tr
                        {...headerGroup.getHeaderGroupProps({
                          className:
                            "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                        })}
                      >
                        {
                          // Loop over the headers in each row
                          headerGroup.headers.map((column) => (
                            // Apply the header cell props
                            <th
                              {...column.getHeaderProps(
                                column.getSortByToggleProps({
                                  className:
                                    "px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider",
                                })
                              )}
                            >
                              {
                                // Render the header
                                column.render("Header")
                              }
                            </th>
                          ))
                        }
                      </tr>
                    ))
                  }
                </thead>
                <tbody
                  {...getTableBodyProps({
                    className: "bg-white divide-y divide-gray-200",
                  })}
                >
                  {
                    // Loop over the table rows
                    page.map((row) => {
                      // Prepare the row for display
                      prepareRow(row);
                      return (
                        // Apply the row props
                        <tr
                          {...row.getRowProps({
                            className: "odd:bg-gray-50 hover:odd:bg-gray-100",
                          })}
                        >
                          {
                            // Loop over the rows cells
                            row.cells.map((cell) => {
                              // Apply the cell props
                              return (
                                <td
                                  {...cell.getCellProps({
                                    className: "px-3 py-4 whitespace-nowrap",
                                  })}
                                >
                                  {
                                    // Render the cell contents
                                    cell.render("Cell")
                                  }
                                </td>
                              );
                            })
                          }
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
              {!loading && data.length < 1 && (
                <div className="flex justify-center items-center h-full">
                  <div className="text-center text-gray-500">
                    <p className="text-xl">No data found</p>
                  </div>
                </div>
              )}
              {loading ? (
                <div className="flex justify-center items-center h-52 w-full p-6">
                  <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin mr-1" />
                </div>
              ) : null}
              {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
              <nav
                className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                aria-label="Pagination"
              >
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-700">
                    Showing
                    <span className="font-medium mx-2">
                      {pageSize * pageIndex + 1}
                    </span>
                    to
                    <span className="font-medium mx-2">
                      {pageSize * pageIndex + pageSize}
                    </span>
                    of
                    <span className="font-medium mx-2">
                      {pageSize * pageOptions.length}
                    </span>
                    results
                  </p>
                </div>
                <div className="flex-1 flex sm:justify-end">
                  <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className="relative disabled:cursor-not-allowed disabled:bg-gray-50 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    className="ml-3 relative disabled:cursor-not-allowed disabled:bg-gray-50 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;

const TWO_HUNDRED_MS = 200;

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, TWO_HUNDRED_MS);

  return (
    <input
      value={value || ""}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder={`Search`}
      className="p-2 border border-gray-300"
    />
  );
}
