import React from "react";
import { useParams } from "react-router";

const DetailPagesFunction = () => {
  const { testId } = useParams();
  return (
    <div>
      <h1>DetailPage Function</h1>
      <p>TESTID: {testId}</p>
    </div>
  );
};
export default DetailPagesFunction;
