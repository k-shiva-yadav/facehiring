import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./QualificationsInterface.css";

const COMPANY_LOGO = process.env.PUBLIC_URL + "/images/FACEHIRE-LOGO.png";
const USER_AVATAR = require("../Assests/Images/profile1.jpg");


export default function QualificationsInterface() {
  const navigate = useNavigate();
  const [preferredQualifications, setPreferredQualifications] = useState("");
  const mustHaveList = [
    "0-2 years of experience in user interface design",
    "Must be located in commutable distance to Hyderabad, Telangana, India",
  ];
  const mustHaveCount = mustHaveList.join(" ").length;
  const preferredCount = preferredQualifications.length;

  // Modal state
  const [modalStep, setModalStep] = useState("none"); // none | email | verify | success
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [codeError, setCodeError] = useState("");
  const [showPostButtons, setShowPostButtons] = useState(false);

  const getCountColor = (count) => {
    if (count > 3500) return "#dc3545";
    if (count > 3000) return "#ffc107";
    return "#666";
  };

  // Modal logic
  const handleContinue = () => setModalStep("email");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handleSendCode = (e) => {
    e.preventDefault();
    if (!email.endsWith("@gmail.com")) {
      setEmailError("Please enter a valid company email address ending with @gmail.com");
      return;
    }
    setModalStep("verify");
  };
  const handleCodeChange = (idx, val) => {
    if (!/^[0-9]?$/.test(val)) return;
    const newCode = [...code];
    newCode[idx] = val;
    setCode(newCode);
    setCodeError("");
    // Auto-focus next
    if (val && idx < 5) {
      const next = document.getElementById(`code-input-${idx + 1}`);
      if (next) next.focus();
    }
  };
  const handleVerify = (e) => {
    e.preventDefault();
    if (code.join("").length !== 6) {
      setCodeError("Please enter all 6 digits");
      return;
    }
    setModalStep("success");
  };
  const handleDone = () => {
    setModalStep("none");
    setShowPostButtons(true);
  };
  const handleCloseModal = () => setModalStep("none");

  return (
    <div className="qualifications-bg">
    <div className="qualifications-main-container">
    <div className="qualifications-main-container-inn">
      {/* Breadcrumb */}
      <nav className="qualifications-breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li className="active">Post job</li>
          <li>Find people</li>
          <li>Review applications</li>
        </ol>
      </nav>

      {/* Instructional text */}
      <div className="qualifications-instructions">
        I've drafted qualifications to sort your applicants. Feel free to add anything else you're looking for. These won't be seen by job seekers.
      </div>

      {/* Card */}
      <section className="qualifications-card">
        <div className="qualifications-title">Ideal qualifications</div>

        {/* Must-have qualifications */}
        <div className="qualifications-group">
          <div className="qualifications-label">Must-have qualifications</div>
          <div className="qualifications-desc">
            Your applicants must have these qualifications to be considered for the role.
          </div>
          <div className="qualifications-box">
            <ul className="qualifications-list">
              {mustHaveList.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <div className="qualifications-char-count" style={{ color: getCountColor(mustHaveCount) }}>
              {mustHaveCount}/4,000
            </div>
          </div>
        </div>

        {/* Preferred qualifications */}
        <div className="qualifications-group">
          <div className="qualifications-label">Preferred qualifications</div>
          <div className="qualifications-desc">
            Your applicants don't need to have these qualifications, but you prefer to hire someone with them.
          </div>
          <div className="qualifications-box">
            <textarea
              className="qualifications-textarea"
              placeholder="You have no preferred qualifications"
              value={preferredQualifications}
              onChange={(e) => setPreferredQualifications(e.target.value)}
              maxLength={4000}
            />
            <div className="qualifications-char-count" style={{ color: getCountColor(preferredCount) }}>
              {preferredCount}/4,000
            </div>
          </div>
        </div>

        {/* Navigation buttons (in-card, not fixed) */}
        <div className="qualifications-footer">
          {showPostButtons ? (
            <>
              <button className="qualifications-btn qualifications-btn-back">Draft job post</button>
              <button className="qualifications-btn qualifications-btn-continue" onClick={() => navigate('/job-dashboard')}>Job post</button>
            </>
          ) : (
            <>
              <button className="qualifications-btn qualifications-btn-back" onClick={() => navigate("/job-settings")}>Back</button>
              <button className="qualifications-btn qualifications-btn-continue" onClick={handleContinue}>Continue</button>
            </>
          )}
        </div>
      </section>

      {/* Email Modal */}
      {modalStep === "email" && (
        <div className="modal-overlay">
          <div className="custom-modal">
            <button className="modal-close" onClick={handleCloseModal}>&times;</button>
            <div className="modal-title">Confirm your company email address</div>
            <div className="company-info">
              <img src={COMPANY_LOGO} alt="Company Logo" className="company-logo" />
              <span className="equals-sign">=</span>
              <img src={USER_AVATAR} alt="User Avatar" className="user-avatar" />
            </div>
            <div className="modal-description">
              To confirm you work with XYZ Company Pvt. Ltd. we'll need to send a verification code to your company email address. Enter your company email address to continue.
            </div>
            <form onSubmit={handleSendCode}>
              <div className="form-group">
                <label className="form-label">Email address<span style={{ color: 'red' }}>*</span></label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter email address (example@gmail.com)"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                {emailError && <div className="error-message">{emailError}</div>}
              </div>
              <ul className="info-list">
                <li>This email address will be added to your account</li>
                <li>Your organization will see your email address is confirmed</li>
                <li>We'll ask permission before sharing any other information with your organization</li>
              </ul>
              <button type="submit" className="btn-send">Send code</button>
            </form>
          </div>
        </div>
      )}

      {/* Verify Modal */}
      {modalStep === "verify" && (
        <div className="modal-overlay">
          <div className="custom-modal">
            <button className="modal-close" onClick={handleCloseModal}>&times;</button>
            <div className="modal-title">Verify your email</div>
            <div className="company-info">
              <img src={COMPANY_LOGO} alt="Company Logo" className="company-logo" />
              <span className="equals-sign">=</span>
              <img src={USER_AVATAR} alt="User Avatar" className="user-avatar" />
            </div>
            <div className="modal-description">
              Please check your email for a message with the verification code. Your code is 6 numbers long.
            </div>
            <form onSubmit={handleVerify}>
              <div className="form-group">
                <label className="form-label">Enter the code<span style={{ color: 'red' }}>*</span></label>
                <div className="code-inputs">
                  {code.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`code-input-${idx}`}
                      type="text"
                      className={`code-input ${codeError ? "error" : ""}`}
                      maxLength={1}
                      value={digit}
                      onChange={e => handleCodeChange(idx, e.target.value)}
                    />
                  ))}
                </div>
                {codeError && <div className="error-message">{codeError}</div>}
              </div>
              <button type="submit" className="btn-verify">Verify</button>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {modalStep === "success" && (
        <div className="modal-overlay">
          <div className="custom-modal success-modal" style={{ background: '#3C5898', color: '#fff', textAlign: 'center', padding: 0 }}>
            <div className="custom-modal-inner-content">
              <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Success" className="success-icon" style={{ width: 90, height: 90, marginBottom: 24 }} />
              <h2 className="success-title" style={{ color: '#fff', fontSize: 32, fontWeight: 700, margin: '24px 0 8px 0' }}>Successful</h2>
              <p className="success-message-text" style={{ color: '#fff', fontSize: 20, marginBottom: 32 }}>Your email has been successfully verified.</p>
              <button className="btn-done" onClick={handleDone} style={{ background: '#fff', color: '#3C5898', borderRadius: 24, fontWeight: 600, fontSize: 18, padding: '10px 48px', border: 'none', marginTop: 12 }}>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
  );
}