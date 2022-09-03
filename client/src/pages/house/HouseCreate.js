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
    const maxAllowedSize = 2 * 1024 * 1024
    if (e.target.files[0]?.size > maxAllowedSize)
      return alert("Max file size: 2MB!")
    e.target.files[0] &&
      setImages((prev) => [...prev, e.target.files[0]])
  }
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const cancelUpload = (e, imgSrc) => {
    e.preventDefault()
    const index = imageURLs.indexOf(imgSrc)
    const arrayImages = [...images]
    arrayImages.splice(index, 1)
    setImages(() => [...arrayImages])
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
      images={images}
      setImages={setImages}
      cancelUpload={cancelUpload}
    />
  )
}

export default HouseCreate
