/* eslint-disable prefer-arrow-callback */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
// eslint-disable-next-line prefer-destructuring
const { expect, assert } = require('chai');
// eslint-disable-next-line one-var
let should = require('chai').should();

const { printSomething } = require('../controller/users');

describe('App', function () {
  it('should say hello', function () {
    const result = printSomething();
    assert.equal(result, 'hello');
  });

  it('should return a string', function () {
    const result = printSomething();
    assert.typeOf(result, 'string');
  });

  let name = 'Nik';
  it('should be of type string', function () {
    name.should.be.a('string');
    expect(name).to.be.a('string');
    assert.typeOf(name, 'string');
  });

  it('should contain Nik', function () {
    name.should.equal('Nik');
    expect(name).to.equal('Nik');
    assert.equal(name, 'Nik');
  });
});

describe('Hooks', function () {
  before(function () {
    // runs once before the first test in this block
    console.log('before hook');
  });

  after(function () {
    // runs once after the last test in this block
    console.log('after hook');
  });

  beforeEach(function () {
    // runs before the each test in this block
    console.log('before each hook');
  });

  afterEach(function () {
    // runs after the each test in this block
    console.log('after each hook');
  });
});
