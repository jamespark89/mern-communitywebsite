import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import JobForm from "../../components/JobForm"
import LoadingSpinner from "../../components/LoadingSpinner"

import jobDataService from "../../services/job"

export default function JobNew() {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
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

  const saveJob = async (e) => {
    e.preventDefault()
    setLoading(true)
    await jobDataService.createJob(formData).then((res) => {
      setLoading(false)
      if (res.status === 200) navigate("/job")
    })
  }
  if (loading) return <LoadingSpinner />
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
