export const urlToObject = async (imagePath) => {
  const response = await fetch(
    process.env.REACT_APP_SERVER_URL + "/" + imagePath
  )
  const blob = await response.blob()
  const file = new File([blob], imagePath, {
    type: blob.type
  })
  return file
}

export const appendToFormData = (images, formData) => {
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
  return updatedFormData
}
