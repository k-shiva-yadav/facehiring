import { Container, Row, Col, ProgressBar, Card } from "react-bootstrap";
import { useFormContext } from "../../src/Context/FormContext";
import BasicInfo from "./Register/BasicInfo";
import Experience from "./Register/Experience";
import Education from "./Register/Education";
import Skills from "./Register/Skills";
import Upload from "./Register/Upload";
import basicInfoLogo from "../Assests/Images/95.png";
import experienceLogo from "../Assests/Images/96.png";
import educationLogo from "../Assests/Images/97.png";
import skillsLogo from "../Assests/Images/98.png";
import uploadLogo from "../Assests/Images/99.png";
import "../Assests/Css/Register.css";

function Register() {
  const { step, setStep, userId } = useFormContext();

  const steps = [
    { name: "Basic Information", logo: basicInfoLogo },
    { name: "Experience", logo: experienceLogo },
    { name: "Education", logo: educationLogo },
    { name: "Skills", logo: skillsLogo },
    { name: "Upload", logo: uploadLogo },
  ];

  const renderStepComponent = () => {
    switch (step) {
      case 1: return <BasicInfo />;
      case 2: return <Experience />;
      case 3: return <Education />;
      case 4: return <Skills />;
      case 5: return <Upload />;
      default: return null;
    }
  };

  const canNavigateToStep = (targetStep) => {
    if (!userId && targetStep > 1) {
      return false; // No userId, restrict to BasicInfo
    }
    // Allow navigation only to current step or completed steps
    return targetStep <= step;
  };

  return (
    <Container fluid className="register-container">
      <ProgressBar now={(step / steps.length) * 100} label={`Step ${step} of ${steps.length}`} className="mb-4" />
      <Row className="g-0">
        <Col xs={12} md={3} className="sidebar-col">
          <div className="sidebar-cards-container">
            {steps.map((stepItem, index) => {
              const targetStep = index + 1;
              const isDisabled = !canNavigateToStep(targetStep);
              return (
                <Card
                  key={index}
                  className={`step-card ${targetStep === step ? "active" : ""} ${isDisabled ? "disabled" : ""}`}
                  onClick={() => {
                    if (isDisabled) {
                      alert(`Please complete ${steps[step - 1].name} first.`);
                      return;
                    }
                    setStep(targetStep);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isDisabled) {
                      setStep(targetStep);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <Card.Body>
                    <div className="step-content">
                      <img src={stepItem.logo} alt={stepItem.name} className="step-logo" />
                      <span className="step-name">{stepItem.name}</span>
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </Col>
        <Col xs={12} md={9} className="main-content-col">
          {renderStepComponent()}
        </Col>
      </Row>
    </Container>
  );
}

export default Register;