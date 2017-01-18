import isSubclassOf from './helpers/is-subclass.js';
import same from './assertions/same.js';
import extend from './assertions/extend.js';
import dependOn from './assertions/depend-on.js';
import containArrayOfStructs from './assertions/contain-array-of-structs.js';
import matchArrayOfStructs from './assertions/match-array-of-structs.js';
import spaceChai from './assertions/space-chai';

const extensions = {};
extensions.chai = {
  same: same,
  extend: extend,
  dependOn: dependOn,
  containArrayOfStructs: containArrayOfStructs,
  matchArrayOfStructs: matchArrayOfStructs
};

export {
  isSubclassOf,
  extensions as extensions,
  spaceChai
};
