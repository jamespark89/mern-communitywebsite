import { useEffect, useState } from "react"
import houseDataService from "../../services/house"
import { Link, useNavigate } from "react-router-dom"
import LoadingSpinner from "../../components/LoadingSpinner"
export default function House() {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const fetchData = async () => {
    await houseDataService
      .getAll()
      .then((res) => {
        setData(res.data)
      })
      .then(() => setLoading(false))
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex justify-end ">
            <button
              onClick={() => navigate("/house/new")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
            >
              New
            </button>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            House List
          </h2>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {data.map((house) => (
                <div
                  key={house._id}
                  className="group relative"
                >
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-lg overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img
                      src={`${process.env.REACT_APP_SERVER_URL}/images/${house.houseImage[0]}`}
                      onError={(e) => {
                        if (
                          e.target.src !==
                          `${process.env.REACT_APP_SERVER_URL}/uploads/Hero.jpg`
                        ) {
                          e.target.onerror = null
                          e.target.src = `${process.env.REACT_APP_SERVER_URL}/uploads/Hero.jpg`
                        }
                      }}
                      alt={"HouseImage"}
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link to={`/house/${house._id}`}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {house.streetAddress}
                        </Link>
                      </h3>
                      <div className="mt-1 text-sm">
                        {house.gender === "Male" ? (
                          <span className="text-blue-500">
                            Male
                          </span>
                        ) : house.gender === "Female" ? (
                          <span className="text-red-400">
                            Female
                          </span>
                        ) : (
                          <span>Any</span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {house.bedType}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${house.price} / week
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
