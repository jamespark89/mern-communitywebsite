import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"
import JobDataService from "services/job"
import HouseDataService from "services/house"
import LoadingSpinner from "components/LoadingSpinner"

function Profile() {
  const { user } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [jobPost, setJobPost] = useState([])
  const [housePost, setHousePost] = useState([])
  const { id } = useParams()
  const fetchData = async (id) => {
    setLoading(true)
    Promise.all([
      JobDataService.getAllByUserId(id).then((res) =>
        setJobPost(res.data)
      ),
      HouseDataService.getAllByUserId(id).then((res) => {
        setHousePost(res.data)
      })
    ])
      .then(() => setLoading(false))
      .catch((e) => console.log(e.message))
  }
  useEffect(() => {
    fetchData(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (loading) return <LoadingSpinner />
  return (
    <div className="min-h-screen md:max-w-fit xs:w-11/12 mx-auto pt-20">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          User Information
        </h1>
        <div className="flex flex-col mt-2">
          <span>username : {user?.username}</span>
          <span>Email : {user?.email}</span>
        </div>
      </div>
      <div className="mt-5">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          My Post
        </h1>
        <div className="flex flex-col mt-2">
          <Link
            to={`/job?userId=${id}`}
            className="hover:underline"
          >
            <span> JobPost : {jobPost.jobs?.length}</span>
          </Link>
          <Link
            to={`/house?userId=${id}`}
            className="hover:underline"
          >
            <span>
              {" "}
              HousePost : {housePost.houses?.length}
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Profile
