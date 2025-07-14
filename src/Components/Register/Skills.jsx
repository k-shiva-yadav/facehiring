import { Card, Col, Row, Form, Button } from "react-bootstrap";
import { useFormContext } from "../../Context/FormContext";
import useFormSubmit from "../../Components/hooks/useFormSubmit";
import { validateSkills } from "../../Components/utils/validateForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Skills() {
  const { formData, setFormData, errors, setErrors, nextStep, prevStep, userId } = useFormContext();
  const { submit, isSubmitting, error } = useFormSubmit();
  const navigate = useNavigate();

  // Redirect to BasicInfo if userId is missing
  if (!userId) {
    setErrors({ submit: "Please complete Basic Information first." });
    navigate("/register");
    return null;
  }

  const topSkills = (formData.topSkills || ["", "", ""]).slice(0, 3); // Safe slicing

  const handleInputChange = (field, value, index = null) => {
    if (field === "topSkills" && index !== null) {
      const updatedSkills = [...topSkills];
      updatedSkills[index] = value;
      setFormData((prev) => ({ ...prev, topSkills: updatedSkills }));
      setErrors((prev) => ({ ...prev, [`topSkills_${index}`]: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async () => {
    console.log("Submit button clicked");

    const newErrors = validateSkills({ ...formData, topSkills }, userId);
    console.log("Validation result:", newErrors);

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      console.log("Blocked by validation");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const skillsString = topSkills
        .filter(skill => skill.trim() !== "")
        .join(",");

      const payload = {
        userId: userId,
        topSkills: skillsString,
        streamSkills: formData.streamSkills || "",
        stream: formData.stream || "",
      };

      console.log('Submitting skills payload:', payload);

      const response = await axios.post(
        "https://facehiringapi.codingster.in/User/Add_Skills",
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      console.log('Skills submission successful:', response.data);
      nextStep();
    } catch (err) {
      console.error('Skills submission error:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      });

      setErrors({
        submit: err.response?.data?.message || `Failed to submit skills: ${err.message}`
      });
    }
  };

  return (
    <Card className="form-card">
      <Card.Body>
        <h4 className="form-section-title">Skills</h4>
        <Row className="skills-row mb-4">
          {[0, 1, 2].map((index) => (
            <Col xs={12} md={4} key={index}>
              <Form.Group className="mb-3">
                <Form.Label className="required">Top Skill {index + 1}<span className="required-asterisk">*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`e.g. ${["JavaScript", "Python", "React"][index]}`}
                  value={topSkills[index] || ""}
                  onChange={(e) => handleInputChange("topSkills", e.target.value, index)}
                  isInvalid={!!errors[`topSkills_${index}`]}
                />
                <Form.Control.Feedback type="invalid">
                  {errors[`topSkills_${index}`]}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          ))}
        </Row>

        <Row className="mb-4">
          <Col xs={12}>
            <Form.Group className="mb-3">
              <Form.Label>Stream Skills</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Web Development, Data Science"
                value={formData.streamSkills || ""}
                onChange={(e) => handleInputChange("streamSkills", e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col xs={12}>
            <Form.Group className="mb-3">
              <Form.Label className="required">Stream<span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Computer Science, Engineering"
                value={formData.stream || ""}
                onChange={(e) => handleInputChange("stream", e.target.value)}
                isInvalid={!!errors.stream}
              />
              <Form.Control.Feedback type="invalid">
                {errors.stream}
              </Form.Control.Feedback>
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
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Next"}
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Skills;
