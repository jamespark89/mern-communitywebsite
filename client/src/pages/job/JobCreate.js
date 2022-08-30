import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import JobForm from "../../components/JobForm"

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
      <JobForm
        username={username}
        title={title}
        contents={contents}
        onChange={onChange}
        saveJob={saveJob}
      />
    )
}
