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
