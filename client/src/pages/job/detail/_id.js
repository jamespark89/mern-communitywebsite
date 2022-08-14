import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import jobDataService from "../../../services/job"
import Modal from "../../../components/Modal"

export default function _id() {
  const { id } = useParams()
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])
  const fetchData = async () => {
    jobDataService
      .getById(id)
      .then((res) => setData(res.data))
  }
  const openModal = () => {
    setOpen(true)
  }
  const deleteJob = () => {
    jobDataService.deleteJob(id)
  }
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <Modal
        setOpen={setOpen}
        open={open}
        deleteJob={deleteJob}
      />
      <div className="container mx-auto md:w-3/5">
        <div className="container mx-auto mt-10 w-full border-t-4 border-b-4">
          <li className="w-full flex p-2 text-xl items-center">
            {data.title}
          </li>
          <li className="w-full h-8 flex justify-between items-center bg-gray-200">
            <span>😃{data.username}</span>
            <span>🕰{data.date?.slice(5, 10)}</span>
          </li>
          <li className="w-full h-96 ">{data.contents}</li>
        </div>
        <div className="flex justify-end">
          <a href={`/job/edit/${id}`}>
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
      </div>
    </div>
  )
}
