import React, { Component } from "react";
import { useParams } from "react-router";

class DetailPagesClass extends Component {
  render() {
    const { testId } = this.props;
    return (
      <div>
        <h1>DetailPage Class</h1>
        <p>TESTID: {testId}</p>
      </div>
    );
  }
}

const DetailPagesClassWrapper = () => {
  const { testId } = useParams();
  return <DetailPagesClass testId={testId} />;
};

export default DetailPagesClassWrapper;
