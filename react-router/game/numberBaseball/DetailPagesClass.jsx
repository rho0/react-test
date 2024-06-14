import React, { Component } from "react";
import { useParams } from "react-router";

class DetailPagesClass extends Component {
  render() {
    const { testId, rho } = this.props;
    return (
      <div>
        <h1>DetailPage Class</h1>
        <p>TESTID: {testId}</p>
        <p>RHO: {rho}</p>
      </div>
    );
  }
}

const DetailPagesClassWrapper = (props) => {
  const { testId, rho } = props;
  return <DetailPagesClass testId rho />;
};

export default DetailPagesClassWrapper;
