const chai = require('chai');

const spaceTesting = require('../lib/index.js');
const chaiExtensions = spaceTesting.chai;

global.expect = chai.expect;
for (let key in chaiExtensions) {
  chai.use(chaiExtensions[key]);
}