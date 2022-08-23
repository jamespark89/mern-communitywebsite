import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import jobDataService from "../../services/job"

export default function JobNew() {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: user.username,
    title: "",
    contents: ""
  })
  const { username, title, contents } = formData

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const saveJob = (e) => {
    e.preventDefault()
    jobDataService.createJob(formData).then((res) => {
      if (res.status === 200) navigate("/job")
    })
  }
  if (user)
    return (
      <div className="max-w-7xl mx-auto">
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
                  Job Information
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Describe job
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2 sm:w-full mx-auto">
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
                          name="username"
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
                          name="title"
                          value={title}
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
                          value={contents}
                          onChange={onChange}
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
        </div>
      </div>
    )
}
