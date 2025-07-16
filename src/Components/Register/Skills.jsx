import { Card, Col, Row, Form, Button } from "react-bootstrap";
import { useFormContext } from "../../Context/FormContext";
import useFormSubmit from "../../Components/hooks/useFormSubmit";
import { validateSkills } from "../../Components/utils/validateForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Skills() {

  // src/data/skillSuggestions.js

 const topSkillsList = [
  // Programming Languages
  "JavaScript", "TypeScript", "Python", "Java", "C", "C++", "C#", "Go", "Rust",
  "Ruby", "PHP", "Swift", "Kotlin", "Dart", "R", "Scala", "Perl", "MATLAB",
  "Shell", "Bash", "Assembly", "Haskell",

  // Web Frontend
  "HTML", "CSS", "Sass", "Bootstrap", "Tailwind CSS",
  "React", "Next.js", "Vue.js", "Nuxt.js", "Angular", "Svelte", "jQuery",

  // Web Backend
  "Node.js", "Express", "Spring Boot", "Django", "Flask", "FastAPI", "Laravel", "Ruby on Rails", "ASP.NET",

  // Mobile & Cross-platform
  "React Native", "Flutter", "Ionic", "Xamarin", "SwiftUI",

  // Databases
  "SQL", "MySQL", "PostgreSQL", "SQLite", "MongoDB", "Firebase", "Redis", "Oracle DB", "Microsoft SQL Server",

  // Cloud & DevOps
  "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Jenkins", "Terraform",

  // AI / Data Science / ML
  "TensorFlow", "PyTorch", "Pandas", "NumPy", "Scikit-learn", "OpenCV", "NLTK", "Keras", "Matplotlib", "Seaborn",

  // Testing
  "Jest", "Mocha", "Chai", "Cypress", "Selenium", "Playwright", "Junit",

  // Tools & Version Control
  "Git", "GitHub", "Bitbucket", "VS Code", "Webpack", "Babel", "ESLint", "Prettier",

  // Blockchain & Others
  "Solidity", "Web3.js", "Hardhat", "Truffle", "Metamask",

  // UI/UX Design
  "Figma", "Adobe XD", "Sketch", "Canva",

  // Others
  "GraphQL", "REST API", "Socket.io", "Three.js", "Prisma", "Strapi", "Storybook", "Electron.js"
];

 const streamSkillsList = [
  "Web Development",
  "Mobile App Development",
  "Data Science",
  "Artificial Intelligence",
  "Machine Learning",
  "Cloud Computing",
  "Cybersecurity",
  "Game Development",
  "UI/UX Design",
  "DevOps",
  "Embedded Systems",
  "IoT Development",
  "Blockchain Development",
  "Big Data",
  "AR/VR Development"
];

 const streamList = [
  "Computer Science Engineering",
  "Information Technology",
  "Electronics and Communication Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Instrumentation Engineering",
  "Biomedical Engineering",
  "Aerospace Engineering",
  "Chemical Engineering",
  "Mechatronics",
  "Automobile Engineering"
];

  const [activeField, setActiveField] = useState(null);
const [suggestions, setSuggestions] = useState([]);
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

  // const handleInputChange = (field, value, index = null) => {
  //   if (field === "topSkills" && index !== null) {
  //     const updatedSkills = [...topSkills];
  //     updatedSkills[index] = value;
  //     setFormData((prev) => ({ ...prev, topSkills: updatedSkills }));
  //     setErrors((prev) => ({ ...prev, [`topSkills_${index}`]: "" }));
  //   } else {
  //     setFormData((prev) => ({ ...prev, [field]: value }));
  //     setErrors((prev) => ({ ...prev, [field]: "" }));
  //   }
  // };

const handleInputChange = (field, value, index = null) => {
  if (field === "topSkills" && index !== null) {
    const updatedSkills = [...topSkills];
    updatedSkills[index] = value;
    setFormData((prev) => ({ ...prev, topSkills: updatedSkills }));
    setErrors((prev) => ({ ...prev, [`topSkills_${index}`]: "" }));

    setActiveField(`topSkills_${index}`);
    const filtered = topSkillsList.filter((skill) =>
      skill.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filtered);
  } else {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));

    setActiveField(field);

    let sourceList = [];
    if (field === "streamSkills") sourceList = streamSkillsList;
    if (field === "stream") sourceList = streamList;

    const filtered = sourceList.filter((sug) =>
      sug.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filtered);
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



const handleSuggestionClick = (field, value, index = null) => {
  if (field === "topSkills" && index !== null) {
    const updatedSkills = [...topSkills];
    updatedSkills[index] = value;
    setFormData((prev) => ({ ...prev, topSkills: updatedSkills }));
  } else {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }
  setSuggestions([]);
  setActiveField(null);
};

const updateSuggestions = (value) => {
  let sourceList = [];
  if (activeField?.startsWith("topSkills")) sourceList = topSkillsList;
  else if (activeField === "streamSkills") sourceList = streamSkillsList;
  else if (activeField === "stream") sourceList = streamList;

  const filtered = sourceList.filter((sug) =>
    sug.toLowerCase().startsWith(value.toLowerCase())
  );
  setSuggestions(filtered);
};
  return (
    // <Card className="form-card">
    //   <Card.Body>
    //     <h4 className="form-section-title">Skills</h4>
    //     <Row className="skills-row mb-4">
    //       {[0, 1, 2].map((index) => (
    //         <Col xs={12} md={4} key={index}>
    //           <Form.Group className="mb-3">
    //             <Form.Label className="required">Top Skill {index + 1}<span className="required-asterisk">*</span></Form.Label>
    //             <Form.Control
    //               type="text"
    //               placeholder={`e.g. ${["JavaScript", "Python", "React"][index]}`}
    //               value={topSkills[index] || ""}
    //               onChange={(e) => handleInputChange("topSkills", e.target.value, index)}

    //               isInvalid={!!errors[`topSkills_${index}`]}
    //             />
    //             <Form.Control.Feedback type="invalid">
    //               {errors[`topSkills_${index}`]}
    //             </Form.Control.Feedback>
    //           </Form.Group>
    //         </Col>
    //       ))}
    //     </Row>

    //     <Row className="mb-4">
    //       <Col xs={12}>
    //         <Form.Group className="mb-3">
    //           <Form.Label>Stream Skills</Form.Label>
    //           <Form.Control
    //             type="text"
    //             placeholder="e.g. Web Development, Data Science"
    //             value={formData.streamSkills || ""}
    //             onChange={(e) => handleInputChange("streamSkills", e.target.value)}
    //           />
    //         </Form.Group>
    //       </Col>
    //     </Row>

    //     <Row className="mb-4">
    //       <Col xs={12}>
    //         <Form.Group className="mb-3">
    //           <Form.Label className="required">Stream<span className="required-asterisk">*</span></Form.Label>
    //           <Form.Control
    //             type="text"
    //             placeholder="e.g. Computer Science, Engineering"
    //             value={formData.stream || ""}
    //             onChange={(e) => handleInputChange("stream", e.target.value)}
    //             isInvalid={!!errors.stream}
    //           />
    //           <Form.Control.Feedback type="invalid">
    //             {errors.stream}
    //           </Form.Control.Feedback>
    //         </Form.Group>
    //       </Col>
    //     </Row>

    //     {errors.submit && <div className="text-danger mb-3">{errors.submit}</div>}
    //     {error && <div className="text-danger mb-3">{error}</div>}

    //     <Row className="form-footer">
    //       <Col className="text-end">
    //         <Button variant="link" className="skip-btn me-3" onClick={prevStep}>
    //           Back
    //         </Button>
    //         <Button variant="link" className="skip-btn me-3" onClick={nextStep}>
    //           Skip this time
    //         </Button>
    //         <Button
    //           variant="primary"
    //           onClick={handleSubmit}
    //           disabled={isSubmitting}
    //         >
    //           {isSubmitting ? "Submitting..." : "Next"}
    //         </Button>
    //       </Col>
    //     </Row>
    //   </Card.Body>
    // </Card>
    <Card className="form-card">
  <Card.Body>
    <h4 className="form-section-title">Skills</h4>
    <Row className="skills-row mb-4">
      {[0, 1, 2].map((index) => (
        <Col xs={12} md={4} key={index}>
          <Form.Group className="mb-3" style={{ position: "relative" }}>
            <Form.Label className="required">
              Top Skill {index + 1}
              <span className="required-asterisk">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={`e.g. ${["JavaScript", "Python", "React"][index]}`}
              value={topSkills[index] || ""}
              onChange={(e) => {
                handleInputChange("topSkills", e.target.value, index);
                setActiveField(`topSkills_${index}`);
                updateSuggestions(e.target.value);
              }}
              onBlur={() => setTimeout(() => setSuggestions([]), 200)}
              onFocus={() => setActiveField(`topSkills_${index}`)}
              isInvalid={!!errors[`topSkills_${index}`]}
            />
            {activeField === `topSkills_${index}` && suggestions.length > 0 && (
              <ul style={suggestionStyles.suggestionBox}>
                {suggestions.map((sug, i) => (
                  <li
                    key={i}
                    style={suggestionStyles.suggestionItem}
                    onClick={() =>
                      handleSuggestionClick("topSkills", sug, index)
                    }
                  >
                    {sug}
                  </li>
                ))}
              </ul>
            )}
            <Form.Control.Feedback type="invalid">
              {errors[`topSkills_${index}`]}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      ))}
    </Row>

    <Row className="mb-4">
      <Col xs={12}>
        <Form.Group className="mb-3" style={{ position: "relative" }}>
          <Form.Label>Stream Skills</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. Web Development, Data Science"
            value={formData.streamSkills || ""}
            onChange={(e) => {
              handleInputChange("streamSkills", e.target.value);
              setActiveField("streamSkills");
              updateSuggestions(e.target.value);
            }}
            onBlur={() => setTimeout(() => setSuggestions([]), 200)}
            onFocus={() => setActiveField("streamSkills")}
          />
          {activeField === "streamSkills" && suggestions.length > 0 && (
            <ul style={suggestionStyles.suggestionBox}>
              {suggestions.map((sug, i) => (
                <li
                  key={i}
                  style={suggestionStyles.suggestionItem}
                 onClick={() => handleSuggestionClick("streamSkills", sug)}

                >
                  {sug}
                </li>
              ))}
            </ul>
          )}
        </Form.Group>
      </Col>
    </Row>

    <Row className="mb-4">
      <Col xs={12}>
        <Form.Group className="mb-3" style={{ position: "relative" }}>
          <Form.Label className="required">
            Stream<span className="required-asterisk">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. Computer Science, Engineering"
            value={formData.stream || ""}
            onChange={(e) => {
              handleInputChange("stream", e.target.value);
              setActiveField("stream");
              updateSuggestions(e.target.value);
            }}
            onBlur={() => setTimeout(() => setSuggestions([]), 200)}
            onFocus={() => setActiveField("stream")}
            isInvalid={!!errors.stream}
          />
          {activeField === "stream" && suggestions.length > 0 && (
            <ul style={suggestionStyles.suggestionBox}>
              {suggestions.map((sug, i) => (
                <li
                  key={i}
                  style={suggestionStyles.suggestionItem}
                  onClick={() => handleSuggestionClick("stream", sug)}
                >
                  {sug}
                </li>
              ))}
            </ul>
          )}
          <Form.Control.Feedback type="invalid">
            {errors.stream}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>

    {errors.submit && (
      <div className="text-danger mb-3">{errors.submit}</div>
    )}
    {error && <div className="text-danger mb-3">{error}</div>}

    <Row className="form-footer">
      <Col className="text-end">
        <Button
          variant="link"
          className="skip-btn me-3"
          onClick={prevStep}
        >
          Back
        </Button>
        <Button
          variant="link"
          className="skip-btn me-3"
          onClick={nextStep}
        >
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

const suggestionStyles = {
  suggestionBox: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "8px",
    zIndex: 999,
    maxHeight: "150px",
    overflowY: "auto",
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  suggestionItem: {
    fontSize: "12px",
    textAlign: "left",
    padding: "8px 12px",
    cursor: "pointer",
  },
};


