import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import jobDataService from "services/job"
import JobForm from "components/JobForm"
import LoadingSpinner from "components/LoadingSpinner"

function JobEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    title: "",
    contents: ""
  })
  const { username, title, contents } = formData
  const fetchData = async () => {
    setLoading(true)
    await jobDataService.getById(id).then((res) => {
      setFormData({
        username: res.data.username,
        title: res.data.title,
        contents: res.data.contents
      })
    })
    setLoading(false)
  }
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const saveJob = async (e) => {
    e.preventDefault()
    setLoading(true)
    await jobDataService
      .updateJob(formData, id)
      .then((res) => {
        setLoading(false)
        if (res.status === 200) navigate("/job")
      })
  }
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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

export default JobEdit
