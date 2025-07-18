// import { Card, Col, Row, Form, Button } from "react-bootstrap";
// import { useFormContext } from "../../Context/FormContext";
// import useFormSubmit from "../../Components/hooks/useFormSubmit";
// import { validateBasicInfo } from "../../Components/utils/validateForm";

// function BasicInfo() {
//   const { formData, setFormData, errors, setErrors, nextStep, setUserId } = useFormContext();
//   const { submit, isSubmitting, error } = useFormSubmit();

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     setErrors((prev) => ({ ...prev, [field]: "" }));
//   };

//   const handleSubmit = async () => {
//     const newErrors = validateBasicInfo(formData);
//     setErrors(newErrors);
//     if (Object.keys(newErrors).length > 0) return;

//     try {
//       const payload = {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         mobile: formData.mobile,
//         altMobile: formData.altMobile || "",
//         password: formData.password,
//         city: formData.city || "",
//         currentCity: formData.currentCity,
//         preferredJobLocations: formData.preferredJobLocations,
//         dob: formData.dob,
//         gender: formData.gender,
//         nationality: formData.nationality,
//       };
//       const token = localStorage.getItem('token');
//       const response = await submit(
//         "https://facehiringapi.codingster.in/User/BasicInfo",
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             ...(token && token !== "" && { Authorization: `Bearer ${token}` }),
//           },
//         }
//       );
//       if (response.data?.id) {
//         setUserId(response.data.id);
//         localStorage.setItem('userId', response.data.id); // Store userId for persistence
//         nextStep();
//       } else {
//         throw new Error("User ID not found in response.");
//       }
//     } catch (err) {
//       console.error('BasicInfo submission error:', err.response?.data || err.message);
//     }
//   };

//   return (
//     <Card className="form-card">
//       <Card.Body>
//         <h4 className="form-section-title">Basic Information</h4>
//         <Row>
//           <Col xs={12} md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>First name*</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter your first name"
//                 value={formData.firstName}
//                 onChange={(e) => handleInputChange("firstName", e.target.value)}
//                 isInvalid={!!errors.firstName}
//               />
//               <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
//             </Form.Group>
//           </Col>
//           <Col xs={12} md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Last name*</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter your last name"
//                 value={formData.lastName}
//                 onChange={(e) => handleInputChange("lastName", e.target.value)}
//                 isInvalid={!!errors.lastName}
//               />
//               <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col xs={12}>
//             <Form.Group className="mb-3">
//               <Form.Label>Email ID*</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter your email ID"
//                 value={formData.email}
//                 onChange={(e) => handleInputChange("email", e.target.value)}
//                 isInvalid={!!errors.email}
//               />
//               <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col xs={12} md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Mobile number*</Form.Label>
//               <Form.Control
//                 type="tel"
//                 placeholder="Enter your mobile no."
//                 value={formData.mobile}
//                 onChange={(e) => handleInputChange("mobile", e.target.value)}
//                 isInvalid={!!errors.mobile}
//               />
//               <Form.Control.Feedback type="invalid">{errors.mobile}</Form.Control.Feedback>
//             </Form.Group>
//           </Col>
//           <Col xs={12} md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Alternate mobile number</Form.Label>
//               <Form.Control
//                 type="tel"
//                 placeholder="Enter alternate no."
//                 value={formData.altMobile}
//                 onChange={(e) => handleInputChange("altMobile", e.target.value)}
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col xs={12} md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Password*</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Enter your password (Minimum 6 characters)"
//                 value={formData.password}
//                 onChange={(e) => handleInputChange("password", e.target.value)}
//                 isInvalid={!!errors.password}
//               />
//               <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
//             </Form.Group>
//           </Col>
//           <Col xs={12} md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Confirm password*</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Confirm your password"
//                 value={formData.confirmPassword}
//                 onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
//                 isInvalid={!!errors.confirmPassword}
//               />
//               <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col xs={12} md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>City</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter your city"
//                 value={formData.city}
//                 onChange={(e) => handleInputChange("city", e.target.value)}
//               />
//             </Form.Group>
//           </Col>
//           <Col xs={12} md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Current city*</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter the city you live in"
//                 value={formData.currentCity}
//                 onChange={(e) => handleInputChange("currentCity", e.target.value)}
//                 isInvalid={!!errors.currentCity}
//               />
//               <Form.Control.Feedback type="invalid">{errors.currentCity}</Form.Control.Feedback>
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col xs={12}>
//             <Form.Group className="mb-3">
//               <Form.Label>Preferred Job Location*</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Preferred Job Location"
//                 value={formData.preferredJobLocations}
//                 onChange={(e) => handleInputChange("preferredJobLocations", e.target.value)}
//                 isInvalid={!!errors.preferredJobLocations}
//               />
//               <Form.Control.Feedback type="invalid">{errors.preferredJobLocations}</Form.Control.Feedback>
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col xs={12} md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Date of Birth*</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={formData.dob}
//                 onChange={(e) => handleInputChange("dob", e.target.value)}
//                 isInvalid={!!errors.dob}
//               />
//               <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
//             </Form.Group>
//           </Col>
//           <Col xs={12} md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Gender*</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Gender"
//                 value={formData.gender}
//                 onChange={(e) => handleInputChange("gender", e.target.value)}
//                 isInvalid={!!errors.gender}
//               />
//               <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col xs={12}>
//             <Form.Group className="mb-3">
//               <Form.Label>Nationality*</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter nationality"
//                 value={formData.nationality}
//                 onChange={(e) => handleInputChange("nationality", e.target.value)}
//                 isInvalid={!!errors.nationality}
//               />
//               <Form.Control.Feedback type="invalid">{errors.nationality}</Form.Control.Feedback>
//             </Form.Group>
//           </Col>
//         </Row>
//         {errors.submit && <div className="text-danger mb-3">{errors.submit}</div>}
//         {error && <div className="text-danger mb-3">{error}</div>}
//         <Row className="form-footer">
//           <Col className="text-end">
//             <Button variant="link" className="skip-btn me-3" onClick={nextStep}>
//               Skip this time
//             </Button>
//             <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
//               {isSubmitting ? "Submitting..." : "Next"}
//             </Button>
//           </Col>
//         </Row>
//       </Card.Body>
//     </Card>
//   );
// }

// export default BasicInfo;
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import { useFormContext } from "../../Context/FormContext";
import useFormSubmit from "../../Components/hooks/useFormSubmit";
import { validateBasicInfo } from "../../Components/utils/validateForm";
import { useState } from "react";

function BasicInfo() {
  const { formData, setFormData, errors, setErrors, nextStep, setUserId } = useFormContext();
  const { submit, isSubmitting, error } = useFormSubmit();

  // const handleInputChange = (field, value) => {
  //   setFormData((prev) => ({ ...prev, [field]: value }));
  //   setErrors((prev) => ({ ...prev, [field]: "" }));
  // };

  const handleInputChange = (field, value) => {
  setFormData((prev) => ({ ...prev, [field]: value }));
  setErrors((prev) => ({ ...prev, [field]: "" }));

  if (["city", "currentCity", "preferredJobLocations"].includes(field)) {
    setActiveField(field);

    if (!value) {
      setSuggestions([]);
      return;
    }

    const filtered = citySuggestionsMaster.filter((city) =>
      city.toLowerCase().startsWith(value.toLowerCase())
    );

    setSuggestions(filtered);
  }
};


  const handleSubmit = async () => {
    const newErrors = validateBasicInfo(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobile: formData.mobile,
        altMobile: formData.altMobile || "",
        password: formData.password,
        city: formData.city || "",
        currentCity: formData.currentCity,
        preferredJobLocations: formData.preferredJobLocations,
        dob: formData.dob,
        gender: formData.gender,
        nationality: formData.nationality,
      };
      const token = localStorage.getItem("token");
      const response = await submit(
        "https://facehiringapi.codingster.in/User/BasicInfo",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && token !== "" && { Authorization: `Bearer ${token}` }),
          },
        }
      );
      if (response.data?.id) {
        setUserId(response.data.id);
        localStorage.setItem("userId", response.data.id); // Store userId for persistence
        nextStep();
      } else {
        throw new Error("User ID not found in response.");
      }
    } catch (err) {
      console.error("BasicInfo submission error:", err.response?.data || err.message);
    }
  };

  // Prevent non-digit input for phone numbers
  const handlePhoneKeyPress = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

const citySuggestionsMaster = [
  "Hyderabad", "Bengaluru", "Mumbai", "Chennai", "Delhi", "Kolkata", "Pune", "Ahmedabad", "Lucknow", "Jaipur",
  "Visakhapatnam", "Surat", "Nagpur", "Indore", "Bhopal", "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra",
  "Nashik", "Faridabad", "Meerut", "Rajkot", "Varanasi", "Amritsar", "Prayagraj", "Ranchi", "Coimbatore", "Guwahati",
  "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", "Chandigarh", "Mysore", "Bareilly", "Tiruchirappalli",
  "Jalandhar", "Gwalior", "Thiruvananthapuram", "Noida", "Dehradun", "Aurangabad", "Jamshedpur", "Udaipur",
  "Thane", "Howrah", "Shimla", "Panaji", "Puducherry", "Shillong", "Aizawl", "Itanagar", "Imphal", "Kohima",
  "Gangtok", "Agartala", "Dhanbad", "Bilaspur", "Solapur", "Nellore", "Guntur", "Tirupati", "Karimnagar", "Warangal",
  "Nizamabad", "Vizianagaram", "Eluru", "Anantapur", "Kakinada", "Srikakulam", "Ongole", "Kadapa", "Rajahmundry",
  "Sambalpur", "Cuttack", "Rourkela", "Brahmapur", "Balasore", "Bhadrak", "Baripada", "Puri", "Paradeep",
  "Kollam", "Kozhikode", "Thrissur", "Alappuzha", "Kannur", "Palakkad", "Kottayam", "Malappuram", "Kasaragod",
  "Ahmednagar", "Nanded", "Satara", "Latur", "Sangli", "Beed", "Jalgaon", "Kolhapur", "Dhule", "Chandrapur",
  "Bhiwandi", "Parbhani", "Ratnagiri", "Panvel", "Siliguri", "Durgapur", "Asansol", "Haldia", "Darjeeling",
  "Tinsukia", "Silchar", "Nagaon", "Tezpur", "Diphu", "Dibrugarh", "Barpeta", "Karimganj", "Bongaigaon",
  "Amarkantak", "Chhindwara", "Satna", "Sagar", "Ujjain", "Ratlam", "Rewa", "Bhind", "Shivpuri", "Guna",
  "Morena", "Betul", "Katni", "Damoh", "Sehore", "Hoshangabad", "Dewas", "Vidisha", "Itarsi", "Mandsaur",
  "Balaghat", "Jabalpur", "Pali", "Bikaner", "Ajmer", "Alwar", "Bhilwara", "Hanumangarh", "Sikar", "Banswara",
  "Churu", "Bharatpur", "Barmer", "Sri Ganganagar", "Dausa", "Tonk", "Sawai Madhopur", "Nagaur"
];


const [suggestions, setSuggestions] = useState([]);
const [activeField, setActiveField] = useState("");

const styles = {
  suggestionBox: {
    border: "1px solid #ccc",
    maxHeight: "150px",
    overflowY: "auto",
    background: "#fff",
    marginTop: "0px",
    paddingLeft: "0",
    listStyle: "none",
    position: "absolute",
    zIndex: 1000,
    width: "100%",
    borderRadius: "5px",
  },
  suggestionItem: {
    padding: "8px 12px",
    cursor: "pointer",
    fontSize: "12px",
    color: "#333",
    textAlign: "left",  
  },
};




  return (
    <Card className="form-card">
      <Card.Body>
        <h4 className="form-section-title">Basic Information</h4>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="required">First name<span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="required">Last name<span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form.Group className="mb-3">
              <Form.Label className="required">Email ID<span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email ID"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="required">Mobile number<span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter your mobile no."
                value={formData.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                onKeyPress={handlePhoneKeyPress}
                isInvalid={!!errors.mobile}
              />
              <Form.Control.Feedback type="invalid">{errors.mobile}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 500, fontSize: "14px", color: "#212529" }}>Alternate mobile number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter alternate no."
                value={formData.altMobile}
                onChange={(e) => handleInputChange("altMobile", e.target.value)}
                onKeyPress={handlePhoneKeyPress}
                isInvalid={!!errors.altMobile}
              />
              <Form.Control.Feedback type="invalid">{errors.altMobile}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="required">Password<span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password (Minimum 6 characters)"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="required">Confirm password<span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            {/* <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
              />
            </Form.Group> */}

            <Form.Group className="mb-3" style={{ position: "relative" }}>
  <Form.Label style={{ fontWeight: 500, fontSize: "14px", color: "#212529" }}>City</Form.Label>
  <Form.Control
    type="text"
    placeholder="Enter your city"
    value={formData.city}
    onChange={(e) => handleInputChange("city", e.target.value)}
  />
  {activeField === "city" && suggestions.length > 0 && (
    <ul style={styles.suggestionBox}>
      {suggestions.map((sug, idx) => (
        <li
          key={idx}
          style={styles.suggestionItem}
          onClick={() => {
            handleInputChange("city", sug);
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
          <Col xs={12} md={6}>
            {/* <Form.Group className="mb-3">
              <Form.Label className="required">Current city<span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the city you live in"
                value={formData.currentCity}
                onChange={(e) => handleInputChange("currentCity", e.target.value)}
                isInvalid={!!errors.currentCity}
              />
              <Form.Control.Feedback type="invalid">{errors.currentCity}</Form.Control.Feedback>
            </Form.Group> */}

            <Form.Group className="mb-3" style={{ position: "relative" }}>
  <Form.Label className="required">Current City<span className="required-asterisk">*</span></Form.Label>
  <Form.Control
    type="text"
    placeholder="Enter current city"
    value={formData.currentCity}
    onChange={(e) => handleInputChange("currentCity", e.target.value)}
    isInvalid={!!errors.currentCity}
  />
  {activeField === "currentCity" && suggestions.length > 0 && (
    <ul style={styles.suggestionBox}>
      {suggestions.map((sug, idx) => (
        <li
          key={idx}
          style={styles.suggestionItem}
          onClick={() => {
            handleInputChange("currentCity", sug);
            setSuggestions([]);
          }}
        >
          {sug}
        </li>
      ))}
    </ul>
  )}
  <Form.Control.Feedback type="invalid">{errors.currentCity}</Form.Control.Feedback>
</Form.Group>



          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {/* <Form.Group className="mb-3">
              <Form.Label className="required">Preferred Job Location<span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Preferred Job Location"
                value={formData.preferredJobLocations}
                onChange={(e) => handleInputChange("preferredJobLocations", e.target.value)}
                isInvalid={!!errors.preferredJobLocations}
              />
              <Form.Control.Feedback type="invalid">{errors.preferredJobLocations}</Form.Control.Feedback>
            </Form.Group> */}

            <Form.Group className="mb-3" style={{ position: "relative" }}>
  <Form.Label className="required" style={{ fontWeight: 500, fontSize: "14px", color: "#212529" }}>Preferred Job Location<span className="required-asterisk">*</span></Form.Label>
  <Form.Control
    type="text"
    placeholder="Preferred Job Location"
    value={formData.preferredJobLocations}
    onChange={(e) => handleInputChange("preferredJobLocations", e.target.value)}
    isInvalid={!!errors.preferredJobLocations}
  />
  {activeField === "preferredJobLocations" && suggestions.length > 0 && (
    <ul style={styles.suggestionBox}>
      {suggestions.map((sug, idx) => (
        <li
          key={idx}
          style={styles.suggestionItem}
          onClick={() => {
            handleInputChange("preferredJobLocations", sug);
            setSuggestions([]);
          }}
        >
          {sug}
        </li>
      ))}
    </ul>
  )}
  <Form.Control.Feedback type="invalid">{errors.preferredJobLocations}</Form.Control.Feedback>
</Form.Group>


          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="required">Date of Birth<span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                type="date"
                value={formData.dob}
                onChange={(e) => handleInputChange("dob", e.target.value)}
                isInvalid={!!errors.dob}
              />
              <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            {/* <Form.Group className="mb-3">
              <Form.Label>Gender*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Gender"
                value={formData.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                isInvalid={!!errors.gender}
              />
              <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
            </Form.Group> */}
            <Form.Group className="mb-3">
  <Form.Label className="required">Gender<span className="required-asterisk">*</span></Form.Label>
  <Form.Select
    value={formData.gender}
    onChange={(e) => handleInputChange("gender", e.target.value)}
    isInvalid={!!errors.gender}
    style={{
      borderRadius: "8px",
      padding: "10px 12px",
      fontSize: "12px",
      color: "#495057"
    }}
  >
    <option value="">-- Select Gender --</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
    <option value="Prefer not to say">Prefer not to say</option>
  </Form.Select>
  <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
</Form.Group>

          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form.Group className="mb-3">
              <Form.Label className="required">Nationality<span className="required-asterisk">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter nationality"
                value={formData.nationality}
                onChange={(e) => handleInputChange("nationality", e.target.value)}
                isInvalid={!!errors.nationality}
              />
              <Form.Control.Feedback type="invalid">{errors.nationality}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        {errors.submit && <div className="text-danger mb-3">{errors.submit}</div>}
        {error && <div className="text-danger mb-3">{error}</div>}
        <Row className="form-footer">
          <Col className="text-end">
            {/* <Button variant="link" className="skip-btn me-3" onClick={nextStep}>
              Skip this time
            </Button> */}
            <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Next"}
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default BasicInfo;