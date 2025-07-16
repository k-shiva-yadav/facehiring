// // // import { Card, Col, Row, Form, Button } from "react-bootstrap";
// // // import { useFormContext } from "../../Context/FormContext";
// // // import useFormSubmit from "../../Components/hooks/useFormSubmit";
// // // import { validateEducation } from "../../Components/utils/validateForm";
// // // import { useNavigate } from "react-router-dom";
// // // import axios from "axios";

// // // function Education() {
// // //   const { formData, setFormData, errors, setErrors, nextStep, prevStep, userId } = useFormContext();
// // //   const { submit, isSubmitting, error } = useFormSubmit();
// // //   const navigate = useNavigate();

// // //   // Redirect to BasicInfo if userId is missing
// // //   if (!userId) {
// // //     setErrors({ submit: "Please complete Basic Information first." });
// // //     navigate("/register");
// // //     return null;
// // //   }

// // //   // Safeguard for undefined formData or educations
// // //   if (!formData || !formData.educations) {
// // //     return <div>Loading or invalid form data...</div>;
// // //   }

// // //   const handleEducationChange = (index, field, value) => {
// // //     setFormData((prev) => ({
// // //       ...prev,
// // //       educations: prev.educations.map((edu, i) =>
// // //         i === index ? { ...edu, [field]: value } : edu
// // //       ),
// // //     }));
// // //     setErrors((prev) => ({ ...prev, [`edu_${index}_${field}`]: "" }));
// // //   };

// // //   const handleFileChange = (index, event) => {
// // //     const file = event.target.files[0];
// // //     const validTypes = ["application/pdf", "image/jpeg", "image/png"];
// // //     const maxSize = 5 * 1024 * 1024; // 5MB

// // //     if (!file) {
// // //       setErrors((prev) => ({ ...prev, [`edu_${index}_certificate`]: "No file selected." }));
// // //       return;
// // //     }

// // //     if (!validTypes.includes(file.type)) {
// // //       setErrors((prev) => ({ ...prev, [`edu_${index}_certificate`]: "Invalid file type. Use PDF, JPEG, or PNG." }));
// // //       return;
// // //     }

// // //     if (file.size > maxSize) {
// // //       setErrors((prev) => ({ ...prev, [`edu_${index}_certificate`]: "File size exceeds 5MB." }));
// // //       return;
// // //     }

// // //     setFormData((prev) => ({
// // //       ...prev,
// // //       educations: prev.educations.map((edu, i) =>
// // //         i === index ? { ...edu, certificate: file } : edu
// // //       ),
// // //     }));
// // //     setErrors((prev) => ({ ...prev, [`edu_${index}_certificate`]: "" }));
// // //   };

// // //   const addEducation = () => {
// // //     setFormData((prev) => ({
// // //       ...prev,
// // //       educations: [
// // //         ...prev.educations,
// // //         {
// // //           qualification: "",
// // //           course: "",
// // //           specialization: "",
// // //           college: "",
// // //           passingYear: "",
// // //           percentage: "",
// // //           isHighest: false,
// // //           certificate: null,
// // //         },
// // //       ],
// // //     }));
// // //   };

// // //   const handleHighestQualification = (index) => {
// // //     setFormData((prev) => ({
// // //       ...prev,
// // //       educations: prev.educations.map((edu, i) => ({
// // //         ...edu,
// // //         isHighest: i === index,
// // //       })),
// // //     }));
// // //   };

// // //   const handleSubmit = async () => {
// // //     const newErrors = validateEducation(formData, userId);
// // //     setErrors(newErrors);
// // //     if (Object.keys(newErrors).length > 0) return;

// // //     try {
// // //       const token = localStorage.getItem('token');
// // //       console.log('Submitting with UserId:', userId, 'Token:', token);

// // //       // Try separate POSTs for each education
// // //       for (const edu of formData.educations) {
// // //         const formDataPayload = new FormData();
// // //         formDataPayload.append('UserId', userId);
// // //         formDataPayload.append('Qualification', edu.qualification || "");
// // //         formDataPayload.append('Course', edu.course || "");
// // //         formDataPayload.append('Specialization', edu.specialization || "");
// // //         formDataPayload.append('College', edu.college || "");
// // //         formDataPayload.append('PassingYear', edu.passingYear || "");
// // //         formDataPayload.append('Percentage', edu.percentage || "");
// // //         formDataPayload.append('IsHighest', edu.isHighest.toString());
// // //         if (edu.certificate) {
// // //           formDataPayload.append('files', edu.certificate); // Append file
// // //         }

// // //         console.log('Submitting education payload:', [...formDataPayload.entries()]);
// // //         await submit(
// // //           "https://facehiringapi.codingster.in/User/Add_Education",
// // //           formDataPayload,
// // //           {
// // //             headers: {
// // //               'Content-Type': 'multipart/form-data',
// // //               ...(token && { Authorization: `Bearer ${token}` }),
// // //             },
// // //           }
// // //         );
// // //       }
// // //       nextStep();
// // //     } catch (err) {
// // //       console.error('Education submission error:', err.response?.data, 'Status:', err.response?.status);
// // //       setErrors({ 
// // //         submit: JSON.stringify(err.response?.data) || 
// // //                 `Failed to submit education data: ${err.message}. Please check all fields and try again.` 
// // //       });

// // //       // Fallback: Try single POST with array of educations
// // //       try {
// // //         const token = localStorage.getItem('token');
// // //         const formDataPayload = new FormData();
// // //         formDataPayload.append('UserId', userId);
// // //         formData.educations.forEach((edu, index) => {
// // //           formDataPayload.append(`Educations[${index}][Qualification]`, edu.qualification || "");
// // //           formDataPayload.append(`Educations[${index}][Course]`, edu.course || "");
// // //           formDataPayload.append(`Educations[${index}][Specialization]`, edu.specialization || "");
// // //           formDataPayload.append(`Educations[${index}][College]`, edu.college || "");
// // //           formDataPayload.append(`Educations[${index}][PassingYear]`, edu.passingYear || "");
// // //           formDataPayload.append(`Educations[${index}][Percentage]`, edu.percentage || "");
// // //           formDataPayload.append(`Educations[${index}][IsHighest]`, edu.isHighest.toString());
// // //           if (edu.certificate) {
// // //             formDataPayload.append(`Educations[${index}][files]`, edu.certificate);
// // //           }
// // //         });

// // //         console.log('Fallback: Submitting array payload:', [...formDataPayload.entries()]);
// // //         await submit(
// // //           "https://facehiringapi.codingster.in/User/Add_Education",
// // //           formDataPayload,
// // //           {
// // //             headers: {
// // //               'Content-Type': 'multipart/form-data',
// // //               ...(token && { Authorization: `Bearer ${token}` }),
// // //             },
// // //           }
// // //         );
// // //         nextStep();
// // //       } catch (fallbackErr) {
// // //         console.error('Fallback submission error:', fallbackErr.response?.data, 'Status:', fallbackErr.response?.status);
// // //         setErrors({ 
// // //           submit: JSON.stringify(fallbackErr.response?.data) || 
// // //                   `Fallback submission failed: ${fallbackErr.message}. Please try again.` 
// // //         });
// // //       }
// // //     }
// // //   };

// // //   return (
// // //     <Card className="form-card">
// // //       <Card.Body>
// // //         <h4 className="form-section-title">Education</h4>
// // //         {formData.educations.map((edu, index) => (
// // //           <div key={index} className="education-form mb-4">
// // //             {index > 0 && <hr className="my-4" />}
// // //             <h5>{index === 0 ? "Highest Education" : "Additional Education"}</h5>
// // //             <Row>
// // //               <Col xs={12} md={6}>
// // //                 <Form.Group className="mb-3">
// // //                   <Form.Label>Qualification</Form.Label>
// // //                   <Form.Control
// // //                     type="text"
// // //                     placeholder="e.g. Bachelor's Degree"
// // //                     value={edu.qualification}
// // //                     onChange={(e) => handleEducationChange(index, "qualification", e.target.value)}
// // //                     isInvalid={!!errors[`edu_${index}_qualification`]}
// // //                   />
// // //                   <Form.Control.Feedback type="invalid">{errors[`edu_${index}_qualification`]}</Form.Control.Feedback>
// // //                 </Form.Group>
// // //               </Col>
// // //               <Col xs={12} md={6}>
// // //                 <Form.Group className="mb-3">
// // //                   <Form.Label>Course</Form.Label>
// // //                   <Form.Control
// // //                     type="text"
// // //                     placeholder="e.g. Computer Science"
// // //                     value={edu.course}
// // //                     onChange={(e) => handleEducationChange(index, "course", e.target.value)}
// // //                     isInvalid={!!errors[`edu_${index}_course`]}
// // //                   />
// // //                   <Form.Control.Feedback type="invalid">{errors[`edu_${index}_course`]}</Form.Control.Feedback>
// // //                 </Form.Group>
// // //               </Col>
// // //             </Row>
// // //             <Row>
// // //               <Col xs={12}>
// // //                 <Form.Group className="mb-3">
// // //                   <Form.Label>Specialization</Form.Label>
// // //                   <Form.Control
// // //                     type="text"
// // //                     placeholder="e.g. Artificial Intelligence"
// // //                     value={edu.specialization}
// // //                     onChange={(e) => handleEducationChange(index, "specialization", e.target.value)}
// // //                   />
// // //                 </Form.Group>
// // //               </Col>
// // //             </Row>
// // //             <Row>
// // //               <Col xs={12} md={6}>
// // //                 <Form.Group className="mb-3">
// // //                   <Form.Label>College/University</Form.Label>
// // //                   <Form.Control
// // //                     type="text"
// // //                     placeholder="e.g. XYZ University"
// // //                     value={edu.college}
// // //                     onChange={(e) => handleEducationChange(index, "college", e.target.value)}
// // //                     isInvalid={!!errors[`edu_${index}_college`]}
// // //                   />
// // //                   <Form.Control.Feedback type="invalid">{errors[`edu_${index}_college`]}</Form.Control.Feedback>
// // //                 </Form.Group>
// // //               </Col>
// // //               <Col xs={12} md={6}>
// // //                 <Form.Group className="mb-3">
// // //                   <Form.Label>Passing Year</Form.Label>
// // //                   <Form.Control
// // //                     type="text"
// // //                     placeholder="e.g. 2023"
// // //                     value={edu.passingYear}
// // //                     onChange={(e) => handleEducationChange(index, "passingYear", e.target.value)}
// // //                     isInvalid={!!errors[`edu_${index}_passingYear`]}
// // //                   />
// // //                   <Form.Control.Feedback type="invalid">{errors[`edu_${index}_passingYear`]}</Form.Control.Feedback>
// // //                 </Form.Group>
// // //               </Col>
// // //             </Row>
// // //             <Row>
// // //               <Col xs={12} md={6}>
// // //                 <Form.Group className="mb-3">
// // //                   <Form.Label>Percentage/CGPA</Form.Label>
// // //                   <Form.Control
// // //                     type="text"
// // //                     placeholder="e.g. 85% or 8.5 CGPA"
// // //                     value={edu.percentage}
// // //                     onChange={(e) => handleEducationChange(index, "percentage", e.target.value)}
// // //                     isInvalid={!!errors[`edu_${index}_percentage`]}
// // //                   />
// // //                   <Form.Control.Feedback type="invalid">{errors[`edu_${index}_percentage`]}</Form.Control.Feedback>
// // //                 </Form.Group>
// // //               </Col>
// // //               <Col xs={12} md={6}>
// // //                 <Form.Group className="mb-3">
// // //                   <Form.Label>Highest Qualification</Form.Label>
// // //                   <Form.Check
// // //                     type="checkbox"
// // //                     label="This is my highest qualification"
// // //                     checked={edu.isHighest}
// // //                     onChange={() => handleHighestQualification(index)}
// // //                   />
// // //                 </Form.Group>
// // //               </Col>
// // //             </Row>
// // //             <Row>
// // //               <Col xs={12}>
// // //                 <Form.Group className="mb-3">
// // //                   <Form.Label>Certificate (PDF, JPEG, PNG)</Form.Label>
// // //                   <div className="upload-box">
// // //                     <input
// // //                       type="file"
// // //                       accept=".pdf,.jpeg,.jpg,.png"
// // //                       onChange={(e) => handleFileChange(index, e)}
// // //                       style={{ display: "none" }}
// // //                       id={`certificate-upload-${index}`}
// // //                     />
// // //                     <Button
// // //                       variant="outline-primary"
// // //                       className="upload-btn"
// // //                       onClick={() => document.getElementById(`certificate-upload-${index}`).click()}
// // //                     >
// // //                       Upload Certificate
// // //                     </Button>
// // //                     {edu.certificate && <p className="mt-2">Selected: {edu.certificate.name}</p>}
// // //                     {errors[`edu_${index}_certificate`] && (
// // //                       <div className="text-danger mt-2">{errors[`edu_${index}_certificate`]}</div>
// // //                     )}
// // //                   </div>
// // //                 </Form.Group>
// // //               </Col>
// // //             </Row>
// // //           </div>
// // //         ))}
// // //         <Button variant="link" className="add-education-btn mb-4" onClick={addEducation}>
// // //           Add another education
// // //         </Button>
// // //         {errors.submit && <div className="text-danger mb-3">{errors.submit}</div>}
// // //         {error && <div className="text-danger mb-3">{error}</div>}
// // //         <Row className="form-footer">
// // //           <Col className="text-end">
// // //             <Button variant="link" className="skip-btn me-3" onClick={prevStep}>
// // //               Back
// // //             </Button>
// // //             <Button variant="link" className="skip-btn me-3" onClick={nextStep}>
// // //               Skip this time
// // //             </Button>
// // //             <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
// // //               {isSubmitting ? "Submitting..." : "Next"}
// // //             </Button>
// // //           </Col>
// // //         </Row>
// // //       </Card.Body>
// // //     </Card>
// // //   );
// // // }

// // // export default Education;
// // import { useEffect, useState } from "react";
// // import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
// // import { useFormContext } from "../../Context/FormContext";
// // import { useNavigate } from "react-router-dom";

// // function Education() {
// //   const {
// //     userId,
// //     nextStep,
// //     prevStep,
// //     formData,
// //     setFormData,
// //     errors,
// //     setErrors,
// //   } = useFormContext();
// //   const navigate = useNavigate();
// //   const [submitError, setSubmitError] = useState(null);
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   useEffect(() => {
// //     console.log("Education component: userId:", userId);
// //     if (!userId) {
// //       setErrors({ submit: "Please complete Basic Information first." });
// //       navigate("/register");
// //     }
// //   }, [userId, navigate, setErrors]);

// //   const handleChange = (index, field, value) => {
// //     const updatedEducations = [...formData.educations];
// //     updatedEducations[index][field] = value;
// //     setFormData((prev) => ({ ...prev, educations: updatedEducations }));
// //   };

// //   const addEducation = () => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       educations: [
// //         ...prev.educations,
// //         {
// //           qualification: "",
// //           course: "",
// //           specialization: "",
// //           college: "",
// //           passingYear: "",
// //           percentage: "",
// //           isHighest: false,
// //         },
// //       ],
// //     }));
// //   };

// //   const removeEducation = (index) => {
// //     if (formData.educations.length <= 1) return;
// //     const updatedEducations = formData.educations.filter((_, i) => i !== index);
// //     setFormData((prev) => ({ ...prev, educations: updatedEducations }));
// //   };

// //   const validate = () => {
// //     const newErrors = {};
// //     formData.educations.forEach((edu, index) => {
// //       if (!edu.qualification)
// //         newErrors[`edu_${index}_qualification`] = "Qualification is required.";
// //       if (!edu.college)
// //         newErrors[`edu_${index}_college`] = "College name is required.";
// //       if (!edu.passingYear)
// //         newErrors[`edu_${index}_passingYear`] = "Passing year is required.";
// //       if (!edu.percentage)
// //         newErrors[`edu_${index}_percentage`] = "Percentage is required.";
// //     });
// //     return newErrors;
// //   };

// //   const handleSubmit = async () => {
// //     const newErrors = validate();
// //     setErrors(newErrors);
// //     if (Object.keys(newErrors).length > 0) {
// //       setSubmitError("Please fix all validation errors before submitting.");
// //       return;
// //     }

// //     try {
// //       setIsSubmitting(true);
// //       setSubmitError(null);
// //       // Simulate API call to save education data
// //       console.log("Submitting education data:", formData.educations);
// //       // If an API call is needed, add it here (e.g., axios.post to save education)
// //       nextStep();
// //     } catch (error) {
// //       setSubmitError("Failed to submit education details. Please try again.");
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   if (!userId) return null;

// //   return (
// //     <Card className="form-card" style={{ borderRadius: "15px" }}>
// //       <Card.Body>
// //         <h4 className="form-section-title mb-4">Education Information</h4>

// //         {formData.educations.map((edu, index) => (
// //           <Card
// //             key={index}
// //             className="mb-4 position-relative"
// //             style={{ borderRadius: "10px" }}
// //           >
// //             <Card.Body>
// //               {index > 0 && (
// //                 <Button
// //                   variant="outline-danger"
// //                   size="sm"
// //                   className="position-absolute top-0 end-0 mt-2 me-2"
// //                   onClick={() => removeEducation(index)}
// //                   style={{ borderRadius: "50%", width: "30px", height: "30px" }}
// //                 >
// //                   ×
// //                 </Button>
// //               )}

// //               <h5 className="mb-4">
// //                 {index === 0 ? "Highest Education*" : `Education ${index + 1}`}
// //               </h5>

// //               <Row>
// //                 <Col md={6}>
// //                   <Form.Group className="mb-3">
// //                     <Form.Label>Qualification*</Form.Label>
// //                     <Form.Control
// //                       type="text"
// //                       placeholder="e.g. Bachelor's Degree"
// //                       value={edu.qualification}
// //                       onChange={(e) =>
// //                         handleChange(index, "qualification", e.target.value)
// //                       }
// //                       isInvalid={!!errors[`edu_${index}_qualification`]}
// //                       style={{ borderRadius: "8px" }}
// //                     />
// //                     <Form.Control.Feedback type="invalid">
// //                       {errors[`edu_${index}_qualification`]}
// //                     </Form.Control.Feedback>
// //                   </Form.Group>
// //                 </Col>
// //                 <Col md={6}>
// //                   <Form.Group className="mb-3">
// //                     <Form.Label>Course</Form.Label>
// //                     <Form.Control
// //                       type="text"
// //                       placeholder="e.g. Computer Science"
// //                       value={edu.course}
// //                       onChange={(e) =>
// //                         handleChange(index, "course", e.target.value)
// //                       }
// //                       style={{ borderRadius: "8px" }}
// //                     />
// //                   </Form.Group>
// //                 </Col>
// //               </Row>

// //               <Row>
// //                 <Col md={6}>
// //                   <Form.Group className="mb-3">
// //                     <Form.Label>Specialization</Form.Label>
// //                     <Form.Control
// //                       type="text"
// //                       placeholder="e.g. Software Engineering"
// //                       value={edu.specialization}
// //                       onChange={(e) =>
// //                         handleChange(index, "specialization", e.target.value)
// //                       }
// //                       style={{ borderRadius: "8px" }}
// //                     />
// //                   </Form.Group>
// //                 </Col>
// //                 <Col md={6}>
// //                   <Form.Group className="mb-3">
// //                     <Form.Label>College/University*</Form.Label>
// //                     <Form.Control
// //                       type="text"
// //                       placeholder="e.g. XYZ University"
// //                       value={edu.college}
// //                       onChange={(e) =>
// //                         handleChange(index, "college", e.target.value)
// //                       }
// //                       isInvalid={!!errors[`edu_${index}_college`]}
// //                       style={{ borderRadius: "8px" }}
// //                     />
// //                     <Form.Control.Feedback type="invalid">
// //                       {errors[`edu_${index}_college`]}
// //                     </Form.Control.Feedback>
// //                   </Form.Group>
// //                 </Col>
// //               </Row>

// //               <Row>
// //                 <Col md={6}>
// //                   <Form.Group className="mb-3">
// //                     <Form.Label>Passing Year*</Form.Label>
// //                     <Form.Control
// //                       type="text"
// //                       placeholder="e.g. 2020"
// //                       value={edu.passingYear}
// //                       onChange={(e) =>
// //                         handleChange(index, "passingYear", e.target.value)
// //                       }
// //                       isInvalid={!!errors[`edu_${index}_passingYear`]}
// //                       style={{ borderRadius: "8px" }}
// //                     />
// //                     <Form.Control.Feedback type="invalid">
// //                       {errors[`edu_${index}_passingYear`]}
// //                     </Form.Control.Feedback>
// //                   </Form.Group>
// //                 </Col>
// //                 <Col md={6}>
// //                   <Form.Group className="mb-3">
// //                     <Form.Label>Percentage/CGPA*</Form.Label>
// //                     <Form.Control
// //                       type="text"
// //                       placeholder="e.g. 85%"
// //                       value={edu.percentage}
// //                       onChange={(e) =>
// //                         handleChange(index, "percentage", e.target.value)
// //                       }
// //                       isInvalid={!!errors[`edu_${index}_percentage`]}
// //                       style={{ borderRadius: "8px" }}
// //                     />
// //                     <Form.Control.Feedback type="invalid">
// //                       {errors[`edu_${index}_percentage`]}
// //                     </Form.Control.Feedback>
// //                   </Form.Group>
// //                 </Col>
// //               </Row>

// //               <Form.Check
// //                 type="checkbox"
// //                 label="This is my highest education"
// //                 checked={edu.isHighest}
// //                 onChange={(e) =>
// //                   handleChange(index, "isHighest", e.target.checked)
// //                 }
// //                 className="mb-3"
// //               />
// //             </Card.Body>
// //           </Card>
// //         ))}

// //         <Button
// //           variant="outline-primary"
// //           onClick={addEducation}
// //           className="mb-4"
// //           style={{ borderRadius: "8px" }}
// //         >
// //           + Add Another Education
// //         </Button>

// //         {submitError && (
// //           <Alert
// //             variant="danger"
// //             onClose={() => setSubmitError(null)}
// //             dismissible
// //           >
// //             {submitError}
// //           </Alert>
// //         )}

// //         <div className="d-flex justify-content-between mt-4">
// //           <Button
// //             variant="outline-secondary"
// //             onClick={prevStep}
// //             style={{ borderRadius: "8px" }}
// //             disabled={isSubmitting}
// //           >
// //             Back
// //           </Button>
// //           <Button
// //             variant="primary"
// //             onClick={handleSubmit}
// //             disabled={isSubmitting}
// //             style={{ borderRadius: "8px" }}
// //           >
// //             {isSubmitting ? "Submitting..." : "Next"}
// //           </Button>
// //         </div>
// //       </Card.Body>
// //     </Card>
// //   );
// // }

// // export default Education;
// import { useEffect, useState } from "react";
// import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
// import { useFormContext } from "../../Context/FormContext";
// import { useNavigate } from "react-router-dom";

// function Education() {
//   const {
//     userId,
//     nextStep,
//     prevStep,
//     formData,
//     setFormData,
//     errors,
//     setErrors,
//   } = useFormContext();
//   const navigate = useNavigate();
//   const [submitError, setSubmitError] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [loading, setLoading] = useState(true); // Add loading state

//   useEffect(() => {
//     console.log("Education component: userId:", userId);
//     if (userId) {
//       setLoading(false);
//     } else {
//       setErrors({ submit: "Please complete Basic Information first." });
//       navigate("/register");
//     }
//   }, [userId, navigate, setErrors]);

//   const handleChange = (index, field, value) => {
//     const updatedEducations = [...formData.educations];
//     updatedEducations[index][field] = value;
//     setFormData((prev) => ({ ...prev, educations: updatedEducations }));
//   };

//   const addEducation = () => {
//     setFormData((prev) => ({
//       ...prev,
//       educations: [
//         ...prev.educations,
//         {
//           qualification: "",
//           course: "",
//           specialization: "",
//           college: "",
//           passingYear: "",
//           percentage: "",
//           isHighest: false,
//         },
//       ],
//     }));
//   };

//   const removeEducation = (index) => {
//     if (formData.educations.length <= 1) return;
//     const updatedEducations = formData.educations.filter((_, i) => i !== index);
//     setFormData((prev) => ({ ...prev, educations: updatedEducations }));
//   };

//   const validate = () => {
//     const newErrors = {};
//     formData.educations.forEach((edu, index) => {
//       if (!edu.qualification)
//         newErrors[`edu_${index}_qualification`] = "Qualification is required.";
//       if (!edu.college)
//         newErrors[`edu_${index}_college`] = "College name is required.";
//       if (!edu.passingYear)
//         newErrors[`edu_${index}_passingYear`] = "Passing year is required.";
//       if (!edu.percentage)
//         newErrors[`edu_${index}_percentage`] = "Percentage is required.";
//     });
//     return newErrors;
//   };

//   const handleSubmit = async () => {
//     const newErrors = validate();
//     setErrors(newErrors);
//     if (Object.keys(newErrors).length > 0) {
//       setSubmitError("Please fix all validation errors before submitting.");
//       return;
//     }

//     try {
//       setIsSubmitting(true);
//       setSubmitError(null);
//       // Simulate API call to save education data
//       console.log("Submitting education data:", formData.educations);
//       // If an API call is needed, add it here (e.g., axios.post to save education)
//       nextStep();
//     } catch (error) {
//       setSubmitError("Failed to submit education details. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (!userId) return null;

//   return (
//     <Card className="form-card" style={{ borderRadius: "15px" }}>
//       <Card.Body>
//         <h4 className="form-section-title mb-4">Education Information</h4>

//         {formData.educations.map((edu, index) => (
//           <Card
//             key={index}
//             className="mb-4 position-relative"
//             style={{ borderRadius: "10px" }}
//           >
//             <Card.Body>
//               {index > 0 && (
//                 <Button
//                   variant="outline-danger"
//                   size="sm"
//                   className="position-absolute top-0 end-0 mt-2 me-2"
//                   onClick={() => removeEducation(index)}
//                 >
//                   ×
//                 </Button>
//               )}

//               <h5 className="mb-4">
//                 {index === 0 ? "Highest Education*" : `Education ${index + 1}`}
//               </h5>

//               <Row>
//                 <Col md={6}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Qualification*</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="e.g. Bachelor's Degree"
//                       value={edu.qualification}
//                       onChange={(e) =>
//                         handleChange(index, "qualification", e.target.value)
//                       }
//                       isInvalid={!!errors[`edu_${index}_qualification`]}
//                       style={{ borderRadius: "8px" }}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors[`edu_${index}_qualification`]}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Course</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="e.g. Computer Science"
//                       value={edu.course}
//                       onChange={(e) =>
//                         handleChange(index, "course", e.target.value)
//                       }
//                       style={{ borderRadius: "8px" }}
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row>
//                 <Col md={6}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Specialization</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="e.g. Software Engineering"
//                       value={edu.specialization}
//                       onChange={(e) =>
//                         handleChange(index, "specialization", e.target.value)
//                       }
//                       style={{ borderRadius: "8px" }}
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>College/University*</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="e.g. XYZ University"
//                       value={edu.college}
//                       onChange={(e) =>
//                         handleChange(index, "college", e.target.value)
//                       }
//                       isInvalid={!!errors[`edu_${index}_college`]}
//                       style={{ borderRadius: "8px" }}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors[`edu_${index}_college`]}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row>
//                 <Col md={6}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Passing Year*</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="e.g. 2020"
//                       value={edu.passingYear}
//                       onChange={(e) =>
//                         handleChange(index, "passingYear", e.target.value)
//                       }
//                       isInvalid={!!errors[`edu_${index}_passingYear`]}
//                       style={{ borderRadius: "8px" }}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors[`edu_${index}_passingYear`]}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Percentage/CGPA*</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="e.g. 85%"
//                       value={edu.percentage}
//                       onChange={(e) =>
//                         handleChange(index, "percentage", e.target.value)
//                       }
//                       isInvalid={!!errors[`edu_${index}_percentage`]}
//                       style={{ borderRadius: "8px" }}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors[`edu_${index}_percentage`]}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Form.Check
//                 type="checkbox"
//                 label="This is my highest education"
//                 checked={edu.isHighest}
//                 onChange={(e) =>
//                   handleChange(index, "isHighest", e.target.checked)
//                 }
//                 className="mb-3"
//               />
//             </Card.Body>
//           </Card>
//         ))}

//         <Button
//           variant="outline-primary"
//           onClick={addEducation}
//           className="mb-4"
//           style={{ borderRadius: "8px" }}
//         >
//           + Add Another Education
//         </Button>

//         {submitError && (
//           <Alert
//             variant="danger"
//             onClose={() => setSubmitError(null)}
//             dismissible
//           >
//             {submitError}
//           </Alert>
//         )}

//         <div className="d-flex justify-content-between mt-4">
//           <Button
//             variant="outline-secondary"
//             onClick={prevStep}
//             style={{ borderRadius: "8px" }}
//             disabled={isSubmitting}
//           >
//             Back
//           </Button>
//           <Button
//             variant="primary"
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//             style={{ borderRadius: "8px" }}
//           >
//             {isSubmitting ? "Submitting..." : "Next"}
//           </Button>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// }

// export default Education;
import { useEffect, useState } from "react";
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useFormContext } from "../../Context/FormContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Education() {
  const {
    userId,
    nextStep,
    prevStep,
    errors = {},
    setErrors = () => {},
    formData = {},
    setFormData = () => {},
  } = useFormContext() || {};
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
const [activeField, setActiveField] = useState("");

  // Initialize formData.education if undefined
  useEffect(() => {
    if (!formData.education) {
      setFormData({
        ...formData,
        education: {
          Qualification: "",
          Course: "",
          Specialization: "",
          College: "",
          PassingYear: "",
          Percentage: "",
          IsHighest: false,
          certificate: null,
        },
      });
    }
    console.log("Education component: userId:", userId);
    if (userId) {
      setLoading(false);
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        submit: "Please complete Basic Information first.",
      }));
      navigate("/register");
    }
  }, [userId, navigate, setErrors, formData, setFormData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      education: { ...prev.education, [field]: value },
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [`edu_${field}`]: "" }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const validTypes = ["application/pdf", "image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!file) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        edu_certificate: "No file selected.",
      }));
      return;
    }

    if (!validTypes.includes(file.type)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        edu_certificate: "Invalid file type. Use PDF, JPEG, or PNG.",
      }));
      return;
    }

    if (file.size > maxSize) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        edu_certificate: "File size exceeds 5MB.",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      education: { ...prev.education, certificate: file },
    }));
    setErrors((prevErrors) => ({ ...prevErrors, edu_certificate: "" }));
  };

  const validate = () => {
    const newErrors = {};
    const edu = formData.education || {};
    if (!edu.Qualification)
      newErrors.edu_Qualification = "Qualification is required.";
    if (!edu.College) newErrors.edu_College = "College name is required.";
    if (!edu.PassingYear)
      newErrors.edu_PassingYear = "Passing year is required.";
    else if (!/^\d{4}$/.test(edu.PassingYear))
      newErrors.edu_PassingYear = "Enter a valid 4-digit year.";
    if (!edu.Percentage)
      newErrors.edu_Percentage = "Percentage/CGPA is required.";
    else if (!/^\d+(\.\d+)?$/.test(edu.Percentage))
      newErrors.edu_Percentage =
        "Enter a valid percentage or CGPA (e.g., 88 or 8.8).";
    if (!edu.IsHighest)
      newErrors.submit = "Please mark this as the highest qualification.";
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setSubmitError("Please fix all validation errors before submitting.");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);
      const token = localStorage.getItem("token");
      const formDataPayload = new FormData();
      const edu = formData.education || {};

      formDataPayload.append("UserId", userId || "");
      formDataPayload.append("Qualification", edu.Qualification || "");
      formDataPayload.append("Course", edu.Course || "");
      formDataPayload.append("Specialization", edu.Specialization || "");
      formDataPayload.append("College", edu.College || "");
      formDataPayload.append("PassingYear", edu.PassingYear || "");
      formDataPayload.append("Percentage", edu.Percentage || "");
      formDataPayload.append("IsHighest", edu.IsHighest ? "true" : "false");
      if (edu.certificate) {
        formDataPayload.append("files", edu.certificate);
      }

      console.log("Submitting education payload:", [
        ...formDataPayload.entries(),
      ]);
      console.log("Token:", token);

      const response = await axios.post(
        "https://facehiringapi.codingster.in/User/Add_Education",
        formDataPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      console.log("API response:", response.data);
      nextStep();
    } catch (error) {
      console.error(
        "Submission error:",
        error.response?.data,
        "Status:",
        error.response?.status
      );
      setSubmitError(
        error.response?.data?.message ||
          "Failed to submit education details. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!userId) return null;

  const edu = formData.education || {};
const allQualifications = [
  "Bachelor's Degree",
  "Master's Degree",
  "Diploma",
  "PhD",
  "Intermediate",
  "SSC",
  "Other"
];

const allCourses = [
  "Computer Science",
  "Electronics",
  "Mechanical",
  "Civil",
  "Information Technology",
  "Business Administration",
  "Commerce",
  "Arts",
  "Other"
];

const allSpecializations = [
  "Software Engineering",
  "Data Science",
  "Cybersecurity",
  "AI & ML",
  "VLSI Design",
  "Thermodynamics",
  "Accounting",
  "Psychology",
  "Other"
];


const getSuggestions = (list, input) => {
  if (!input) return [];
  const inputLower = input.toLowerCase();
  return list.filter((item) => item.toLowerCase().includes(inputLower));
};


  return (
    <Card className="form-card" style={{ borderRadius: "15px" }}>
      <Card.Body>
        <h4 className="form-section-title mb-4">Education Information</h4>

        <Card className="mb-4" style={{ borderRadius: "10px" }}>
          <Card.Body>
            <h5 className="mb-4">Highest Education<span className="required-asterisk">*</span></h5>

            <Row>
              <Col md={6}>
                {/* <Form.Group className="mb-3">
                  <Form.Label className="required">Qualification<span className="required-asterisk">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. Bachelor's Degree"
                    value={edu.Qualification || ""}
                    onChange={(e) =>
                      handleChange("Qualification", e.target.value)
                    }
                    isInvalid={!!errors.edu_Qualification}
                    style={{ borderRadius: "8px" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.edu_Qualification}
                  </Form.Control.Feedback>
                </Form.Group> */}
               <Form.Group className="mb-3" style={{ position: "relative" }}>
  <Form.Label className="required">Qualification<span className="required-asterisk">*</span></Form.Label>
  <Form.Control
    type="text"
    placeholder="e.g. Bachelor's Degree"
    value={edu.Qualification || ""}
    onChange={(e) => {
      const val = e.target.value;
      handleChange("Qualification", val);
      setSuggestions(getSuggestions(allQualifications, val));
      setActiveField("Qualification");
    }}
    onBlur={() => setTimeout(() => setSuggestions([]), 150)}
    onFocus={() =>
      setSuggestions(getSuggestions(allQualifications, edu.Qualification))
    }
    isInvalid={!!errors.edu_Qualification}
    style={{ borderRadius: "8px" }}
  />
  {activeField === "Qualification" && suggestions.length > 0 && (
    <ul style={suggestionStyles.suggestionBox}>
      {suggestions.map((sug, idx) => (
        <li
          key={idx}
          style={suggestionStyles.suggestionItem}
          onClick={() => {
            handleChange("Qualification", sug);
            setSuggestions([]);
          }}
        >
          {sug}
        </li>
      ))}
    </ul>
  )}
  <Form.Control.Feedback type="invalid">
    {errors.edu_Qualification}
  </Form.Control.Feedback>
</Form.Group>



              </Col>
              <Col md={6}>
                {/* <Form.Group className="mb-3">
                  <Form.Label>Course</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. Computer Science"
                    value={edu.Course || ""}
                    onChange={(e) => handleChange("Course", e.target.value)}
                    style={{ borderRadius: "8px" }}
                  />
                </Form.Group> */}
                <Form.Group className="mb-3" style={{ position: "relative" }}>
  <Form.Label>Course</Form.Label>
  <Form.Control
    type="text"
    placeholder="e.g. Computer Science"
    value={edu.Course || ""}
    onChange={(e) => {
      const val = e.target.value;
      handleChange("Course", val);
      setSuggestions(getSuggestions(allCourses, val));
      setActiveField("Course");
    }}
    onBlur={() => setTimeout(() => setSuggestions([]), 150)}
    onFocus={() => setSuggestions(getSuggestions(allCourses, edu.Course))}
    style={{ borderRadius: "8px" }}
  />
  {activeField === "Course" && suggestions.length > 0 && (
    <ul style={suggestionStyles.suggestionBox}>
      {suggestions.map((sug, idx) => (
        <li
          key={idx}
          style={suggestionStyles.suggestionItem}
          onClick={() => {
            handleChange("Course", sug);
            setSuggestions([]);
          }}
        >
          {sug}
        </li>
      ))}
    </ul>
  )}
</Form.Group>

              </Col>
            </Row>

            <Row>
              <Col md={6}>
                {/* <Form.Group className="mb-3">
                  <Form.Label>Specialization</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. Software Engineering"
                    value={edu.Specialization || ""}
                    onChange={(e) =>
                      handleChange("Specialization", e.target.value)
                    }
                    style={{ borderRadius: "8px" }}
                  />
                </Form.Group> */}
                <Form.Group className="mb-3" style={{ position: "relative" }}>
  <Form.Label>Specialization</Form.Label>
  <Form.Control
    type="text"
    placeholder="e.g. Software Engineering"
    value={edu.Specialization || ""}
    onChange={(e) => {
      const val = e.target.value;
      handleChange("Specialization", val);
      setSuggestions(getSuggestions(allSpecializations, val));
      setActiveField("Specialization");
    }}
    onBlur={() => setTimeout(() => setSuggestions([]), 150)}
    onFocus={() =>
      setSuggestions(getSuggestions(allSpecializations, edu.Specialization))
    }
    style={{ borderRadius: "8px" }}
  />
  {activeField === "Specialization" && suggestions.length > 0 && (
    <ul style={suggestionStyles.suggestionBox}>
      {suggestions.map((sug, idx) => (
        <li
          key={idx}
          style={suggestionStyles.suggestionItem}
          onClick={() => {
            handleChange("Specialization", sug);
            setSuggestions([]);
          }}
        >
          {sug}
        </li>
      ))}
    </ul>
  )}
</Form.Group>

              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="required">College/University<span className="required-asterisk">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. XYZ University"
                    value={edu.College || ""}
                    onChange={(e) => handleChange("College", e.target.value)}
                    isInvalid={!!errors.edu_College}
                    style={{ borderRadius: "8px" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.edu_College}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="required">Passing Year<span className="required-asterisk">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. 2020"
                    value={edu.PassingYear || ""}
                    onChange={(e) => handleChange("PassingYear", e.target.value)}
                    isInvalid={!!errors.edu_PassingYear}
                    style={{ borderRadius: "8px" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.edu_PassingYear}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="required">Percentage/CGPA<span className="required-asterisk">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. 88%"
                    value={edu.Percentage || ""}
                    onChange={(e) => handleChange("Percentage", e.target.value)}
                    isInvalid={!!errors.edu_Percentage}
                    style={{ borderRadius: "8px" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.edu_Percentage}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Certificate (PDF, JPEG, PNG)</Form.Label>
                  <div className="upload-box">
                    <input
                      type="file"
                      accept=".pdf,.jpeg,.jpg,.png"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      id="certificate-upload"
                    />
                    <Button
                      variant="outline-primary"
                      className="upload-btn"
                      onClick={() =>
                        document.getElementById("certificate-upload").click()
                      }
                      style={{ borderRadius: "8px" }}
                    >
                      Upload Certificate
                    </Button>
                    {edu.certificate && (
                      <p className="mt-2">Selected: {edu.certificate.name}</p>
                    )}
                    {errors.edu_certificate && (
                      <div className="text-danger mt-2">
                        {errors.edu_certificate}
                      </div>
                    )}
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Form.Check
              type="checkbox"
              label="This is my highest education"
              checked={edu.IsHighest || false}
              onChange={(e) => handleChange("IsHighest", e.target.checked)}
              className="mb-3"
            />
          </Card.Body>
        </Card>

        {submitError && (
          <Alert
            variant="danger"
            onClose={() => setSubmitError(null)}
            dismissible
          >
            {submitError}
          </Alert>
        )}

        <div className="d-flex justify-content-between mt-4">
          <Button
            variant="outline-secondary"
            onClick={prevStep}
            style={{ borderRadius: "8px" }}
            disabled={isSubmitting}
          >
            Back
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{ borderRadius: "8px" }}
          >
            {isSubmitting ? "Submitting..." : "Next"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Education;
const suggestionStyles = {
  suggestionBox: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "8px",
    zIndex: 1000,
    maxHeight: "150px",
    overflowY: "auto",
    paddingLeft: "0",
    marginTop: "2px",
    listStyle: "none",

    /* Hide scrollbar but keep scroll working */
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE/Edge
  },
  suggestionItem: {
    fontSize: "12px",
    textAlign: "left",
    padding: "8px 12px",
    cursor: "pointer",
  },
};
