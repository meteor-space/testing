(function(dependOn) {
  "use strict";

  // Module systems magic dance.
  /* istanbul ignore else */
  if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // NodeJS
    module.exports = dependOn;
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(function() {
      return dependOn;
    });
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    chai.use(dependOn);
  }
}(function dependOn(chai, utils) {
  chai.Assertion.addMethod('dependOn', function(dependencies) {
    const actual = this._obj;

    this.assert(
      utils.type(actual.prototype.Dependencies) === 'object',
      `expected ${actual} to declare dependencies`,
      "",
      dependencies,
      actual.prototype.Dependencies
    );

    const expectedStringified = JSON.stringify(dependencies, null, 2);
    const actualStringified = JSON.stringify(actual.prototype.Dependencies, null, 2);

    return this.assert(
      utils.eql(actual.prototype.Dependencies, dependencies),
      `expected ${actual} to depend on:\n${expectedStringified}\nbut was:\n${actualStringified}`,
      "",
      dependencies,
      actual.prototype.Dependencies
    );
  });

  chai.assert.dependOn = function(val, exp, msg) {
    new chai.Assertion(val, msg).to.dependOn(exp);
  };

  chai.assert.notDependOn = function(val, exp, msg) {
    new chai.Assertion(val, msg).to.not.dependOn(exp);
  };
}));
