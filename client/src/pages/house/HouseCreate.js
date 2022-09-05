import { useState } from "react"
import HouseForm from "../../components/HouseForm"
import LoadingSpinner from "../../components/LoadingSpinner"
import { useSelector } from "react-redux"
function HouseCreate() {
  const { user } = useSelector((state) => state.auth)
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
  if (loading) return <LoadingSpinner />
  return (
    <HouseForm
      setLoading={setLoading}
      formData={formData}
      images={images}
      setFormData={setFormData}
      setImages={setImages}
    />
  )
}

export default HouseCreate
