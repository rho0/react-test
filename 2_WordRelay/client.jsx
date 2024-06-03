const React = require('react');
const ReactDome = require('react-dom');

const WordRelayClass = require('./WordRelayClass');
const WordRelayHook = require('./WordRelayHooks');
ReactDome.render(<WordRelayHook/>, document.querySelector('#root'));