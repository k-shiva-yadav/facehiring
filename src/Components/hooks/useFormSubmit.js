import { useState } from "react";
import axios from "axios";

const useFormSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (url, payload, config = {}) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await axios.post(url, payload, config);
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.status === 409
          ? err.response?.data?.message || "Account already exists with this email or mobile."
          : "Failed to submit data.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submit, isSubmitting, error };
};

export default useFormSubmit;