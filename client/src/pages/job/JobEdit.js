import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import jobDataService from "../../services/job"
import JobForm from "../../components/JobForm"

function JobEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    title: "",
    contents: ""
  })
  const { username, title, contents } = formData
  const fetchData = async () => {
    jobDataService.getById(id).then((res) => {
      setFormData({
        username: res.data.username,
        title: res.data.title,
        contents: res.data.contents
      })
    })
  }
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const saveJob = (e) => {
    e.preventDefault()
    jobDataService.updateJob(formData, id).then((res) => {
      if (res.status === 200) navigate("/job")
    })
  }
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
