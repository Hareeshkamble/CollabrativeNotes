import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Contribute() {
  let navigate = useNavigate()
  const [formData, setFormData] = useState({
    noteId: '',
    email: '',
    title: '',
    tag: '',
    description: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await fetch("http://localhost:80/api/notes/contributing", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        
        if (!response.ok) {
            const errorText = await response.text()
            console.error('Error response from server:', errorText)
            toast.error("failed to contribute")
            return
        }
        const jsonResponse = await response.json()
        console.log("Success:", jsonResponse)
        toast.success("Contribution Submitted Successfully!")
        setFormData({
          noteId: '',
          email: '',
          title: '',
          tag: '',
          description: ''
      })
      setTimeout(() => {
        navigate('/')
        window.location.reload()
    }, 1000) 
      
    } catch (error) {
        console.error("Error submitting form:", error.message)
        toast.error("An error occurred while submitting the contribution.")
    }
}
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4">Contribute to a Note</h2>
        <form onSubmit={handleSubmit}>
          {/* Note ID */}
          <div className="mb-3">
            <label htmlFor="noteId" className="form-label">Note ID</label>
            <input
              type="text"
              className="form-control"
              id="noteId"
              name="noteId"
              value={formData.noteId}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email ID */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email ID</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Title */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Tag */}
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">Submit Contribution</button>
        </form>
      </div>
    </div>
  )
}
