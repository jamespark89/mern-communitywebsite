import { useEffect, useState } from "react"

function HouseForm({
  handleFormSubmission,
  setFormData,
  formData,
  setImages,
  images
}) {
  const [imageURLs, setImageURLs] = useState([])
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
  const onImageChange = (e) => {
    const maxAllowedSize = 2 * 1024 * 1024
    const maxAllowedNumber = 5
    if (e.target.files[0]?.size > maxAllowedSize)
      return alert("Max file size: 2MB!")
    if (images.length + 1 > maxAllowedNumber)
      return alert("Max file number: 5!")
    e.target.files[0] &&
      setImages((prev) => [...prev, e.target.files[0]])
  }

  useEffect(() => {
    const newImageUrls = []
    images.forEach((image) =>
      newImageUrls.push(URL.createObjectURL(image))
    )
    setImageURLs(newImageUrls)
  }, [images])
  return (
    <div>
      <div className="max-w-7xl mx-auto mb-10">
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  House Information
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Describe you place
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form
                encType="multipart/form-data"
                onSubmit={handleFormSubmission}
                id="form"
              >
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Street address
                        </label>
                        <input
                          type="text"
                          required
                          name="streetAddress"
                          id="streetAddress"
                          value={formData.streetAddress}
                          autoComplete="street-address"
                          onChange={onChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          required
                          value={formData.city}
                          onChange={onChange}
                          autoComplete="address-level2"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="region"
                          className="block text-sm font-medium text-gray-700"
                        >
                          State / Province
                        </label>
                        <input
                          type="text"
                          name="state"
                          id="state"
                          required
                          value={formData.state}
                          autoComplete="address-level1"
                          onChange={onChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="postal-code"
                          className="block text-sm font-medium text-gray-700"
                        >
                          ZIP / Postal code
                        </label>
                        <input
                          type="text"
                          name="zip"
                          id="zip"
                          required
                          value={formData.zip}
                          autoComplete="postal-code"
                          onChange={onChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="totalBedrooms"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Total bedrooms
                        </label>
                        <select
                          id="totalBedrooms"
                          name="totalBedrooms"
                          onChange={onChange}
                          value={formData.totalBedrooms}
                          required
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="" disabled hidden>
                            Bedrooms
                          </option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6+</option>
                        </select>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="totalBathrooms"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Total bathrooms
                        </label>
                        <select
                          id="totalBathrooms"
                          name="totalBathrooms"
                          onChange={onChange}
                          value={formData.totalBathrooms}
                          required
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="" disabled hidden>
                            Bathrooms
                          </option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4+</option>
                        </select>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="bedType"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Bed type
                        </label>
                        <select
                          id="bedType"
                          name="bedType"
                          onChange={onChange}
                          value={formData.bedType}
                          required
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="" disabled hidden>
                            Bed Types
                          </option>
                          <option>Single</option>
                          <option>Double</option>
                          <option>Bunk</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="gender"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Gender
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          onChange={onChange}
                          value={formData.gender}
                          required
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="" disabled hidden>
                            Gender Preference
                          </option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Any</option>
                        </select>
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Price
                        </label>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          required
                          value={formData.price}
                          onChange={onChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-6">
                        <label
                          htmlFor="contents"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Contents
                        </label>
                        <textarea
                          type="text"
                          id="contents"
                          rows="20"
                          name="contents"
                          required
                          value={formData.contents}
                          onChange={onChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-6">
                        <label
                          htmlFor="image"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Image Upload
                        </label>
                        <input
                          type="file"
                          name="image"
                          multiple
                          required={
                            imageURLs.length === 0
                              ? true
                              : false
                          }
                          accept=".png, .jpg, .jpeg"
                          onChange={onImageChange}
                        />
                      </div>

                      {imageURLs?.map((imageSrc, index) => (
                        <div
                          className="h-32 flex col-span-2 overflow-hidden"
                          key={index}
                        >
                          <img
                            src={imageSrc}
                            alt={imageSrc}
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={(e) =>
                              cancelUpload(e, imageSrc)
                            }
                            className="absolute bg-white rounded-full w-6 h-6 m-1 border-solid border border-black"
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HouseForm
