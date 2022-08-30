import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import houseDataService from "../../services/house"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import HouseForm from "../../components/HouseForm"

function HouseEdit() {
  const { id } = useParams()
  const { user } = useSelector((state) => state.auth)
  const [images, setImages] = useState([])
  const [imageURLs, setImageURLs] = useState([])
  const navigate = useNavigate()
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
        urlToObject(imagePath).then((res) =>
          setImages((prev) => [...prev, res])
        )
      )
    })
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
        if (res.status === 200) navigate("/house")
      })
  }

  useEffect(() => {
    if (images.length < 1) return
    const newImageUrls = []
    images?.forEach((image) =>
      newImageUrls.push(URL.createObjectURL(image))
    )
    setImageURLs(newImageUrls)
  }, [images])

  useEffect(() => {
    fetchData()
  }, [])

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

export default HouseEdit
