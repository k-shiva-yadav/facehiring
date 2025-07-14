// // // // // import { createContext, useContext, useState, useEffect } from "react";

// // // // // const FormContext = createContext();

// // // // // export const FormProvider = ({ children }) => {
// // // // //   const [step, setStep] = useState(1);
// // // // //   const [userId, setUserId] = useState("");
// // // // //   const [workStatus, setWorkStatus] = useState("");
// // // // //   const [isFresher, setIsFresher] = useState(false);
// // // // //   const [formData, setFormData] = useState({
// // // // //     firstName: "",
// // // // //     lastName: "",
// // // // //     email: "",
// // // // //     mobile: "",
// // // // //     altMobile: "",
// // // // //     password: "",
// // // // //     confirmPassword: "",
// // // // //     city: "",
// // // // //     currentCity: "",
// // // // //     preferredJobLocations: "",
// // // // //     dob: "",
// // // // //     gender: "",
// // // // //     nationality: "",
// // // // //     topSkills: ["", "", "", ""], // Changed to array
// // // // //     streamSkills: "",
// // // // //     stream: "",
// // // // //     resume: null,
// // // // //     profilePhoto: null,
// // // // //     videoPitch: null,
// // // // //     workSamples: null,
// // // // //     additionalDocs: null,
// // // // //     educations: [{
// // // // //       qualification: "",
// // // // //       course: "",
// // // // //       specialization: "",
// // // // //       college: "",
// // // // //       passingYear: "",
// // // // //       percentage: "",
// // // // //       isHighest: false
// // // // //     }],
// // // // //     experiences: [{
// // // // //       totalExperience: "",
// // // // //       designation: "",
// // // // //       companyName: "",
// // // // //       typeOfEmployment: "",
// // // // //       achievements: "",
// // // // //       companyUrl: "",
// // // // //       annualSalary: "",
// // // // //       noticePeriod: "",
// // // // //       industry: "",
// // // // //       responsibilities: "",
// // // // //       isCurrentEmployee: false
// // // // //     }],
// // // // //   });
// // // // //   const [errors, setErrors] = useState({});

// // // // //   useEffect(() => {
// // // // //     if (step === 2) {
// // // // //       const hasExperienceData = formData.experiences.some(
// // // // //         (exp) => exp.designation || exp.companyName || exp.annualSalary || exp.responsibilities
// // // // //       );
// // // // //       if (!hasExperienceData) {
// // // // //         setWorkStatus("");
// // // // //         setIsFresher(false);
// // // // //       }
// // // // //     }
// // // // //   }, [step, formData.experiences]);

// // // // //   const nextStep = () => {
// // // // //     if (step > 1 && !userId) {
// // // // //       setErrors({ submit: "Please complete Basic Information first." });
// // // // //       return;
// // // // //     }
// // // // //     setStep((prev) => (prev < 5 ? prev + 1 : prev));
// // // // //   };

// // // // //   const prevStep = () => {
// // // // //     setStep((prev) => (prev > 1 ? prev - 1 : prev));
// // // // //   };

// // // // //   const resetWorkStatus = () => {
// // // // //     setWorkStatus("");
// // // // //     setIsFresher(false);
// // // // //     setFormData((prev) => ({
// // // // //       ...prev,
// // // // //       experiences: [{
// // // // //         totalExperience: "",
// // // // //         designation: "",
// // // // //         companyName: "",
// // // // //         typeOfEmployment: "",
// // // // //         achievements: "",
// // // // //         companyUrl: "",
// // // // //         annualSalary: "",
// // // // //         noticePeriod: "",
// // // // //         industry: "",
// // // // //         responsibilities: "",
// // // // //         isCurrentEmployee: false
// // // // //       }],
// // // // //     }));
// // // // //   };

// // // // //   return (
// // // // //     <FormContext.Provider
// // // // //       value={{
// // // // //         step,
// // // // //         setStep,
// // // // //         userId,
// // // // //         setUserId,
// // // // //         formData,
// // // // //         setFormData,
// // // // //         errors,
// // // // //         setErrors,
// // // // //         workStatus,
// // // // //         setWorkStatus,
// // // // //         isFresher,
// // // // //         setIsFresher,
// // // // //         nextStep,
// // // // //         prevStep,
// // // // //         resetWorkStatus,
// // // // //       }}
// // // // //     >
// // // // //       {children}
// // // // //     </FormContext.Provider>
// // // // //   );
// // // // // };

// // // // // export const useFormContext = () => useContext(FormContext);
// // // // import { createContext, useContext, useState, useEffect } from "react";

// // // // const FormContext = createContext();

// // // // export const FormProvider = ({ children }) => {
// // // //   const [step, setStep] = useState(1);
// // // //   const [userId, setUserId] = useState(""); // 👈 User login status
// // // //   const [workStatus, setWorkStatus] = useState("");
// // // //   const [isFresher, setIsFresher] = useState(false);
// // // //   const [formData, setFormData] = useState({
// // // //     firstName: "",
// // // //     lastName: "",
// // // //     email: "",
// // // //     mobile: "",
// // // //     altMobile: "",
// // // //     password: "",
// // // //     confirmPassword: "",
// // // //     city: "",
// // // //     currentCity: "",
// // // //     preferredJobLocations: "",
// // // //     dob: "",
// // // //     gender: "",
// // // //     nationality: "",
// // // //     topSkills: ["", "", "", ""],
// // // //     streamSkills: "",
// // // //     stream: "",
// // // //     resume: null,
// // // //     profilePhoto: null,
// // // //     videoPitch: null,
// // // //     workSamples: null,
// // // //     additionalDocs: null,
// // // //     educations: [{
// // // //       qualification: "",
// // // //       course: "",
// // // //       specialization: "",
// // // //       college: "",
// // // //       passingYear: "",
// // // //       percentage: "",
// // // //       isHighest: false
// // // //     }],
// // // //     experiences: [{
// // // //       totalExperience: "",
// // // //       designation: "",
// // // //       companyName: "",
// // // //       typeOfEmployment: "",
// // // //       achievements: "",
// // // //       companyUrl: "",
// // // //       annualSalary: "",
// // // //       noticePeriod: "",
// // // //       industry: "",
// // // //       responsibilities: "",
// // // //       isCurrentEmployee: false
// // // //     }],
// // // //   });
// // // //   const [errors, setErrors] = useState({});

// // // //   useEffect(() => {
// // // //     if (step === 2) {
// // // //       const hasExperienceData = formData.experiences.some(
// // // //         (exp) => exp.designation || exp.companyName || exp.annualSalary || exp.responsibilities
// // // //       );
// // // //       if (!hasExperienceData) {
// // // //         setWorkStatus("");
// // // //         setIsFresher(false);
// // // //       }
// // // //     }
// // // //   }, [step, formData.experiences]);

// // // //   const nextStep = () => {
// // // //     if (step > 1 && !userId) {
// // // //       setErrors({ submit: "Please complete Basic Information first." });
// // // //       return;
// // // //     }
// // // //     setStep((prev) => (prev < 5 ? prev + 1 : prev));
// // // //   };

// // // //   const prevStep = () => {
// // // //     setStep((prev) => (prev > 1 ? prev - 1 : prev));
// // // //   };

// // // //   const resetWorkStatus = () => {
// // // //     setWorkStatus("");
// // // //     setIsFresher(false);
// // // //     setFormData((prev) => ({
// // // //       ...prev,
// // // //       experiences: [{
// // // //         totalExperience: "",
// // // //         designation: "",
// // // //         companyName: "",
// // // //         typeOfEmployment: "",
// // // //         achievements: "",
// // // //         companyUrl: "",
// // // //         annualSalary: "",
// // // //         noticePeriod: "",
// // // //         industry: "",
// // // //         responsibilities: "",
// // // //         isCurrentEmployee: false
// // // //       }],
// // // //     }));
// // // //   };

// // // //   return (
// // // //     <FormContext.Provider
// // // //       value={{
// // // //         step,
// // // //         setStep,
// // // //         userId,
// // // //         setUserId,
// // // //         formData,
// // // //         setFormData,
// // // //         errors,
// // // //         setErrors,
// // // //         workStatus,
// // // //         setWorkStatus,
// // // //         isFresher,
// // // //         setIsFresher,
// // // //         nextStep,
// // // //         prevStep,
// // // //         resetWorkStatus,
// // // //       }}
// // // //     >
// // // //       {children}
// // // //     </FormContext.Provider>
// // // //   );
// // // // };

// // // // export const useFormContext = () => useContext(FormContext);
// // // import { createContext, useContext, useState, useEffect } from "react";

// // // const FormContext = createContext();

// // // export const FormProvider = ({ children }) => {
// // //   const [step, setStep] = useState(1);
// // //   const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
// // //   const [workStatus, setWorkStatus] = useState("");
// // //   const [isFresher, setIsFresher] = useState(false);
// // //   const [formData, setFormData] = useState({
// // //     firstName: "",
// // //     lastName: "",
// // //     email: "",
// // //     mobile: "",
// // //     altMobile: "",
// // //     password: "",
// // //     confirmPassword: "",
// // //     city: "",
// // //     currentCity: "",
// // //     preferredJobLocations: "",
// // //     dob: "",
// // //     gender: "",
// // //     nationality: "",
// // //     topSkills: ["", "", "", ""],
// // //     streamSkills: "",
// // //     stream: "",
// // //     resume: null,
// // //     profilePhoto: null,
// // //     videoPitch: null,
// // //     workSamples: null,
// // //     additionalDocs: null,
// // //     educations: [
// // //       {
// // //         qualification: "",
// // //         course: "",
// // //         specialization: "",
// // //         college: "",
// // //         passingYear: "",
// // //         percentage: "",
// // //         isHighest: false,
// // //       },
// // //     ],
// // //     experiences: [
// // //       {
// // //         totalExperience: "",
// // //         designation: "",
// // //         companyName: "",
// // //         typeOfEmployment: "",
// // //         achievements: "",
// // //         companyUrl: "",
// // //         annualSalary: "",
// // //         noticePeriod: "",
// // //         industry: "",
// // //         responsibilities: "",
// // //         isCurrentEmployee: false,
// // //       },
// // //     ],
// // //   });
// // //   const [errors, setErrors] = useState({});

// // //   useEffect(() => {
// // //     if (step === 2) {
// // //       const hasExperienceData = formData.experiences.some(
// // //         (exp) =>
// // //           exp.designation ||
// // //           exp.companyName ||
// // //           exp.annualSalary ||
// // //           exp.responsibilities
// // //       );
// // //       if (!hasExperienceData && !isFresher) {
// // //         // Only reset if not a fresher to avoid overwriting API response
// // //         setWorkStatus("");
// // //         setFormData((prev) => ({
// // //           ...prev,
// // //           experiences: [
// // //             {
// // //               totalExperience: "",
// // //               designation: "",
// // //               companyName: "",
// // //               typeOfEmployment: "",
// // //               achievements: "",
// // //               companyUrl: "",
// // //               annualSalary: "",
// // //               noticePeriod: "",
// // //               industry: "",
// // //               responsibilities: "",
// // //               isCurrentEmployee: false,
// // //             },
// // //           ],
// // //         }));
// // //       }
// // //     }
// // //   }, [step, formData.experiences, isFresher]);

// // //   const nextStep = () => {
// // //     if (step > 1 && !userId) {
// // //       console.warn("nextStep blocked: userId missing, step:", step);
// // //       setErrors({ submit: "Please complete Basic Information first." });
// // //       return;
// // //     }
// // //     console.log("Advancing to step", step + 1, "userId:", userId);
// // //     setStep((prev) => (prev < 5 ? prev + 1 : prev));
// // //   };

// // //   const prevStep = () => {
// // //     console.log("Returning to step", step - 1);
// // //     setStep((prev) => (prev > 1 ? prev - 1 : prev));
// // //   };

// // //   const resetWorkStatus = () => {
// // //     console.log("Resetting work status");
// // //     setWorkStatus("");
// // //     setIsFresher(false);
// // //     setFormData((prev) => ({
// // //       ...prev,
// // //       experiences: [
// // //         {
// // //           totalExperience: "",
// // //           designation: "",
// // //           companyName: "",
// // //           typeOfEmployment: "",
// // //           achievements: "",
// // //           companyUrl: "",
// // //           annualSalary: "",
// // //           noticePeriod: "",
// // //           industry: "",
// // //           responsibilities: "",
// // //           isCurrentEmployee: false,
// // //         },
// // //       ],
// // //     }));
// // //   };

// // //   return (
// // //     <FormContext.Provider
// // //       value={{
// // //         step,
// // //         setStep,
// // //         userId,
// // //         setUserId,
// // //         formData,
// // //         setFormData,
// // //         errors,
// // //         setErrors,
// // //         workStatus,
// // //         setWorkStatus,
// // //         isFresher,
// // //         setIsFresher,
// // //         nextStep,
// // //         prevStep,
// // //         resetWorkStatus,
// // //       }}
// // //     >
// // //       {children}
// // //     </FormContext.Provider>
// // //   );
// // // };

// // // export const useFormContext = () => useContext(FormContext);
// // import { createContext, useContext, useState, useEffect } from "react";
// // import { useAuthContext } from "./AuthContext"; // Import AuthContext


// // const FormContext = createContext();

// // export const FormProvider = ({ children }) => {
// //   const { user } = useAuthContext(); // Get user from AuthContext
// //   const [step, setStep] = useState(1);
// //   const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
// //   const [workStatus, setWorkStatus] = useState("");
// //   const [isFresher, setIsFresher] = useState(false);
// //   const [formData, setFormData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     mobile: "",
// //     altMobile: "",
// //     password: "",
// //     confirmPassword: "",
// //     city: "",
// //     currentCity: "",
// //     preferredJobLocations: "",
// //     dob: "",
// //     gender: "",
// //     nationality: "",
// //     topSkills: ["", "", "", ""],
// //     streamSkills: "",
// //     stream: "",
// //     resume: null,
// //     profilePhoto: null,
// //     videoPitch: null,
// //     workSamples: null,
// //     additionalDocs: null,
// //     educations: [
// //       {
// //         qualification: "",
// //         course: "",
// //         specialization: "",
// //         college: "",
// //         passingYear: "",
// //         percentage: "",
// //         isHighest: false,
// //       },
// //     ],
// //     experiences: [
// //       {
// //         totalExperience: "",
// //         designation: "",
// //         companyName: "",
// //         typeOfEmployment: "",
// //         achievements: "",
// //         companyUrl: "",
// //         annualSalary: "",
// //         noticePeriod: "",
// //         industry: "",
// //         responsibilities: "",
// //         isCurrentEmployee: false,
// //       },
// //     ],
// //   });
// //   const [errors, setErrors] = useState({});

// //   // Sync userId with AuthContext's user.id
// //   useEffect(() => {
// //     if (user?.id) {
// //       setUserId(user.id);
// //       localStorage.setItem("userId", user.id);
// //       console.log("FormContext: Synced userId from AuthContext:", user.id);
// //     } else {
// //       const storedUserId = localStorage.getItem("userId");
// //       if (storedUserId) {
// //         setUserId(storedUserId);
// //         console.log("FormContext: Loaded userId from localStorage:", storedUserId);
// //       }
// //     }
// //   }, [user]);

// //   useEffect(() => {
// //     if (step === 2) {
// //       const hasExperienceData = formData.experiences.some(
// //         (exp) =>
// //           exp.designation ||
// //           exp.companyName ||
// //           exp.annualSalary ||
// //           exp.responsibilities
// //       );
// //       if (!hasExperienceData && !isFresher) {
// //         setWorkStatus("");
// //         setFormData((prev) => ({
// //           ...prev,
// //           experiences: [
// //             {
// //               totalExperience: "",
// //               designation: "",
// //               companyName: "",
// //               typeOfEmployment: "",
// //               achievements: "",
// //               companyUrl: "",
// //               annualSalary: "",
// //               noticePeriod: "",
// //               industry: "",
// //               responsibilities: "",
// //               isCurrentEmployee: false,
// //             },
// //           ],
// //         }));
// //       }
// //     }
// //   }, [step, formData.experiences, isFresher]);

// //   const nextStep = () => {
// //     if (step > 1 && !userId) {
// //       console.warn("nextStep blocked: userId missing, step:", step);
// //       setErrors({ submit: "Please complete Basic Information first." });
// //       return;
// //     }
// //     console.log("Advancing to step", step + 1, "userId:", userId);
// //     setStep((prev) => (prev < 5 ? prev + 1 : prev));
// //   };

// //   const prevStep = () => {
// //     console.log("Returning to step", step - 1);
// //     setStep((prev) => (prev > 1 ? prev - 1 : prev));
// //   };

// //   const resetWorkStatus = () => {
// //     console.log("Resetting work status");
// //     setWorkStatus("");
// //     setIsFresher(false);
// //     setFormData((prev) => ({
// //       ...prev,
// //       experiences: [
// //         {
// //           totalExperience: "",
// //           designation: "",
// //           companyName: "",
// //           typeOfEmployment: "",
// //           achievements: "",
// //           companyUrl: "",
// //           annualSalary: "",
// //           noticePeriod: "",
// //           industry: "",
// //           responsibilities: "",
// //           isCurrentEmployee: false,
// //         },
// //       ],
// //     }));
// //   };

// //   return (
// //     <FormContext.Provider
// //       value={{
// //         step,
// //         setStep,
// //         userId,
// //         setUserId,
// //         formData,
// //         setFormData,
// //         errors,
// //         setErrors,
// //         workStatus,
// //         setWorkStatus,
// //         isFresher,
// //         setIsFresher,
// //         nextStep,
// //         prevStep,
// //         resetWorkStatus,
// //       }}
// //     >
// //       {children}
// //     </FormContext.Provider>
// //   );
// // };

// // export const useFormContext = () => useContext(FormContext);
// import { createContext, useContext, useState, useEffect } from "react";
// import { useAuthContext } from "./AuthContext";
// import { useNavigate } from "react-router-dom";

// const FormContext = createContext();

// export const FormProvider = ({ children }) => {
//   const { user } = useAuthContext();
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
//   const [workStatus, setWorkStatus] = useState("");
//   const [isFresher, setIsFresher] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     mobile: "",
//     altMobile: "",
//     password: "",
//     confirmPassword: "",
//     city: "",
//     currentCity: "",
//     preferredJobLocations: "",
//     dob: "",
//     gender: "",
//     nationality: "",
//     topSkills: ["", "", "", ""],
//     streamSkills: "",
//     stream: "",
//     resume: null,
//     profilePhoto: null,
//     videoPitch: null,
//     workSamples: null,
//     additionalDocs: null,
//     educations: [
//       {
//         qualification: "",
//         course: "",
//         specialization: "",
//         college: "",
//         passingYear: "",
//         percentage: "",
//         isHighest: false,
//       },
//     ],
//     experiences: [
//       {
//         totalExperience: "",
//         designation: "",
//         companyName: "",
//         typeOfEmployment: "",
//         achievements: "",
//         companyUrl: "",
//         annualSalary: "",
//         noticePeriod: "",
//         industry: "",
//         responsibilities: "",
//         isCurrentEmployee: false,
//       },
//     ],
//   });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (user?.id) {
//       setUserId(user.id);
//       localStorage.setItem("userId", user.id);
//       console.log("FormContext: Synced userId from AuthContext:", user.id);
//     } else {
//       const storedUserId = localStorage.getItem("userId");
//       if (storedUserId) {
//         setUserId(storedUserId);
//         console.log("FormContext: Loaded userId from localStorage:", storedUserId);
//       }
//     }
//   }, [user]);

//   useEffect(() => {
//     if (step === 2) {
//       const hasExperienceData = formData.experiences.some(
//         (exp) =>
//           exp.designation ||
//           exp.companyName ||
//           exp.annualSalary ||
//           exp.responsibilities
//       );
//       if (!hasExperienceData && !isFresher) {
//         setWorkStatus("");
//         setFormData((prev) => ({
//           ...prev,
//           experiences: [
//             {
//               totalExperience: "",
//               designation: "",
//               companyName: "",
//               typeOfEmployment: "",
//               achievements: "",
//               companyUrl: "",
//               annualSalary: "",
//               noticePeriod: "",
//               industry: "",
//               responsibilities: "",
//               isCurrentEmployee: false,
//             },
//           ],
//         }));
//       }
//     }
//   }, [step, formData.experiences, isFresher]);

//   const nextStep = () => {
//     if (step > 1 && !userId) {
//       console.warn("nextStep blocked: userId missing, step:", step);
//       setErrors({ submit: "Please complete Basic Information first." });
//       navigate("/register");
//       return;
//     }
//     const routes = ["/register", "/experience", "/education", "/skills"];
//     console.log("Advancing to step", step + 1, "userId:", userId);
//     setStep((prev) => {
//       const nextStep = prev < 5 ? prev + 1 : prev;
//       navigate(routes[nextStep - 1]);
//       return nextStep;
//     });
//   };

//   const prevStep = () => {
//     const routes = ["/register", "/experience", "/education", "/skills"];
//     console.log("Returning to step", step - 1);
//     setStep((prev) => {
//       const prevStep = prev > 1 ? prev - 1 : prev;
//       navigate(routes[prevStep - 1]);
//       return prevStep;
//     });
//   };

//   const resetWorkStatus = () => {
//     console.log("Resetting work status");
//     setWorkStatus("");
//     setIsFresher(false);
//     setFormData((prev) => ({
//       ...prev,
//       experiences: [
//         {
//           totalExperience: "",
//           designation: "",
//           companyName: "",
//           typeOfEmployment: "",
//           achievements: "",
//           companyUrl: "",
//           annualSalary: "",
//           noticePeriod: "",
//           industry: "",
//           responsibilities: "",
//           isCurrentEmployee: false,
//         },
//       ],
//     }));
//   };

//   return (
//     <FormContext.Provider
//       value={{
//         step,
//         setStep,
//         userId,
//         setUserId,
//         formData,
//         setFormData,
//         errors,
//         setErrors,
//         workStatus,
//         setWorkStatus,
//         isFresher,
//         setIsFresher,
//         nextStep,
//         prevStep,
//         resetWorkStatus,
//       }}
//     >
//       {children}
//     </FormContext.Provider>
//   );
// };

// export const useFormContext = () => useContext(FormContext);
import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext"; // Ensure this exists and exports `user`

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const { user } = useAuthContext(); // Get user from AuthContext

  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(user?.id || ""); // Use user from AuthContext
  const [workStatus, setWorkStatus] = useState("");
  const [isFresher, setIsFresher] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    altMobile: "",
    password: "",
    confirmPassword: "",
    city: "",
    currentCity: "",
    preferredJobLocations: "",
    dob: "",
    gender: "",
    nationality: "",
    topSkills: ["", "", "", ""],
    streamSkills: "",
    stream: "",
    resume: null,
    profilePhoto: null,
    videoPitch: null,
    workSamples: null,
    additionalDocs: null,
    educations: [
      {
        qualification: "",
        course: "",
        specialization: "",
        college: "",
        passingYear: "",
        percentage: "",
        isHighest: false,
      },
    ],
    experiences: [
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
  });

  const [errors, setErrors] = useState({});

  // Sync userId when auth context updates
  useEffect(() => {
    if (user?.id) {
      setUserId(user.id);
    }
  }, [user]);

  // Only reset experiences if no data and not fresher (prevent infinite loop)
  useEffect(() => {
    if (step === 2 && !isFresher) {
      const hasExperienceData = formData.experiences.some(
        (exp) =>
          exp.designation ||
          exp.companyName ||
          exp.annualSalary ||
          exp.responsibilities
      );

      if (!hasExperienceData) {
        setWorkStatus("");
        setFormData((prev) => ({
          ...prev,
          experiences: [
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
    }
  }, [step, isFresher]); // Removed formData.experiences from dependencies

  const nextStep = () => {
    if (step > 1 && !userId) {
      setErrors({ submit: "Please complete Basic Information first." });
      return;
    }
    setStep((prev) => (prev < 5 ? prev + 1 : prev));
  };

  const prevStep = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const resetWorkStatus = () => {
    setWorkStatus("");
    setIsFresher(false);
    setFormData((prev) => ({
      ...prev,
      experiences: [
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

  return (
    <FormContext.Provider
      value={{
        step,
        setStep,
        userId,
        setUserId,
        formData,
        setFormData,
        errors,
        setErrors,
        workStatus,
        setWorkStatus,
        isFresher,
        setIsFresher,
        nextStep,
        prevStep,
        resetWorkStatus,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
