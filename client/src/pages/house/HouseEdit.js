import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import houseDataService from "../../services/house"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import HouseForm from "../../components/HouseForm"
import LoadingSpinner from "../../components/LoadingSpinner"

function HouseEdit() {
  const { id } = useParams()
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
      res.data.houseImage.map((imagePath) =>
        urlToObject(`images/${imagePath}`).then((res) =>
          setImages((prev) => [...prev, res])
        )
      )
    })
    setLoading(false)
  }
  // Convert imgae Url to Object File
  const urlToObject = async (imagePath) => {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + "/" + imagePath
    )
    const blob = await response.blob()
    const file = new File([blob], imagePath, {
      type: blob.type
    })
    return file
  }
  const cancelUpload = (e, imgSrc) => {
    e.preventDefault()
    const index = imageURLs.indexOf(imgSrc)
    const arrayImages = [...images]
    arrayImages.splice(index, 1)
    setImages([...arrayImages])
  }
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

  const handleFormSubmittion = (e) => {
    e.preventDefault()
    setLoading(true)
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
      .updateHouse(updatedFormData, id)
      .then((res) => {
        setLoading(false)
        if (res.status === 200) navigate("/house")
      })
  }

  useEffect(() => {
    const newImageUrls = []
    images?.forEach((image) =>
      newImageUrls.push(URL.createObjectURL(image))
    )
    setImageURLs(newImageUrls)
  }, [images])

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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

export default HouseEdit
