import { useEffect, useState } from "react"
import houseDataService from "../../services/house"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import HouseForm from "../../components/HouseForm"
import LoadingSpinner from "../../components/LoadingSpinner"
function HouseCreate() {
  const { user } = useSelector((state) => state.auth)
  const [images, setImages] = useState([])
  const [imageURLs, setImageURLs] = useState([])
  const navigate = useNavigate()
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
  const onImageChange = (e) => {
    e.target.files[0] &&
      setImages((prev) => [...prev, e.target.files[0]])
  }
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const handleFormSubmittion = (e) => {
    setLoading(true)
    e.preventDefault()
    const updatedFormData = new FormData()
    images.forEach((image) =>
      updatedFormData.append("image", image)
    )
    updatedFormData.append(
      "streetAddress",
      formData.streetAddress
    )
    updatedFormData.append("city", formData.city)
    updatedFormData.append("state", formData.state)
    updatedFormData.append("zip", formData.zip)
    updatedFormData.append(
      "totalBedrooms",
      formData.totalBedrooms
    )
    updatedFormData.append(
      "totalBathrooms",
      formData.totalBathrooms
    )
    updatedFormData.append("bedType", formData.bedType)
    updatedFormData.append("contents", formData.contents)
    updatedFormData.append("gender", formData.gender)
    updatedFormData.append("price", formData.price)
    houseDataService
      .createHouse(updatedFormData)
      .then((res) => {
        setLoading(false)
        if (res.status === 200) navigate("/house")
      })
  }
  useEffect(() => {
    if (images.length < 1) return
    const newImageUrls = []
    images.forEach((image) =>
      newImageUrls.push(URL.createObjectURL(image))
    )
    setImageURLs(newImageUrls)
  }, [images])
  if (loading) return <LoadingSpinner />
  return (
    <HouseForm
      formData={formData}
      handleFormSubmittion={handleFormSubmittion}
      onChange={onChange}
      onImageChange={onImageChange}
      imageURLs={imageURLs}
    />
  )
}

export default HouseCreate
