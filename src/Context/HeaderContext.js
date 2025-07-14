// import { createContext, useContext, useEffect, useState } from "react";

// // Create context
// const HeaderContext = createContext();

// // Provider
// export function HeaderProvider({ children }) {
//   const [isToggled, setIsToggled] = useState(() => {
//     // Load from localStorage if available
//     const savedToggle = localStorage.getItem("headerToggle");
//     return savedToggle === "true"; // convert to boolean
//   });

//   const toggleHeader = () => {
//     setIsToggled((prev) => {
//       const newToggle = !prev;
//       localStorage.setItem("headerToggle", newToggle); // Save to localStorage
//       return newToggle;
//     });
//   };

//   useEffect(() => {
//     // Sync state with localStorage on mount
//     const savedToggle = localStorage.getItem("headerToggle");
//     if (savedToggle !== null) {
//       setIsToggled(savedToggle === "true");
//     }
//   }, []);

//   return (
//     <HeaderContext.Provider value={{ isToggled, toggleHeader }}>
//       {children}
//     </HeaderContext.Provider>
//   );
// }

// // Hook to use context
// export function useHeader() {
//   return useContext(HeaderContext);
// }
import { createContext, useContext, useEffect, useState } from "react";

const HeaderContext = createContext();

export function HeaderProvider({ children }) {
  const [isToggled, setIsToggled] = useState(() => {
    const savedToggle = localStorage.getItem("headerToggle");
    return savedToggle === "true";
  });

  const toggleHeader = () => {
    setIsToggled((prev) => {
      const newToggle = !prev;
      localStorage.setItem("headerToggle", newToggle);
      return newToggle;
    });
  };

  useEffect(() => {
    const savedToggle = localStorage.getItem("headerToggle");
    if (savedToggle !== null) {
      setIsToggled(savedToggle === "true");
    }
  }, []);

  return (
    <HeaderContext.Provider value={{ isToggled, toggleHeader }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  return useContext(HeaderContext);
}
