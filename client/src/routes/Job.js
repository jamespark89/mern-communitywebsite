import axios from "axios"
import { useEffect, useState } from "react"
export default function Job() {
  const [data, setData] = useState([])
  const fetchData = async () => {
    await axios
      .get("http://localhost:3001/jobs")
      .then((res) => setData(res.data))
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <div className="container mx-auto mt-10 max-w-fit border-t-4">
        <div className="flex justify-center h-10 items-center border-b-2">
          <li className="w-32 text-center">No</li>
          <li className="w-80 text-center">Title</li>
          <li className="w-32 text-center">Writer</li>
          <li className="w-32 text-center">Date</li>
        </div>
        {data.map((item, index) => (
          <div
            key={index}
            className="flex border-b h-8 items-center hover:bg-gray-200"
          >
            <li className="w-32 text-center">
              {item.jobId}
            </li>
            <a href={`/job/${item._id}`}>
              <li className=" w-80 ">{item.title}</li>
            </a>
            <li className=" w-32 text-center">
              {item.username}
            </li>
            <li className=" w-32 text-center">
              {item.date?.slice(5, 10)}
            </li>
          </div>
        ))}
      </div>
    </div>
  )
}
