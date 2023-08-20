import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import houseDataService from "services/house"
import { useSelector } from "react-redux"
import HouseForm from "components/HouseForm"
import LoadingSpinner from "components/LoadingSpinner"
import { urlToObject } from "utils/formatData"
import { useNavigate } from "react-router-dom"
import { appendToFormData } from "utils/formatData"

function HouseEdit() {
  const { id } = useParams()
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: user.username,
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
    totalBedrooms: "",
    totalBathrooms: "",
    bedType: "",
    gender: "",
    price: "",
    contents: "",
    houseImage: []
  })

  const fetchData = async () => {
    setLoading(true)
    await houseDataService.getById(id).then((res) => {
      setFormData({
        username: res.data.username,
        streetAddress: res.data.streetAddress,
        city: res.data.city,
        state: res.data.state,
        zip: res.data.zip,
        totalBedrooms: res.data.totalBedrooms,
        totalBathrooms: res.data.totalBathrooms,
        bedType: res.data.bedType,
        gender: res.data.gender,
        price: res.data.price,
        contents: res.data.contents,
        houseImage: res.data.houseImage
      })
      // Convert imgae Url to Object File
      res.data.houseImage.map((imagePath) =>
        urlToObject(`images/${imagePath}`).then((res) =>
          setImages((prev) => [...prev, res])
        )
      )
    })
    setLoading(false)
  }

  const handleFormSubmission = (e) => {
    setLoading(true)
    e.preventDefault()
    const updatedFormData = appendToFormData(
      images,
      formData
    )
    houseDataService
      .updateHouse(updatedFormData, id)
      .then((res) => {
        setLoading(false)
        if (res.status === 200) navigate("/house")
      })
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (loading) return <LoadingSpinner />
  return (
    <div className="pt-16">
      <HouseForm
        setLoading={setLoading}
        formData={formData}
        images={images}
        setFormData={setFormData}
        setImages={setImages}
        handleFormSubmission={handleFormSubmission}
      />
    </div>
  )
}

export default HouseEdit
