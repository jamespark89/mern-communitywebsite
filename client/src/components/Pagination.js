import { Link, NavLink } from "react-router-dom"

function Pagination({
  currentPage,
  setCurrentPage,
  limit,
  totalHouseNumber
}) {
  const totalPage = Math.ceil(totalHouseNumber / limit)
  const pages = []
  for (let i = 0; i < totalPage; i++) {
    pages.push(i)
  }
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
  }
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden"></div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span>{" "}
            to <span className="font-medium">{limit}</span>{" "}
            of{" "}
            <span className="font-medium">
              {totalHouseNumber}
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
            {pages.map((value, index) => (
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
            ))}

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
