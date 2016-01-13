'use strict';

let parse = (string) => {
  try {
    return JSON.parse(string.replace(/"?([a-zA-Z0-9]*)"?:/g, '"$1":'));
  } catch(err) {
    return err;
  }
}

module.exports = {parse};