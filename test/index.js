#!/usr/bin/env node
'use strict'
const chai = require('chai');
const jsObjectParser = require('../js-object-parser.js');
const path = require('path');

const should = chai.should(),
      assert = chai.assert,
      expect = chai.expect;

describe("js-object-parser", () => {
  it("should parse javascript object", () => {
    let obj = 
    '{'+
      'ST: "String",'+
      'b: true,'+ 
      'arr: [1,2,"3",{foo: \"bar\"},5],'+
      'numbr: 6,'+
      'o: {},' +
      't1: "str + number"' +
    '}';

    let objEqual = 
    {
      ST: "String",
      b: true,
      arr: [1,2,"3",{foo: "bar"},5],
      numbr: 6,
      o: {},
      t1: 'str + number'
    };

    assert.deepEqual(jsObjectParser.parse(obj), objEqual, 'should be equal');

  });

  it("should parse javascript object mixed with JSON-style properties.", () => {
    let obj = 
    '{'+
      '"ST": "String",'+
      'b: true,'+ 
      '"arr": [1,2,"3",{"foo": \"bar\"},5],'+
      'numbr: 6'+
    '}';

    let objEqual = 
    {
      ST: "String",
      b: true,
      arr: [1,2,"3",{foo: "bar"},5],
      numbr: 6
    };

    assert.deepEqual(jsObjectParser.parse(obj), objEqual, 'should be equal');
  });
});