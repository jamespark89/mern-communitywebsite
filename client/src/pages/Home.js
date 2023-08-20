import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import LoadingSpinner from "components/LoadingSpinner"

export default function Home() {
  const { isLoading } = useSelector((state) => state.auth)

  if (isLoading) return <LoadingSpinner />
  return (
    <div className="min-h-screen pt-16">
      <div className="h-72">
        <div className="flex h-72 absolute overflow-hidden w-full -z-50">
          <img
            src="Hero.jpg"
            alt="community"
            className="w-full object-cover"
          />
        </div>
        <div className="flex justify-center pt-28">
          <h1 className="xs:w-60 md:w-auto text-2xl text-white bg-slate-400/50 p-2 rounded-lg font-mono">
            Work Together, Live Together
          </h1>
        </div>
      </div>
      <div className=" flex md:flex-row w-full items-center justify-center my-20 xs:flex-col xs:space-y-10 md:space-x-48 md:space-y-0">
        <Link to="/house">
          <div className=" rounded-lg shadow-lg shadow-slate-500 hover:bg-slate-200">
            <div className="p-5">
              <img
                src="house.png"
                alt="House"
                className="w-24 mx-auto"
              />
              <p className="font-bold mt-3">
                Find your sharehouse
              </p>
              <p className="font-serif text-gray-400">
                List your houses for rent or <br />
                share your rooms
              </p>
              <p className="font-bold text-blue-600">
                Search Houses
              </p>
            </div>
          </div>
        </Link>
        <Link to="/job">
          <div className=" rounded-lg shadow-lg shadow-slate-500 hover:bg-slate-200">
            <div className="p-5">
              <img
                src="contractor.png"
                alt="contractor"
                className="w-24 mx-auto"
              />
              <p className="font-bold mt-3">
                Are you looking for a job?
              </p>
              <p className="font-serif text-gray-400">
                Check out job opportunity or <br />
                hire your staff
              </p>
              <p className="font-bold text-blue-600">
                Search Jobs
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
