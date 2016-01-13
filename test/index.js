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
      'o: {}' +
    '}';

    let objEqual = 
    {
      ST: "String",
      b: true,
      arr: [1,2,"3",{foo: "bar"},5],
      numbr: 6,
      o: {}
    };
    assert.deepEqual(jsObjectParser.parse(obj), objEqual, 'should be equal');
  });

  it("should parse javascript object mixed with JSON-style keys.", () => {
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

  it("should throw exception when trying to parse number for key", () => {
    let obj = 
    '{'+
      '"5": "fail"' + 
    '}';

    console.log(JSON.parse(obj));

    assert.throws(() => {return JSON.parse(obj);})

  });
});