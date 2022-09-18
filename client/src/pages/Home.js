import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Ads from "components/Ads"
import LoadingSpinner from "components/LoadingSpinner"

export default function Home() {
  const { isLoading } = useSelector((state) => state.auth)

  if (isLoading) return <LoadingSpinner />
  return (
    <div>
      <div className="h-72">
        <div className="flex h-72 absolute overflow-hidden w-full -z-50">
          <img
            src="hero.jpg"
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
      <div className="h-1/2 flex md:flex-row w-full items-center justify-center mt-10 xs:flex-col">
        <div className="bg-red-300 p-5 rounded-lg mx-20 mt-10 hover:bg-red-400 hover:shadow-lg shadow-slate-500 animate-bounce">
          <Link to="/house">
            <i className="fa-solid fa-house fa-8x"></i>
            <h1 className="text-center font-serif">
              ShareHouse
            </h1>
          </Link>
        </div>
        <div className="bg-blue-300 p-5 px-7 rounded-lg mx-20 mt-10 hover:bg-blue-400 hover:shadow-lg shadow-slate-500 animate-bounce2">
          <Link to="/job">
            <i className="fa-solid fa-briefcase fa-8x"></i>
            <h1 className="text-center font-serif">Jobs</h1>
          </Link>
        </div>
      </div>
      <Ads />
    </div>
  )
}
