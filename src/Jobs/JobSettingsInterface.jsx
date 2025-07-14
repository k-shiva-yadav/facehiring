import { useState } from "react"
import { FiEdit2 } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import './JobSettingsInterface.css';

export default function JobSettingsInterface() {
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(null)
  const [filterEnabled, setFilterEnabled] = useState(true)
  const [rejectionEmail, setRejectionEmail] =
    useState(`Thank you for your interest in the User Interface Designer position at XYZ Company Pvt. Ltd. Hyderabad, Telangana, India. Unfortunately, TriTech Software & Services did not select your application to move forward in the hiring process.\n\nRegards,\nXYZ Company Pvt. Ltd.`)
  const [applicationsEmail, setApplicationsEmail] = useState("xyz@gmail.com")
  const [applicationsMethod, setApplicationsMethod] = useState("On Facehiring")

  const handleBack = () => {
    navigate(-1)
  }

  const handleContinue = () => {
    navigate("/qualifications")
  }

  const toggleEdit = (section) => {
    setEditMode(section)
  }

  const cancelEdit = () => {
    setEditMode(null)
  }

  const handleAddQuestions = () => {
    alert("Add screening questions functionality would be implemented here")
  }

  const handleFilterChange = (checked) => {
    setFilterEnabled(checked)
  }

  return (
    <div className="job-settings-bg">
    <div className="job-settings-container">
    <div className="job-settings-container-inn">
      <div className="job-settings-top-heading">Feel free to modify any settings as needed</div>
      <section className="job-settings-card" aria-label="Job settings">
        <div className="job-settings-title">Job settings</div>
        <div className="job-settings-subtitle">Your preferences determine how you evaluate and gather applications.</div>

        {/* Screening Questions Row */}
        <div className="job-settings-row">
          <div className="job-settings-row-flex">
            <span className="job-settings-label">Screening questions</span>
            <div className="job-settings-value-col">
              <span className="job-settings-value">None</span>
              <button className="job-settings-edit" aria-label="Edit screening questions" onClick={() => toggleEdit("screening")}>
                <FiEdit2 size={16} />
              </button>
              <div className="job-settings-desc">We suggest adding at least three questions. Candidates must respond to each question.</div>
            </div>
          </div>
        </div>
        <div className="job-settings-divider" />

        {/* Screening Questions Edit Mode */}
        {editMode === "screening" && (
          <div className="edit-mode">
            <div className="edit-header">
              <button className="cancel-btn" onClick={cancelEdit}>
                Cancel
              </button>
              <div className="edit-title">Screening questions</div>
              <div className="edit-subtitle">
                We suggest adding at least three questions. Candidates must respond to each question.
              </div>
            </div>
            <button className="add-questions-btn" onClick={handleAddQuestions}>
              <FiEdit2 size={16} style={{ marginRight: "8px" }} />
              Add screening questions
            </button>
          </div>
        )}

        {/* Rejection Settings Row */}
        <div className="job-settings-row">
          <div className="job-settings-row-flex">
            <span className="job-settings-label">Rejection settings</span>
            <div className="job-settings-value-col">
              <span className="job-settings-value">Enabled</span>
              <button className="job-settings-edit" aria-label="Edit rejection settings" onClick={() => toggleEdit("rejection")}>
                <FiEdit2 size={16} />
              </button>
              <div className="job-settings-desc">Automatically filter and decline applicants who don't provide suitable answers to essential screening questions.</div>
            </div>
          </div>
        </div>
        <div className="job-settings-divider" />

        {/* Rejection Settings Edit Mode */}
        {editMode === "rejection" && (
          <div className="edit-mode">
            <div className="edit-header">
              <button className="cancel-btn" onClick={cancelEdit}>
                Cancel
              </button>
              <div className="edit-title">Rejection settings</div>
            </div>

            <div className="checkbox-container">
              <input
                type="checkbox"
                id="filter-checkbox"
                checked={filterEnabled}
                onChange={(e) => handleFilterChange(e.target.checked)}
              />
              <label htmlFor="filter-checkbox">
                Filter out and send rejections to applicants who don't meet any must-have qualifications.
              </label>
            </div>

            {filterEnabled && (
              <div className="preview-section">
                <div className="preview-label">
                  Preview<span className="required">*</span>
                </div>
                <textarea
                  className="preview-textarea"
                  placeholder="Enter rejection email template..."
                  value={rejectionEmail}
                  onChange={(e) => setRejectionEmail(e.target.value)}
                />
              </div>
            )}
          </div>
        )}

        {/* Manage Applications Row */}
        <div className="job-settings-row">
          <div className="job-settings-row-flex">
            <span className="job-settings-label">Manage Applications</span>
            <div className="job-settings-value-col">
              <span className="job-settings-value">On Facehiring</span>
              <button className="job-settings-edit" aria-label="Edit manage applications" onClick={() => toggleEdit("applications")}>
                <FiEdit2 size={16} />
              </button>
              <div className="job-settings-desc">Application updates will be sent to {applicationsEmail}</div>
            </div>
          </div>
        </div>

        {/* Manage Applications Edit Mode */}
        {editMode === "applications" && (
          <div className="edit-mode">
            <div className="edit-header">
              <button className="cancel-btn" onClick={cancelEdit}>
                Cancel
              </button>
              <div className="edit-title">Manage Applications</div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Manage Applications</label>
                  <select
                    className="form-select"
                    value={applicationsMethod}
                    onChange={(e) => setApplicationsMethod(e.target.value)}
                  >
                    <option>On Facehiring</option>
                    <option>Email notifications</option>
                    <option>External system</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">
                    Email for applicant updates<span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="On Facehiring"
                    value={applicationsEmail}
                    onChange={(e) => setApplicationsEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Buttons */}
        <div className="job-settings-footer">
          <button className="job-settings-btn job-settings-btn-back" onClick={handleBack}>Back</button>
          <button className="job-settings-btn job-settings-btn-continue" onClick={handleContinue}>Continue</button>
        </div>
      </section>
    </div>
    </div>
    </div>
  )
} 