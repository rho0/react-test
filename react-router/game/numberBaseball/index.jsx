import React, { Component } from "react";
import { useParams } from "react-router";
import DetailPagesClassWrapper from "./DetailPagesClass";
import DetailPagesFunction from "./DetailPagesFunction";

const DetailPages = () => {
  const { testId } = useParams();
  return (
    <>
      {"1" === testId ? (
        <DetailPagesClassWrapper testId={testId} />
      ) : (
        <DetailPagesFunction />
      )}
    </>
  );
};
export default DetailPages;
