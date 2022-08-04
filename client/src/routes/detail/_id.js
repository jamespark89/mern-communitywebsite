import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function _id() {
  const { id } = useParams()
  const [data, setData] = useState([])
  const fetchData = async () => {
    await axios
      .get(`http://localhost:3001/jobs/${id}`)
      .then((res) => setData(res.data))
  }
  useEffect(() => {
    fetchData()
  }, [])
  console.log(data)
  return (
    <div>
      <table className="container mx-auto mt-10 max-w-fit border-t-4">
        <li>{data.title}</li>
        <li>
          <span>😃{data.username}</span>
          <span>🕰{data.date?.slice(5, 10)}</span>
        </li>
        <li>{data.contents}</li>
      </table>
    </div>
  )
}
