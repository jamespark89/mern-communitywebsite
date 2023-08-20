import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import jobDataService from "services/job"
import Modal from "components/Modal"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import LoadingSpinner from "components/LoadingSpinner"

export default function _id() {
  const { id } = useParams()
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    username: "",
    title: "",
    contents: "",
    author: {},
    date: ""
  })
  const fetchData = async () => {
    setLoading(true)
    await jobDataService
      .getById(id)
      .then((res) => setData(res.data))
    setLoading(false)
  }
  const openModal = () => {
    setOpen(true)
  }
  const deleteJob = async () => {
    setLoading(true)
    jobDataService.deleteJob(id).then((res) => {
      setLoading(false)
      if (res.status === 200) navigate("/job")
    })
  }
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (loading) return <LoadingSpinner />
  return (
    <div className="min-h-screen mx-5 pt-20">
      <Modal
        setOpen={setOpen}
        open={open}
        deleteJob={deleteJob}
      />
      <div className="container mx-auto min-h-[50%] md:w-3/5">
        <div className=" mx-auto w-full border-t-4 border-b-4">
          <li className="w-full flex p-2 text-xl items-center">
            {data.title}
          </li>
          <li className="w-full h-8 flex justify-between items-center bg-gray-200">
            <span className="mx-2">{data.username}</span>
            <span className="mx-2">
              🕰{data.createdAt?.slice(5, 10)}
            </span>
          </li>
          <li className="w-full my-2 h-full whitespace-pre-line">
            {data.contents}
          </li>
        </div>
        {!user || user?._id !== data?.author?._id ? null : (
          <>
            <div className="flex justify-end">
              <Link to={`/job/edit/${id}`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1">
                  Edit
                </button>
              </Link>
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
    </div>
  )
}
