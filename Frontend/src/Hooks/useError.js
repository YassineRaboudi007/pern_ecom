import { useState } from "react";
const useError = (initValues = null) => {
  const [values, setValues] = useState(initValues);
  return [
    values,
    (field = null, msg) => {
      if (!msg) setValues(null);
      setValues((state) => ({
        ...state,
        [field]: msg,
      }));
    },
  ];
};

export default useError;
