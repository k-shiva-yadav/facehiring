// import { Card, Col, Row, Form, Button } from "react-bootstrap";
// import { useFormContext } from "../../Context/FormContext";
// import useFormSubmit from "../../Components/hooks/useFormSubmit";
// import { validateUpload } from "../../Components/utils/validateForm";
// import { useNavigate } from "react-router-dom";

// function Upload() {
//   const { formData, setFormData, errors, setErrors, prevStep, nextStep, userId } = useFormContext();
//   const { submit, isSubmitting, error } = useFormSubmit();
//   const navigate = useNavigate();

//   const handleFileChange = (field, event) => {
//     const file = event.target.files[0];
//     const validTypes = {
//       resume: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
//       profilePhoto: ["image/jpeg", "image/png"],
//       videoPitch: ["video/mp4"],
//       workSamples: ["application/pdf", "image/jpeg", "image/png"],
//       additionalDocs: ["application/pdf", "image/jpeg", "image/png"],
//       backGroundImageFile: ["image/jpeg", "image/png"]
//     };
//     const maxSize = 5 * 1024 * 1024;
//     if (!file) {
//       setErrors((prev) => ({ ...prev, [field]: "No file selected." }));
//       return;
//     }
//     if (file.size > maxSize) {
//       setErrors((prev) => ({ ...prev, [field]: "File size exceeds 5MB." }));
//       return;
//     }
//     if (!validTypes[field].includes(file.type)) {
//       setErrors((prev) => ({ ...prev, [field]: `Invalid file type for ${field}.` }));
//       return;
//     }
//     setFormData((prev) => ({ ...prev, [field]: file }));
//     setErrors((prev) => ({ ...prev, [field]: "" }));
//   };

//   const handleSubmit = async () => {
//     const newErrors = validateUpload(formData, userId);
//     setErrors(newErrors);
//     if (Object.keys(newErrors).length > 0) return;

//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append("userId", userId);
//       formDataToSend.append("resumeFile", formData.resume);
//       if (formData.profilePhoto) formDataToSend.append("imageFile", formData.profilePhoto);
//       if (formData.videoPitch) formDataToSend.append("videoPitchFile", formData.videoPitch);
//       if (formData.workSamples) formDataToSend.append("workSampleFiles", formData.workSamples);
//       if (formData.additionalDocs) formDataToSend.append("additionalDocumentFiles", formData.additionalDocs);
//       if (formData.backGroundImageFile) formDataToSend.append("backGroundImageFile", formData.backGroundImageFile);
//       await submit("https://facehiringapi.codingster.in/User/Upload", formDataToSend, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       navigate("/login");
//     } catch (err) {
//       // Error handled by useFormSubmit
//     }
//   };

//   return (
//     <>
//       <Card className="form-card">
//         <Card.Body>
//           <h4 className="form-section-title">Upload</h4>
//           <Row>
//             <Col xs={12}>
//               <Form.Group className="mb-4">
//                 <Form.Label>Upload Resume*</Form.Label>
//                 <div className="upload-box">
//                   <p>(PDF/DOC format)</p>
//                   <input
//                     type="file"
//                     accept=".pdf,.doc,.docx"
//                     onChange={(e) => handleFileChange("resume", e)}
//                     style={{ display: "none" }}
//                     id="resume-upload"
//                   />
//                   <Button
//                     variant="outline-primary"
//                     className="upload-btn"
//                     onClick={() => document.getElementById("resume-upload").click()}
//                   >
//                     Upload +
//                   </Button>
//                   {formData.resume && <p className="mt-2">Selected: {formData.resume.name}</p>}
//                   {errors.resume && <div className="text-danger mt-2">{errors.resume}</div>}
//                 </div>
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row>
//             <Col xs={12}>
//               <Form.Group className="mb-4">
//                 <Form.Label>Upload Profile Photo</Form.Label>
//                 <div className="upload-box">
//                   <p>(PNG/JPEG format)</p>
//                   <input
//                     type="file"
//                     accept=".png,.jpeg,.jpg"
//                     onChange={(e) => handleFileChange("profilePhoto", e)}
//                     style={{ display: "none" }}
//                     id="photo-upload"
//                   />
//                   <Button
//                     variant="outline-primary"
//                     className="upload-btn"
//                     onClick={() => document.getElementById("photo-upload").click()}
//                   >
//                     Upload +
//                   </Button>
//                   {formData.profilePhoto && <p className="mt-2">Selected: {formData.profilePhoto.name}</p>}
//                   {errors.profilePhoto && <div className="text-danger mt-2">{errors.profilePhoto}</div>}
//                 </div>
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row>
//             <Col xs={12}>
//               <Form.Group className="mb-4">
//                 <Form.Label>Upload Background Image</Form.Label>
//                 <div className="upload-box">
//                   <p>(PNG/JPEG format)</p>
//                   <input
//                     type="file"
//                     accept=".png,.jpeg,.jpg"
//                     onChange={(e) => handleFileChange("backGroundImageFile", e)}
//                     style={{ display: "none" }}
//                     id="bg-upload"
//                   />
//                   <Button variant="outline-primary" onClick={() => document.getElementById("bg-upload").click()}>
//                     Upload +
//                   </Button>
//                   {formData.backGroundImageFile && <p className="mt-2">Selected: {formData.backGroundImageFile.name}</p>}
//                   {errors.backGroundImageFile && <div className="text-danger mt-2">{errors.backGroundImageFile}</div>}
//                 </div>
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row>
//             <Col xs={12}>
//               <Form.Group className="mb-4">
//                 <Form.Label>My Video Pitch</Form.Label>
//                 <div className="upload-box">
//                   <p>(MP4 format)</p>
//                   <p className="small-text">Improve your matches and hiring chances by 50% by adding a video pitch.</p>
//                   <input
//                     type="file"
//                     accept=".mp4"
//                     onChange={(e) => handleFileChange("videoPitch", e)}
//                     style={{ display: "none" }}
//                     id="video-upload"
//                   />
//                   <Button
//                     variant="outline-primary"
//                     className="upload-btn"
//                     onClick={() => document.getElementById("video-upload").click()}
//                   >
//                     Add video
//                   </Button>
//                   {formData.videoPitch && <p className="mt-2">Selected: {formData.videoPitch.name}</p>}
//                   {errors.videoPitch && <div className="text-danger mt-2">{errors.videoPitch}</div>}
//                 </div>
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row>
//             <Col xs={12}>
//               <Form.Group className="mb-4">
//                 <Form.Label>Work samples</Form.Label>
//                 <div className="upload-box">
//                   <p>(PNG/JPEG/PDF format)</p>
//                   <input
//                     type="file"
//                     accept=".png,.jpeg,.jpg,.pdf"
//                     onChange={(e) => handleFileChange("workSamples", e)}
//                     style={{ display: "none" }}
//                     id="samples-upload"
//                   />
//                   <Button
//                     variant="outline-primary"
//                     className="upload-btn"
//                     onClick={() => document.getElementById("samples-upload").click()}
//                   >
//                     Upload +
//                   </Button>
//                   {formData.workSamples && <p className="mt-2">Selected: {formData.workSamples.name}</p>}
//                   {errors.workSamples && <div className="text-danger mt-2">{errors.workSamples}</div>}
//                 </div>
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row>
//             <Col xs={12}>
//               <Form.Group className="mb-4">
//                 <Form.Label>Additional documents</Form.Label>
//                 <div className="upload-box">
//                   <p>(PNG/JPEG/PDF format)</p>
//                   <input
//                     type="file"
//                     accept=".png,.jpeg,.jpg,.pdf"
//                     onChange={(e) => handleFileChange("additionalDocs", e)}
//                     style={{ display: "none" }}
//                     id="docs-upload"
//                   />
//                   <Button
//                     variant="outline-primary"
//                     className="upload-btn"
//                     onClick={() => document.getElementById("docs-upload").click()}
//                   >
//                     Upload +
//                   </Button>
//                   {formData.additionalDocs && <p className="mt-2">Selected: {formData.additionalDocs.name}</p>}
//                   {errors.additionalDocs && <div className="text-danger mt-2">{errors.additionalDocs}</div>}
//                 </div>
//               </Form.Group>
//             </Col>
//           </Row>
//           {errors.submit && <div className="text-danger mb-3">{errors.submit}</div>}
//           {error && <div className="text-danger mb-3">{error}</div>}
//           <Row className="form-footer">
//             <Col className="text-end">
//               <Button variant="link" className="skip-btn me-3" onClick={prevStep}>
//                 Back
//               </Button>
//               <Button variant="link" className="skip-btn me-3" onClick={nextStep}>
//                 Skip this time
//               </Button>
//               <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
//                 {isSubmitting ? "Submitting..." : "Submit & Continue"}
//               </Button>
//             </Col>
//           </Row>
//         </Card.Body>
//       </Card>
//     </>
//   );
// }

// export default Upload;
 import { Card, Col, Row, Form, Button } from "react-bootstrap";
 import { useFormContext } from "../../Context/FormContext";
 import useFormSubmit from "../../Components/hooks/useFormSubmit";
 import { validateUpload } from "../../Components/utils/validateForm";
 import { useNavigate } from "react-router-dom";
function Upload() {
  const { formData, setFormData, errors, setErrors, prevStep, nextStep, userId } = useFormContext();
  const { submit, isSubmitting, error } = useFormSubmit();
  const navigate = useNavigate();

  const handleFileChange = (field, event) => {
    const file = event.target.files[0];
    const validTypes = {
      resume: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
      profilePhoto: ["image/jpeg", "image/png"],
      videoPitch: ["video/mp4"],
      workSamples: ["application/pdf", "image/jpeg", "image/png"],
      additionalDocs: ["application/pdf", "image/jpeg", "image/png"],
      backGroundImageFile: ["image/jpeg", "image/png"]
    };
    const maxSize = 5 * 1024 * 1024;
    if (!file) {
      setErrors((prev) => ({ ...prev, [field]: "No file selected." }));
      return;
    }
    if (file.size > maxSize) {
      setErrors((prev) => ({ ...prev, [field]: "File size exceeds 5MB." }));
      return;
    }
    if (!validTypes[field].includes(file.type)) {
      setErrors((prev) => ({ ...prev, [field]: `Invalid file type for ${field}.` }));
      return;
    }
    setFormData((prev) => ({ ...prev, [field]: file }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleInputChange = (field, event) => {
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async () => {
    const newErrors = validateUpload(formData, userId);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("userId", userId);
      formDataToSend.append("resumeFile", formData.resume);
      if (formData.profilePhoto) formDataToSend.append("imageFile", formData.profilePhoto);
      if (formData.videoPitch) formDataToSend.append("videoPitchFile", formData.videoPitch);
      if (formData.workSamples) formDataToSend.append("workSampleFiles", formData.workSamples);
      if (formData.additionalDocs) formDataToSend.append("additionalDocumentFiles", formData.additionalDocs);
      if (formData.backGroundImageFile) formDataToSend.append("backGroundImageFile", formData.backGroundImageFile);
      if (formData.portfolioUrl) formDataToSend.append("portfolioUrl", formData.portfolioUrl);
      debugger;
      await submit("https://facehiringapi.codingster.in/User/Upload", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/login");
    } catch (err) {
      // Error handled by useFormSubmit
    }
  };

  return (
    <>
      <Card className="form-card">
        <Card.Body>
          <h4 className="form-section-title">Upload</h4>
          <Row>
            <Col xs={12}>
              <Form.Group className="mb-4">
                <Form.Label className="required">Upload Resume<span className="required-asterisk">*</span></Form.Label>
                <div className="upload-box">
                  <p>(PDF/DOC format)</p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange("resume", e)}
                    style={{ display: "none" }}
                    id="resume-upload"
                  />
                  <Button
                    variant="outline-primary"
                    className="upload-btn"
                    onClick={() => document.getElementById("resume-upload").click()}
                  >
                    Upload +
                  </Button>
                  {formData.resume && <p className="mt-2">Selected: {formData.resume.name}</p>}
                  {errors.resume && <div className="text-danger mt-2">{errors.resume}</div>}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Form.Group className="mb-4">
                <Form.Label>Portfolio URL</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Enter your portfolio URL (e.g., https://yourportfolio.com)"
                  value={formData.portfolioUrl || ""}
                  onChange={(e) => handleInputChange("portfolioUrl", e)}
                  isInvalid={!!errors.portfolioUrl}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.portfolioUrl}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Form.Group className="mb-4">
                <Form.Label>Upload Profile Photo</Form.Label>
                <div className="upload-box">
                  <p>(PNG/JPEG format)</p>
                  <input
                    type="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => handleFileChange("profilePhoto", e)}
                    style={{ display: "none" }}
                    id="photo-upload"
                  />
                  <Button
                    variant="outline-primary"
                    className="upload-btn"
                    onClick={() => document.getElementById("photo-upload").click()}
                  >
                    Upload +
                  </Button>
                  {formData.profilePhoto && <p className="mt-2">Selected: {formData.profilePhoto.name}</p>}
                  {errors.profilePhoto && <div className="text-danger mt-2">{errors.profilePhoto}</div>}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Form.Group className="mb-4">
                <Form.Label>Upload Background Image</Form.Label>
                <div className="upload-box">
                  <p>(PNG/JPEG format)</p>
                  <input
                    type="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => handleFileChange("backGroundImageFile", e)}
                    style={{ display: "none" }}
                    id="bg-upload"
                  />
                  <Button variant="outline-primary" onClick={() => document.getElementById("bg-upload").click()}>
                    Upload +
                  </Button>
                  {formData.backGroundImageFile && <p className="mt-2">Selected: {formData.backGroundImageFile.name}</p>}
                  {errors.backGroundImageFile && <div className="text-danger mt-2">{errors.backGroundImageFile}</div>}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Form.Group className="mb-4">
                <Form.Label>My Video Pitch</Form.Label>
                <div className="upload-box">
                  <p>(MP4 format)</p>
                  <p className="small-text">Improve your matches and hiring chances by 50% by adding a video pitch.</p>
                  <input
                    type="file"
                    accept=".mp4"
                    onChange={(e) => handleFileChange("videoPitch", e)}
                    style={{ display: "none" }}
                    id="video-upload"
                  />
                  <Button
                    variant="outline-primary"
                    className="upload-btn"
                    onClick={() => document.getElementById("video-upload").click()}
                  >
                    Add video
                  </Button>
                  {formData.videoPitch && <p className="mt-2">Selected: {formData.videoPitch.name}</p>}
                  {errors.videoPitch && <div className="text-danger mt-2">{errors.videoPitch}</div>}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Form.Group className="mb-4">
                <Form.Label>Work samples</Form.Label>
                <div className="upload-box">
                  <p>(PNG/JPEG/PDF format)</p>
                  <input
                    type="file"
                    accept=".png,.jpeg,.jpg,.pdf"
                    onChange={(e) => handleFileChange("workSamples", e)}
                    style={{ display: "none" }}
                    id="samples-upload"
                  />
                  <Button
                    variant="outline-primary"
                    className="upload-btn"
                    onClick={() => document.getElementById("samples-upload").click()}
                  >
                    Upload +
                  </Button>
                  {formData.workSamples && <p className="mt-2">Selected: {formData.workSamples.name}</p>}
                  {errors.workSamples && <div className="text-danger mt-2">{errors.workSamples}</div>}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Form.Group className="mb-4">
                <Form.Label>Additional documents</Form.Label>
                <div className="upload-box">
                  <p>(PNG/JPEG/PDF format)</p>
                  <input
                    type="file"
                    accept=".png,.jpeg,.jpg,.pdf"
                    onChange={(e) => handleFileChange("additionalDocs", e)}
                    style={{ display: "none" }}
                    id="docs-upload"
                  />
                  <Button
                    variant="outline-primary"
                    className="upload-btn"
                    onClick={() => document.getElementById("docs-upload").click()}
                  >
                    Upload +
                  </Button>
                  {formData.additionalDocs && <p className="mt-2">Selected: {formData.additionalDocs.name}</p>}
                  {errors.additionalDocs && <div className="text-danger mt-2">{errors.additionalDocs}</div>}
                </div>
              </Form.Group>
            </Col>
          </Row>
          {errors.submit && <div className="text-danger mb-3">{errors.submit}</div>}
          {error && <div className="text-danger mb-3">{error}</div>}
          <Row className="form-footer">
            <Col className="text-end">
              <Button variant="link" className="skip-btn me-3" onClick={prevStep}>
                Back
              </Button>
              <Button variant="link" className="skip-btn me-3" onClick={nextStep}>
                Skip this time
              </Button>
              <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit & Continue"}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default Upload;