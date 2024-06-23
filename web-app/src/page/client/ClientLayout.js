import React from "react";
import HomePage from "./HomePage";
import MuiAppBar from "../../component/MuiAppBar";

export default function ClientLayout() {
  return(
    <>
      <MuiAppBar />
      <HomePage />
    </>
  );    
}