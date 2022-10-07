import { createContext, useContext, useState } from "react";

export const JobContext = createContext();

export const JobContextProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  return (
    <JobContext.Provider
      value={{
        formData,
        setFormData,
        formErrors,
        setFormErrors,
      }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  return useContext(JobContext);
};
