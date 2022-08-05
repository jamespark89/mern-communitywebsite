import { useEffect, useState } from "react"
import jobDataService from "../services/job"

export default function Job() {
  const [data, setData] = useState([])
  const fetchData = async () => {
    jobDataService.getAll().then((res) => setData(res.data))
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <div className="jobList container mx-auto mt-10 max-w-fit border-t-4">
        <div className="md:flex sm:hidden justify-center h-10 items-center border-b-2 bg-gray-100">
          <li className="w-20 text-center md:inline sm:hidden">
            No
          </li>
          <li className="w-80 text-center">Title</li>
          <li className="w-32 text-center">Writer</li>
          <li className="w-32 text-center">Date</li>
        </div>
        {data.map((item, index) => (
          <div
            key={index}
            className="md:flex border-b md:h-8 items-center hover:bg-gray-200"
          >
            <li className="w-20 text-center md:inline sm:hidden">
              {item.jobId}
            </li>
            <a href={`/job/${item._id}`}>
              <li className=" w-80 ml-2">{item.title}</li>
            </a>
            <div className="flex">
              <li className=" w-32 text-center text-sm">
                {item.username}
              </li>
              <li className=" w-32 text-center text-sm">
                {item.date?.slice(5, 10)}
              </li>
            </div>
          </div>
        ))}
        <div className="flex justify-end ">
          <a href="/job/new">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1">
              New
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}
