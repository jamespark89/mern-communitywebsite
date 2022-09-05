import { useState } from "react"
import HouseForm from "components/HouseForm"
import LoadingSpinner from "components/LoadingSpinner"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { appendToFormData } from "utils/formatData"
import houseDataService from "services/house"

function HouseCreate() {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])
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

  const handleFormSubmission = (e) => {
    setLoading(true)
    e.preventDefault()
    const updatedFormData = appendToFormData(
      images,
      formData
    )
    houseDataService
      .createHouse(updatedFormData)
      .then((res) => {
        setLoading(false)
        if (res.status === 200) navigate("/house")
      })
  }

  if (loading) return <LoadingSpinner />
  return (
    <HouseForm
      setLoading={setLoading}
      formData={formData}
      images={images}
      setFormData={setFormData}
      setImages={setImages}
      handleFormSubmittion={handleFormSubmission}
    />
  )
}

export default HouseCreate
