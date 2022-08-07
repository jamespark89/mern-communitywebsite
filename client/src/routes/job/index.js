import { useEffect, useState } from "react"
import jobDataService from "../../services/job"

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
      <div className="md:max-w-fit xs:w-11/12 mx-auto mt-10 border-t-4">
        <div className="md:flex xs:hidden justify-center h-10 items-center border-b-2 bg-gray-100">
          <li className="w-20 text-center md:inline xs:hidden">
            No
          </li>
          <li className="md:w-96 xs:w-full text-center">
            Title
          </li>
          <li className="w-32 text-center">Writer</li>
          <li className="w-32 text-center">Date</li>
        </div>
        {data.map((item, index) => (
          <div
            key={index}
            className="md:flex justify-center border-b md:h-8 items-center hover:bg-gray-200"
          >
            <li className="w-20 text-center md:inline xs:hidden">
              {item.jobId}
            </li>
            <a href={`/job/${item._id}`}>
              <li className="md:w-96 xs:w-full pl-2 truncate">
                {item.title}
              </li>
            </a>
            <div className="flex">
              <li className=" w-32 text-center text-sm">
                😃{item.username}
              </li>
              <li className=" w-32 text-center text-sm">
                🕰{item.date?.slice(5, 10)}
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
