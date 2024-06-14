import React, { Component } from "react";
import { useLocation, useParams } from "react-router";
import DetailPagesClassWrapper from "./DetailPagesClass";
import DetailPagesFunction from "./DetailPagesFunction";

const DetailPages = () => {
  const { testId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const rho = queryParams.get("rho");

  return (
    <>
      <h1>RHO : {rho}</h1>
      {"1" === testId ? (
        <DetailPagesClassWrapper testId={testId} rho={rho} />
      ) : (
        <DetailPagesFunction />
      )}
    </>
  );
};
export default DetailPages;
