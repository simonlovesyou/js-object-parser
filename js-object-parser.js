'use strict';

let parse = (string) => {

  let newStr = string.replace(/"?([a-zA-Z]*)"?:/g, '"$1":');

  try {
    return JSON.parse(newStr);
  } catch(err) {
    return err;
  }
}

module.exports = {parse};