import { NavLink, useSearchParams } from "react-router-dom"

function Pagination({
  currentPage,
  limit,
  totalDataNumber
}) {
  const totalPage = Math.ceil(totalDataNumber / limit)
  let [searchParams] = useSearchParams()
  let updatedSearchParams = new URLSearchParams(
    searchParams.toString()
  )
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
  }
  //Custom Link for pagination
  //Update only page params
  function PageLink({ pageNumber, ...props }) {
    updatedSearchParams.set("page", pageNumber)
    return (
      <NavLink
        to={`?${updatedSearchParams.toString()}`}
        {...props}
      />
    )
  }

  return (
    <div className="flex items-center justify-between  bg-white px-4 py-3 sm:px-6 mt-5">
      <div className="flex flex-1 justify-between sm:hidden">
        <PageLink
          pageNumber={currentPage > 1 ? currentPage - 1 : 1}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </PageLink>
        <PageLink
          pageNumber={
            currentPage < totalPage
              ? currentPage + 1
              : totalPage
          }
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </PageLink>
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
              {(currentPage - 1) * limit + limit >
              totalDataNumber
                ? totalDataNumber
                : (currentPage - 1) * limit + limit}
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
            <PageLink
              pageNumber={
                currentPage > 1 ? currentPage - 1 : 1
              }
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Previous</span>
              {"<"}
            </PageLink>
            {totalPage < 8 ? (
              Array(totalPage)
                .fill(null)
                .map((value, index) => (
                  <PageLink
                    key={index}
                    pageNumber={index + 1}
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
                  </PageLink>
                ))
            ) : (
              <>
                {currentPage < 3 ? null : (
                  <>
                    <PageLink
                      pageNumber={1}
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
                    </PageLink>
                    <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                      ...
                    </span>
                  </>
                )}

                {Array(3)
                  .fill(null)
                  .map((value, index) => (
                    <PageLink
                      key={index}
                      pageNumber={
                        currentPage >= totalPage
                          ? totalPage - 2 + index
                          : currentPage < 3
                          ? index + 1
                          : currentPage - 1 + index
                      }
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
                    </PageLink>
                  ))}
                {currentPage < totalPage - 1 ? (
                  <>
                    <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                      ...
                    </span>
                    <PageLink
                      pageNumber={totalPage}
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
                    </PageLink>
                  </>
                ) : null}
              </>
            )}

            <PageLink
              pageNumber={
                currentPage < totalPage
                  ? currentPage + 1
                  : totalPage
              }
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Next</span>
              {">"}
            </PageLink>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
