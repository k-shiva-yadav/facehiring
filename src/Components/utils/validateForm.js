// export const validateBasicInfo = (formData) => {
//     const errors = {};
//     if (!formData.firstName) errors.firstName = "First name is required.";
//     if (!formData.lastName) errors.lastName = "Last name is required.";
//     if (!formData.email) errors.email = "Email is required.";
//     if (!formData.mobile) errors.mobile = "Mobile number is required.";
//     if (!formData.password || formData.password.length < 6) errors.password = "Password must be at least 6 characters.";
//     if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match.";
//     if (!formData.currentCity) errors.currentCity = "Current city is required.";
//     if (!formData.preferredJobLocations) errors.preferredJobLocations = "Preferred job location is required.";
//     if (!formData.dob) errors.dob = "Date of birth is required.";
//     if (!formData.gender) errors.gender = "Gender is required.";
//     if (!formData.nationality) errors.nationality = "Nationality is required.";
//     return errors;
//   };
  
//   export const validateExperience = (formData, workStatus, userId) => {
//     const errors = {};
//     if (!userId) errors.submit = "Please complete Basic Information first.";
//     if (workStatus === "experienced") {
//       formData.experiences.forEach((exp, index) => {
//         if (!exp.designation) errors[`exp_${index}_designation`] = "Designation is required.";
//         if (!exp.companyName) errors[`exp_${index}_companyName`] = "Company name is required.";
//         if (!exp.totalExperience) errors[`exp_${index}_totalExperience`] = "Total experience is required.";
//         if (!exp.annualSalary) errors[`exp_${index}_annualSalary`] = "Annual salary is required.";
//         if (!exp.responsibilities) errors[`exp_${index}_responsibilities`] = "Responsibilities are required.";
//       });
//     }
//     return errors;
//   };
  
//   export const validateEducation = (formData, userId) => {
//     const errors = {};
//     if (!userId) errors.submit = "Please complete Basic Information first.";
//     formData.educations.forEach((edu, index) => {
//       if (!edu.qualification) errors[`edu_${index}_qualification`] = "Qualification is required.";
//       if (!edu.course) errors[`edu_${index}_course`] = "Course is required.";
//       if (!edu.college) errors[`edu_${index}_college`] = "College is required.";
//       if (!edu.passingYear) errors[`edu_${index}_passingYear`] = "Passing year is required.";
//       if (!edu.percentage) errors[`edu_${index}_percentage`] = "Percentage is required.";
//     });
//     return errors;
//   };
  
//   export const validateSkills = (formData, userId) => {
//     const errors = {};
//     if (!userId) errors.submit = "Please complete Basic Information first.";
//     const topSkills = formData.topSkills || [];
//     topSkills.forEach((skill, index) => {
//       if (!skill) errors[`topSkills_${index}`] = `Top Skill ${index + 1} is required.`;
//     });
//     if (!formData.stream) errors.stream = "Stream is required.";
//     return errors;
//   };
  
//   export const validateUpload = (formData, userId) => {
//     const errors = {};
//     if (!userId) errors.submit = "Please complete Basic Information first.";
//     if (!formData.resume) errors.resume = "Resume is required.";
//     return errors;
//   };
export const validateBasicInfo = (formData) => {
  const errors = {};

  // First Name
  if (!formData.firstName || formData.firstName.trim() === "") {
    errors.firstName = "First name is required.";
  }

  // Last Name
  if (!formData.lastName || formData.lastName.trim() === "") {
    errors.lastName = "Last name is required.";
  }

  // Email
  if (!formData.email || formData.email.trim() === "") {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Invalid email format.";
  }

  // Mobile
  if (!formData.mobile || formData.mobile.trim() === "") {
    errors.mobile = "Mobile number is required.";
  } else if (!/^\d{10}$/.test(formData.mobile)) {
    errors.mobile = "Mobile number must be exactly 10 digits.";
  }

  // Alternate Mobile (optional, but validate if provided)
  if (formData.altMobile && formData.altMobile.trim() !== "") {
    if (!/^\d{10}$/.test(formData.altMobile)) {
      errors.altMobile = "Alternate mobile number must be exactly 10 digits.";
    }
  }

  // Password
  if (!formData.password || formData.password.trim() === "" || formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  // Confirm Password
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  // Current City
  if (!formData.currentCity || formData.currentCity.trim() === "") {
    errors.currentCity = "Current city is required.";
  }

  // Preferred Job Locations
  if (!formData.preferredJobLocations || formData.preferredJobLocations.trim() === "") {
    errors.preferredJobLocations = "Preferred job location is required.";
  }

  // Date of Birth
  if (!formData.dob || formData.dob.trim() === "") {
    errors.dob = "Date of birth is required.";
  }

  // Gender
  if (!formData.gender || formData.gender.trim() === "") {
    errors.gender = "Gender is required.";
  }

  // Nationality
  if (!formData.nationality || formData.nationality.trim() === "") {
    errors.nationality = "Nationality is required.";
  }

  return errors;
};

export const validateExperience = (formData, workStatus, userId) => {
  const errors = {};
  if (!userId) errors.submit = "Please complete Basic Information first.";
  if (workStatus === "experienced") {
    formData.experiences.forEach((exp, index) => {
      if (!exp.designation) errors[`exp_${index}_designation`] = "Designation is required.";
      if (!exp.companyName) errors[`exp_${index}_companyName`] = "Company name is required.";
      if (!exp.totalExperience) errors[`exp_${index}_totalExperience`] = "Total experience is required.";
      if (!exp.annualSalary) errors[`exp_${index}_annualSalary`] = "Annual salary is required.";
      if (!exp.responsibilities) errors[`exp_${index}_responsibilities`] = "Responsibilities are required.";
    });
  }
  return errors;
};

export const validateEducation = (formData, userId) => {
  const errors = {};
  if (!userId) errors.submit = "Please complete Basic Information first.";
  formData.educations.forEach((edu, index) => {
    if (!edu.qualification) errors[`edu_${index}_qualification`] = "Qualification is required.";
    if (!edu.course) errors[`edu_${index}_course`] = "Course is required.";
    if (!edu.college) errors[`edu_${index}_college`] = "College is required.";
    if (!edu.passingYear) errors[`edu_${index}_passingYear`] = "Passing year is required.";
    if (!edu.percentage) errors[`edu_${index}_percentage`] = "Percentage is required.";
  });
  return errors;
};

export const validateSkills = (formData, userId) => {
  const errors = {};
  if (!userId) errors.submit = "Please complete Basic Information first.";
  const topSkills = formData.topSkills || [];
  topSkills.forEach((skill, index) => {
    if (!skill) errors[`topSkills_${index}`] = `Top Skill ${index + 1} is required.`;
  });
  if (!formData.stream) errors.stream = "Stream is required.";
  return errors;
};

export const validateUpload = (formData, userId) => {
  const errors = {};
  if (!userId) errors.submit = "Please complete Basic Information first.";
  if (!formData.resume) errors.resume = "Resume is required.";
  return errors;
};