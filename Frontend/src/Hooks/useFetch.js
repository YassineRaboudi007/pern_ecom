import { useState, useEffect } from "react";
import ProductService from "../services/product.service";

const useFetch = (url, method = "get", data = null) => {
  const [err, setErr] = useState(null);
  const [response, setResponse] = useState({
    data: null,
    isLoaded: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ProductService.getProducts();
        setResponse({
          data: res.res.data,
          isLoaded: true,
        });
      } catch (e) {
        setErr({
          err: e,
        });
      }
    };
    fetchData();
  }, [url, method, data]);
  return [response, err];
};

export default useFetch;
