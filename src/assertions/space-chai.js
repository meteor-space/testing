import same from './same.js';
import extend from './extend.js';
import dependOn from './depend-on.js';
import containArrayOfStructs from './contain-array-of-structs.js';
import matchArrayOfStructs from './match-array-of-structs.js';

(function(spaceChai) {
  "use strict";

  // Module systems magic dance.
  /* istanbul ignore else */
  if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // NodeJS
    module.exports = spaceChai;
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(function() {
      return spaceChai;
    });
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    chai.use(spaceChai);
  }
}(function spaceChai(chai) {
  const extensions = [
    same,
    extend,
    dependOn,
    containArrayOfStructs,
    matchArrayOfStructs
  ];

  for (let extension of extensions) {
    chai.use(extension);
  }
}));
