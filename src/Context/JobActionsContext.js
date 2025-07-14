import React, { createContext, useContext, useState } from 'react';

const JobActionsContext = createContext();

export const JobActionsProvider = ({ children }) => {
  const [savedJobIndexes, setSavedJobIndexes] = useState([]);
  const [appliedJobIndexes, setAppliedJobIndexes] = useState([]);

  const toggleSaveJob = (index) => {
    setSavedJobIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const applyJob = (index) => {
    setAppliedJobIndexes((prev) =>
      prev.includes(index) ? prev : [...prev, index]
    );
  };

  return (
    <JobActionsContext.Provider
      value={{ savedJobIndexes, appliedJobIndexes, toggleSaveJob, applyJob }}
    >
      {children}
    </JobActionsContext.Provider>
  );
};

export const useJobActions = () => useContext(JobActionsContext); 