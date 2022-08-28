import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import houseDataService from "../../services/house"
import Modal from "../../components/Modal"
import { useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBed,
  faBathtub
} from "@fortawesome/free-solid-svg-icons"
import Carousel from "../../components/Carousel"

function HouseShow() {
  const { id } = useParams()
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({})
  const fetchData = async () => {
    houseDataService.getById(id).then((res) => {
      setData(res.data)
    })
  }
  const openModal = () => {
    setOpen(true)
  }
  const deleteJob = () => {
    houseDataService.deleteJob(id).then((res) => {
      if (res.status === 200) navigate("/house")
    })
  }
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="max-w-2xl mx-auto overflow-hidden py-16 px-4 sm:py-10 sm:px-6 lg:max-w-4xl lg:px-8">
      <div className="text-xl">{data.streetAddress}</div>
      <div>
        {data.city}, {data.state}, {data.zip}
      </div>
      <div className="mt-5 w-fit  flex items-center">
        <Carousel data={data.houseImage} />
      </div>
      <div>
        <div className="flex flex-col border-b-2 my-5 pb-5">
          <div className="flex justify-between">
            <div>
              <span className="mx-2">
                <FontAwesomeIcon
                  icon={faBed}
                  className="mx-2"
                />
                {data.totalBedrooms}
              </span>
              <span>
                <FontAwesomeIcon
                  icon={faBathtub}
                  className="mx-2"
                />
                {data.totalBathrooms}
              </span>
              <span className="mx-5">
                {data.bedType} Bed
              </span>
            </div>
            <div className="mr-5">${data.price} / week</div>
          </div>
          <div className="mx-2">
            Gender Preference :{" "}
            {data.gender === "Male" ? (
              <span className="text-blue-500">Male</span>
            ) : data.gender === "Female" ? (
              <span className="text-red-400">Female</span>
            ) : (
              <span>Any</span>
            )}
          </div>
        </div>

        <div className="border-b-2 my-5 pb-5">
          <div className="font-bold text-lg">
            Description
          </div>
          {data.contents}
        </div>
      </div>
      {!user || user?._id !== data?.author?._id ? null : (
        <>
          <div className="flex justify-end">
            <a href={`/house/edit/${id}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1">
                Edit
              </button>
            </a>
            <button
              onClick={openModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default HouseShow
