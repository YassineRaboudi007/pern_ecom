import { useState } from "react";
const useForm = (initValues) => {
  const [values, setValues] = useState(initValues);
  return [
    values,
    (e) => {
      setValues((state) => {
        return {
          ...state,
          [e.target.name]: e.target.value,
        };
      });
    },
  ];
};

export default useForm;
