import React from "react"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import jobDataService from "../../services/job"

function JobEdit() {
  const { id } = useParams()
  const [username, setUsername] = useState("")
  const [title, setTitle] = useState("")
  const [contents, setContents] = useState("")
  const [date, setDate] = useState("")
  const fetchData = async () => {
    jobDataService.getById(id).then((res) => {
      setUsername(res.data.username)
      setTitle(res.data.title)
      setContents(res.data.contents)
      setDate(res.data.date)
    })
  }
  const titleChange = (e) => {
    setTitle(e.target.value)
  }
  const contentsChange = (e) => {
    setContents(e.target.value)
  }
  const saveJob = (e) => {
    e.preventDefault()
    const updatedData = {
      username: username,
      title: title,
      contents: contents,
      date: date
    }
    console.log(updatedData)
    jobDataService.updateJob(updatedData, id)
    window.location = "http://localhost:3000/job"
  }
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="">
      <div className="mt-5 md:mt-0 md:col-span-2 md:w-1/2 sm:w-full mx-auto">
        <form>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="user-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="user-name"
                    value={username}
                    disabled
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    onChange={titleChange}
                    value={title}
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
                    onChange={contentsChange}
                    value={contents}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                onClick={saveJob}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JobEdit
