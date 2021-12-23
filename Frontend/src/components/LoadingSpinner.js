import React from "react";
import { CircularProgress } from "@material-ui/core";

export default function LoadingSpinner() {
  return (
    <>
      <div
        style={{
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={80}></CircularProgress>
      </div>
    </>
  );
}
