import React from 'react';
import ReactDom from 'react-dom';
import NumberBaseballHooks from "./NumberBaseballHooks";
import NumberBaseballClass from "./NumberBaseballClass";
import Test from "../lecture/RenderTest";

// const NumberBaseballHooks = './NumberBaseballHooks';
// const NumberBaseballClass = './NumberBaseballClass';
const RenderTest = './Test';

ReactDom.render(<RenderTest />, document.querySelector('#root'));