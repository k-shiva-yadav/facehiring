import { useState, useEffect } from "react";
import { Card, Col, Row, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useFormContext } from "../../Context/FormContext";
import { useAuthContext } from "../../Context/AuthContext";
import { validateExperience } from "../../Components/utils/validateForm";
import { useNavigate } from "react-router-dom";
import jobs from "../../Assests/Images/jobs.png";
import jobsimgs from "../../Assests/Images/fresher.png";

function Experience() {
  const {
    formData,
    setFormData,
    errors,
    setErrors,
    nextStep,
    prevStep,
    userId,
    setUserId,
    workStatus,
    setWorkStatus,
    isFresher,
    setIsFresher,
  } = useFormContext();

  const { user, logout } = useAuthContext();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(
    user?.id || localStorage.getItem("userId") || ""
  );
  const [charCounts, setCharCounts] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  // Validate userId and redirect if missing
  useEffect(() => {
    const initializeUserId = async () => {
      if (user?.id && user.id !== currentUserId) {
        setCurrentUserId(user.id);
        setUserId(user.id);
        localStorage.setItem("userId", user.id);
      } else if (!user?.id && currentUserId) {
        setUserId(currentUserId);
        setFormData((prev) => ({ ...prev, userId: currentUserId }));
      } else if (!currentUserId) {
        setSubmitError("Please complete Basic Information first.");
        navigate("/register");
        return;
      }

      // Set initial selectedOption based on FormContext
      if (!selectedOption) {
        if (formData.experiences?.length > 0 && !isFresher) {
          setSelectedOption("experienced");
          setWorkStatus("experienced");
        } else if (isFresher) {
          setSelectedOption("fresher");
          setWorkStatus("fresher");
        }
      }

      setLoading(false); // Done loading
    };

    initializeUserId();
  }, [
    user?.id,
    currentUserId,
    selectedOption,
    formData,
    setFormData,
    navigate,
    isFresher,
    setWorkStatus,
    setUserId,
  ]);

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...formData.experiences];
    updatedExperiences[index][field] = value;
    setFormData((prev) => ({ ...prev, experiences: updatedExperiences }));

    if (field === "responsibilities") {
      setCharCounts((prev) => ({
        ...prev,
        [index]: value.length,
      }));
    }
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          totalExperience: "",
          designation: "",
          companyName: "",
          typeOfEmployment: "",
          achievements: "",
          companyUrl: "",
          annualSalary: "",
          noticePeriod: "",
          industry: "",
          responsibilities: "",
          isCurrentEmployee: false,
        },
      ],
    }));
  };

  const removeExperience = (index) => {
    if (formData.experiences.length <= 1) return;
    const updatedExperiences = formData.experiences.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, experiences: updatedExperiences }));
    setCharCounts((prev) => {
      const newCounts = { ...prev };
      delete newCounts[index];
      return newCounts;
    });
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setWorkStatus(option);
    setSubmitError(null);
    setErrors({});
    setCharCounts({});

    if (option === "fresher") {
      setIsFresher(true);
      setFormData((prev) => ({
        ...prev,
        experiences: [],
        isFresher: true,
      }));
    } else {
      setIsFresher(false);
      setFormData((prev) => ({
        ...prev,
        isFresher: false,
        experiences: prev.experiences.length
          ? prev.experiences
          : [
              {
                totalExperience: "",
                designation: "",
                companyName: "",
                typeOfEmployment: "",
                achievements: "",
                companyUrl: "",
                annualSalary: "",
                noticePeriod: "",
                industry: "",
                responsibilities: "",
                isCurrentEmployee: false,
              },
            ],
      }));
    }
  };

  const submitFresherStatus = async () => {
    const token = localStorage.getItem("token");
    // if (!token) {
    //   navigate("/login");
    //   throw new Error("Please log in to continue.");
    // }
    if (!currentUserId) {
      navigate("/register");
      throw new Error("Please complete Basic Information first.");
    }

    try {
      const response = await axios.post(
        `https://facehiringapi.codingster.in/User/IsFresher`,
        null,
        {
          params: {
            UserId: currentUserId,
            isfresher: true,
          },
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Fresher status updated:", response.data);
      if (response.data.responseCode !== 1) {
        throw new Error(
          response.data.message || "Failed to update fresher status."
        );
      }
      setIsFresher(true);
      setFormData((prev) => ({ ...prev, isFresher: true }));
      return response.data;
    } catch (error) {
      console.error("Fresher submission error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      if (error.response?.status === 401) {
        logout();
        navigate("/login");
        throw new Error("Authentication failed. You have been logged out.");
      }
      throw new Error(
        error.response?.data?.message ||
          "Failed to update fresher status. Please try again."
      );
    }
  };

  // const submitExperiences = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/login");
  //     throw new Error("Please log in to continue.");
  //   }
  //   if (!currentUserId) {
  //     navigate("/register");
  //     throw new Error("Please complete Basic Information first.");
  //   }

  //   try {
  //     const promises = formData.experiences.map((exp) =>
  //       axios.post(
  //         "https://facehiringapi.codingster.in/User/Add_Experience",
  //         {
  //           userId: currentUserId,
  //           totalExperience: exp.totalExperience,
  //           designation: exp.designation,
  //           companyName: exp.companyName,
  //           typeOfEmployment: exp.typeOfEmployment,
  //           achievements: exp.achievements,
  //           companyUrl: exp.companyUrl,
  //           annualSalary: exp.annualSalary,
  //           noticePeriod: exp.noticePeriod,
  //           industry: exp.industry,
  //           responsibilities: exp.responsibilities,
  //           isCurrentEmployee: exp.isCurrentEmployee,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       )
  //     );
  //     const responses = await Promise.all(promises);
  //     console.log("Experiences submitted:", responses.map((res) => res.data));
  //     setIsFresher(false);
  //     setFormData((prev) => ({ ...prev, isFresher: false }));
  //     return responses.map((res) => res.data);
  //   } catch (error) {
  //     console.error("Experience submission error:", {
  //       status: error.response?.status,
  //       data: error.response?.data,
  //       message: error.message,
  //     });
  //     if (error.response?.status === 401) {
  //       logout();
  //       navigate("/login");
  //       throw new Error("Authentication failed. You have been logged out.");
  //     }
  //     throw new Error(
  //       error.response?.data?.message ||
  //         "Failed to save experiences. Please try again."
  //     );
  //   }
  // };
const submitExperiences = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    throw new Error("Please log in to continue.");
  }

  if (!currentUserId) {
    navigate("/register");
    throw new Error("Please complete Basic Information first.");
  }

  // 👇 Helper to safely convert salary
  const convertSalaryToNumber = (salary) => {
    if (!salary) return null;
    if (salary.includes("+")) {
      return parseInt(salary); // "10+" => 10
    }
    const num = parseFloat(salary);
    return isNaN(num) ? null : num;
  };

  try {
    const promises = formData.experiences.map((exp) =>
      axios.post(
        "https://facehiringapi.codingster.in/User/Add_Experience",
        {
          userId: currentUserId,
          totalExperience: exp.totalExperience,
          designation: exp.designation,
          companyName: exp.companyName,
          typeOfEmployment: exp.typeOfEmployment,
          achievements: exp.achievements || null,
          companyUrl: exp.companyUrl || null,
          annualSalary: convertSalaryToNumber(exp.annualSalary), // 👈 converted to number
          noticePeriod: exp.noticePeriod || null,
          industry: exp.industry || null,
          responsibilities: exp.responsibilities || null,
          isCurrentEmployee: exp.isCurrentEmployee || false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
    );

    const responses = await Promise.all(promises);
    console.log("Experiences submitted:", responses.map((res) => res.data));
    setIsFresher(false);
    setFormData((prev) => ({ ...prev, isFresher: false }));
    return responses.map((res) => res.data);
  } catch (error) {
    console.error("Experience submission error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    if (error.response?.status === 401) {
      logout();
      navigate("/login");
      throw new Error("Authentication failed. You have been logged out.");
    }

    throw new Error(
      error.response?.data?.message ||
        "Failed to save experiences. Please try again."
    );
  }
};


  const handleSubmit = async () => {
    if (!selectedOption) {
      setErrors({ selection: "Please select either Fresher or Experienced." });
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const newErrors = validateExperience(formData, selectedOption, currentUserId);
      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) {
        throw new Error("Please fix all validation errors before submitting.");
      }

      if (selectedOption === "fresher") {
        await submitFresherStatus();
        if (!userId) {
          console.warn("userId missing in FormContext");
          setSubmitError("Please complete Basic Information first.");
          navigate("/register");
          return;
        }
        console.log("Navigating to Education for fresher, userId:", userId);
        nextStep();
      } else {
        await submitExperiences();
        if (!userId) {
          console.warn("userId missing in FormContext");
          setSubmitError("Please complete Basic Information first.");
          navigate("/register");
          return;
        }
        console.log("Navigating to Education for experienced, userId:", userId);
        nextStep();
      }
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while userId is being resolved
  if (loading) {
    return <div>Loading...</div>;
  }

  // If redirected, this won't render
  if (!currentUserId) return null;

  return (
    <Card className="form-card" style={{ borderRadius: "15px" }}>
    <Card.Body>
      <h4 className="form-section-title mb-4">Experience Information</h4>

      {/* Experience Type Selection */}
      <Row className="mb-4">
        <Col>
          <Form.Label className="mb-3 d-block">
            Select your experience level*
          </Form.Label>
          <div className="d-flex flex-column flex-md-row gap-3">
            {/* Fresher Button */}
            <Button
              className={`flex-grow-1 d-flex align-items-center justify-content-between p-3 ${
                selectedOption === "fresher" ? "bg-light" : ""
              }`}
              style={{
                borderRadius: "10px",
                borderWidth: selectedOption === "fresher" ? "2px" : "1px",
                borderColor:
                  selectedOption === "fresher" ? "#3C5898" : "#6c757d",
                backgroundColor:
                  selectedOption === "fresher" ? "#E6ECF7" : "transparent",
                color: "black",
              }}
              onClick={() => handleOptionSelect("fresher")}
            >
              <div>
                <h5 className="mb-1" style={{ color: "black" }}>
                  Fresher
                </h5>
                <p className="mb-0 small" style={{ color: "black" }}>
                  I have no work experience or only internships
                </p>
              </div>
              <img
                src={jobsimgs}
                alt="Fresher"
                style={{ width: "50px", height: "50px", objectFit: "contain" }}
              />
            </Button>

            {/* Experienced Button */}
            <Button
              className={`flex-grow-1 d-flex align-items-center justify-content-between p-3 ${
                selectedOption === "experienced" ? "bg-light" : ""
              }`}
              style={{
                borderRadius: "10px",
                borderWidth: selectedOption === "experienced" ? "2px" : "1px",
                borderColor:
                  selectedOption === "experienced" ? "#3C5898" : "#6c757d",
                backgroundColor:
                  selectedOption === "experienced" ? "#E6ECF7" : "transparent",
                color: "black",
              }}
              onClick={() => handleOptionSelect("experienced")}
            >
              <div>
                <h5 className="mb-1" style={{ color: "black" }}>
                  Experienced
                </h5>
                <p className="mb-0 small" style={{ color: "black" }}>
                  I have work experience (excluding internships)
                </p>
              </div>
              <img
                src={jobs}
                alt="Experienced"
                style={{ width: "50px", height: "50px", objectFit: "contain" }}
              />
            </Button>
          </div>
          {errors.selection && (
            <div className="text-danger mt-2">{errors.selection}</div>
          )}
        </Col>
      </Row>

      {/* Experience Form Section - Only shown for experienced users */}
      {selectedOption === "experienced" && (
        <div className="experience-section">
          {formData.experiences?.map((exp, index) => (
            <Card
              key={index}
              className="mb-4"
              style={{ borderRadius: "10px" }}
            >
              <Card.Body className="position-relative">
                {index > 0 && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="position-absolute top-0 end-0 mt-2 me-2"
                    onClick={() => removeExperience(index)}
                    disabled={formData.experiences.length <= 1}
                  >
                    ×
                  </Button>
                )}

              <h5 className="mb-4">
  {index === 0 ? (
    <>
      Current/Most Recent Experience
      <span className="required-asterisk">*</span>
    </>
  ) : (
    `Experience ${index + 1}`
  )}
</h5>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
<Form.Label className="required">Total Experience (Years) <span className="required-asterisk"> *</span> </Form.Label>
<Form.Select
  value={exp.totalExperience}
  onChange={(e) =>
    handleExperienceChange(index, "totalExperience", e.target.value)
  }
  isInvalid={!!errors[`exp_${index}_totalExperience`]}
  style={{ borderRadius: "8px",
    padding: "10px 12px",       // ⬅️ Matching padding like input box
    fontSize: "12px",           // ⬅️ Consistent font size
    color: "#495057"   }}
>
  <option value="">-- Select Experience --</option>
  <option value="Fresher">Fresher</option>
  <option value="0-1">0 - 1 Year</option>
  <option value="1-2">1 - 2 Years</option>
  <option value="2-3">2 - 3 Years</option>
  <option value="3-5">3 - 5 Years</option>
  <option value="5-7">5 - 7 Years</option>
  <option value="7-10">7 - 10 Years</option>
  <option value="10-above">10+ Years</option>
</Form.Select>
<Form.Control.Feedback type="invalid">
  {errors[`exp_${index}_totalExperience`]}
</Form.Control.Feedback>
</Form.Group>

                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
<Form.Label className="required">Designation<span className="required-asterisk"> *</span></Form.Label>
<Form.Select
  value={exp.designation}
  onChange={(e) =>
    handleExperienceChange(index, "designation", e.target.value)
  }
  isInvalid={!!errors[`exp_${index}_designation`]}
  style={{
    borderRadius: "8px",
    padding: "10px 12px",
    fontSize: "12px",
    color: "#495057",
  }}
>
  <option value="">-- Select Designation --</option>
  <option value="Software Engineer">Software Engineer</option>
  <option value="Senior Software Engineer">Senior Software Engineer</option>
  <option value="Frontend Developer">Frontend Developer</option>
  <option value="Backend Developer">Backend Developer</option>
  <option value="Full Stack Developer">Full Stack Developer</option>
  <option value="DevOps Engineer">DevOps Engineer</option>
  <option value="QA Engineer">QA Engineer</option>
  <option value="Data Analyst">Data Analyst</option>
  <option value="Business Analyst">Business Analyst</option>
  <option value="Product Manager">Product Manager</option>
  <option value="Pharma Associate">Pharma Associate</option>
  {/* <option value="Clinical Research Associate">Clinical Research Associate</option>
  <option value="Regulatory Affairs Specialist">Regulatory Affairs Specialist</option> */}
</Form.Select>
<Form.Control.Feedback type="invalid">
  {errors[`exp_${index}_designation`]}
</Form.Control.Feedback>
</Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="required">Company Name<span className="required-asterisk"> *</span></Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g. Tech Corp"
                        value={exp.companyName}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "companyName",
                            e.target.value
                          )
                        }
                        isInvalid={!!errors[`exp_${index}_companyName`]}
                        style={{ borderRadius: "8px" }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors[`exp_${index}_companyName`]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
<Form.Label className="required">Type of Employment<span className="required-asterisk"> *</span></Form.Label>
<Form.Select
  value={exp.typeOfEmployment}
  onChange={(e) =>
    handleExperienceChange(index, "typeOfEmployment", e.target.value)
  }
  isInvalid={!!errors[`exp_${index}_typeOfEmployment`]}
  style={{
    borderRadius: "8px",
    padding: "10px 12px",     // Match input box padding
    fontSize: "12px",
    color: "#495057"
  }}
>
  <option value="">-- Select Employment Type --</option>
  <option value="Full-time">Full-time</option>
  <option value="Part-time">Part-time</option>
  <option value="Freelance">Freelance</option>
  <option value="Internship">Internship</option>
  <option value="Contract">Contract</option>
  <option value="Self-employed">Self-employed</option>
  <option value="Other">Other</option>
</Form.Select>
<Form.Control.Feedback type="invalid">
  {errors[`exp_${index}_typeOfEmployment`]}
</Form.Control.Feedback>
</Form.Group>

                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    {/* <Form.Group className="mb-3">
<Form.Label className="required">Annual Salary<span className="required-asterisk">*</span> (LPA)</Form.Label>
<Form.Select
  value={exp.annualSalary}
  onChange={(e) =>
    handleExperienceChange(index, "annualSalary", e.target.value)
  }
  isInvalid={!!errors[`exp_${index}_annualSalary`]}
  style={{
    borderRadius: "8px",
    padding: "10px 12px",
    fontSize: "12px",
    color: "#495057"
  }}
>
  <option value="">-- Select Annual Salary (LPA) --</option>
  <option value="1-2">1 - 2 LPA</option>
  <option value="2-3">2 - 3 LPA</option>
  <option value="3-5">3 - 5 LPA</option>
  <option value="5-7">5 - 7 LPA</option>
  <option value="7-10">7 - 10 LPA</option>
  <option value="10-15">10 - 15 LPA</option>
  <option value="15-20">15 - 20 LPA</option>
  <option value="20-above">20+ LPA</option>
</Form.Select>
<Form.Control.Feedback type="invalid">
  {errors[`exp_${index}_annualSalary`]}
</Form.Control.Feedback>
</Form.Group> */}

<Form.Group className="mb-3">
  <Form.Label className="required">
    Annual Salary (LPA)<span className="required-asterisk"> *</span> 
  </Form.Label>
  <Form.Select
    value={exp.annualSalary}
    onChange={(e) =>
      handleExperienceChange(index, "annualSalary", e.target.value)
    }
    isInvalid={!!errors[`exp_${index}_annualSalary`]}
    style={{
      borderRadius: "8px",
      padding: "10px 12px",
      fontSize: "12px",
      color: "#495057",
    }}
  >
    <option value="">-- Select Annual Salary (LPA) --</option>
    <option value="1">1 LPA</option>
    <option value="2">2 LPA</option>
    <option value="3">3 LPA</option>
    <option value="4">4 LPA</option>
    <option value="5">5 LPA</option>
    <option value="6">6 LPA</option>
    <option value="7">7 LPA</option>
    <option value="8">8 LPA</option>
    <option value="9">9 LPA</option>
    <option value="10">10 LPA</option>
    <option value="10+">10+ LPA</option>
    <option value="15">15 LPA</option>
    <option value="20">20 LPA</option>
    <option value="25">25 LPA</option>
    <option value="30">30 LPA</option>
  </Form.Select>
  <Form.Control.Feedback type="invalid">
    {errors[`exp_${index}_annualSalary`]}
  </Form.Control.Feedback>
</Form.Group>


                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Company URL</Form.Label>
                      <Form.Control
                        type="url"
                        placeholder="e.g. https://company.com"
                        value={exp.companyUrl}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "companyUrl",
                            e.target.value
                          )
                        }
                        style={{ borderRadius: "8px" }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
<Form.Label>Notice Period</Form.Label>
<Form.Select
  value={exp.noticePeriod}
  onChange={(e) =>
    handleExperienceChange(index, "noticePeriod", e.target.value)
  }
  isInvalid={!!errors[`exp_${index}_noticePeriod`]}
  style={{
    borderRadius: "8px",
    padding: "10px 12px",
    fontSize: "12px",
    color: "#495057"
  }}
>
  <option value="">-- Select Notice Period --</option>
  <option value="Immediate">Immediate</option>
  <option value="Less than 10 days">Less than 10 days</option>
  <option value="15 days">15 days</option>
  <option value="30 days">30 days</option>
  <option value="45 days">45 days</option>
  <option value="60 days">60 days</option>
  <option value="90 days">90 days</option>
  <option value="More than 90 days">More than 90 days</option>
</Form.Select>
<Form.Control.Feedback type="invalid">
  {errors[`exp_${index}_noticePeriod`]}
</Form.Control.Feedback>
</Form.Group>

                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
<Form.Label>Industry</Form.Label>
<Form.Select
  value={exp.industry}
  onChange={(e) =>
    handleExperienceChange(index, "industry", e.target.value)
  }
  isInvalid={!!errors[`exp_${index}_industry`]}
  style={{
    borderRadius: "8px",
    padding: "10px 12px",
    fontSize: "12px",
    color: "#495057"
  }}
>
  <option value="">-- Select Industry --</option>
  <option value="IT Services">IT Services</option>
  <option value="Pharmaceuticals">Pharmaceuticals</option>
  <option value="Banking & Finance">Banking & Finance</option>
  <option value="Healthcare">Healthcare</option>
  <option value="Manufacturing">Manufacturing</option>
  <option value="Education">Education</option>
  <option value="Retail">Retail</option>
  <option value="Telecommunications">Telecommunications</option>
  <option value="Media & Entertainment">Media & Entertainment</option>
  <option value="Other">Other</option>
</Form.Select>
<Form.Control.Feedback type="invalid">
  {errors[`exp_${index}_industry`]}
</Form.Control.Feedback>
</Form.Group>

                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Achievements</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="e.g. Led a team of 5 developers"
                        value={exp.achievements}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "achievements",
                            e.target.value
                          )
                        }
                        style={{ borderRadius: "8px", overflowY: "auto" }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Card className="mb-4 p-3" style={{ borderRadius: "10px" }}>
                      <Form.Group className="mb-3">
                        <Form.Label>Responsibilities</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={exp.responsibilities}
                          onChange={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height =
                              e.target.scrollHeight + "px";
                            handleExperienceChange(
                              index,
                              "responsibilities",
                              e.target.value
                            );
                          }}
                          style={{
                            resize: "none",
                            overflow: "hidden",
                            minHeight: "100px",
                          }}
                          placeholder="Describe your responsibilities"
                        />
                        <small className="text-muted">
                          {charCounts[index] || 0} characters
                        </small>
                      </Form.Group>
                    </Card>
                  </Col>
                </Row>

                <Form.Check
                  type="checkbox"
                  label="Currently working here"
                  checked={exp.isCurrentEmployee}
                  onChange={(e) =>
                    handleExperienceChange(
                      index,
                      "isCurrentEmployee",
                      e.target.checked
                    )
                  }
                  className="mb-3"
                />
              </Card.Body>
            </Card>
          ))}

          <Button
            variant="outline-primary"
            onClick={addExperience}
            className="mb-4"
            style={{ borderRadius: "8px" }}
          >
            + Add Another Experience
          </Button>
        </div>
      )}

      {/* Error Display */}
      {submitError && (
        <Alert
          variant="danger"
          onClose={() => setSubmitError(null)}
          dismissible
        >
          {submitError}
        </Alert>
      )}

      {/* Navigation Buttons */}
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
          disabled={isSubmitting || !selectedOption}
          style={{ borderRadius: "8px", minWidth: "120px" }}
        >
          {isSubmitting ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
              Submitting...
            </>
          ) : (
            "Next"
          )}
        </Button>
      </div>
    </Card.Body>
  </Card>
  );
}

export default Experience;