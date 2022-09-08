import { Link, NavLink } from "react-router-dom"

function Pagination({
  currentPage,
  limit,
  totalDataNumber
}) {
  const totalPage = Math.ceil(totalDataNumber / limit)
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
  }
  return (
    <div className="flex items-center justify-between  bg-white px-4 py-3 sm:px-6 mt-5">
      <div className="flex flex-1 justify-between sm:hidden">
        <Link
          to={
            currentPage > 1
              ? `?page=${currentPage - 1}`
              : `?page=1`
          }
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </Link>
        <Link
          to={
            currentPage < totalPage
              ? `?page=${currentPage + 1}`
              : `?page=${totalPage}`
          }
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </Link>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(currentPage - 1) * limit + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {(currentPage - 1) * limit + 8 >
              totalDataNumber
                ? totalDataNumber
                : (currentPage - 1) * limit + 8}
            </span>{" "}
            of{" "}
            <span className="font-medium">
              {totalDataNumber}
            </span>{" "}
            results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <Link
              to={
                currentPage > 1
                  ? `?page=${currentPage - 1}`
                  : `?page=1`
              }
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Previous</span>
              {"<"}
            </Link>
            {totalPage < 8 ? (
              Array(totalPage)
                .fill(null)
                .map((value, index) => (
                  <NavLink
                    key={index}
                    to={`?page=${index + 1}`}
                    className={() =>
                      classNames(
                        currentPage === index + 1
                          ? "border-indigo-500 bg-indigo-50 text-indigo-600 focus:z-20"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50",
                        "relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium"
                      )
                    }
                  >
                    {index + 1}
                  </NavLink>
                ))
            ) : (
              <>
                {currentPage < 3 ? null : (
                  <>
                    <NavLink
                      to={`?page=1`}
                      className={() =>
                        classNames(
                          currentPage === 1
                            ? "border-indigo-500 bg-indigo-50 text-indigo-600 focus:z-20"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50",
                          "relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium"
                        )
                      }
                    >
                      {1}
                    </NavLink>
                    <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                      ...
                    </span>
                  </>
                )}

                {Array(3)
                  .fill(null)
                  .map((value, index) => (
                    <NavLink
                      key={index}
                      to={`?page=${
                        currentPage >= totalPage
                          ? totalPage - 2 + index
                          : currentPage < 3
                          ? index + 1
                          : currentPage - 1 + index
                      }`}
                      className={() =>
                        classNames(
                          currentPage ===
                            (currentPage >= totalPage
                              ? totalPage - 2 + index
                              : currentPage < 3
                              ? index + 1
                              : currentPage - 1 + index)
                            ? "border-indigo-500 bg-indigo-50 text-indigo-600 focus:z-20"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50",
                          "relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium"
                        )
                      }
                    >
                      {currentPage >= totalPage
                        ? totalPage - 2 + index
                        : currentPage < 3
                        ? index + 1
                        : currentPage - 1 + index}
                    </NavLink>
                  ))}
                {currentPage < totalPage - 1 ? (
                  <>
                    <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                      ...
                    </span>
                    <NavLink
                      to={`?page=${totalPage}`}
                      className={() =>
                        classNames(
                          currentPage === totalPage
                            ? "border-indigo-500 bg-indigo-50 text-indigo-600 focus:z-20"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50",
                          "relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium"
                        )
                      }
                    >
                      {totalPage}
                    </NavLink>
                  </>
                ) : null}
              </>
            )}

            <Link
              to={
                currentPage < totalPage
                  ? `?page=${currentPage + 1}`
                  : `?page=${totalPage}`
              }
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Next</span>
              {">"}
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
