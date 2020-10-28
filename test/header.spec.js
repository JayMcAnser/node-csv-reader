const chai = require('chai');
const assert = chai.assert;
const Path = require('path');
const fs = require('fs');
const CsvReadableStream = require('../index.js');

const rowToObject = function(def, data) {
  let result = {};
  for (let l = 0; l < def.length; l++) {
    result[def[l]] = data[l];
  }
  return result;
};

describe('test header quotes', () => {
  let fileName = Path.join(__dirname, 'data/quotes.csv');
  var inputStream = fs.createReadStream(fileName, 'utf8');

  let result = [];
  before( function(done ) {
    let def = false;
    inputStream
      .pipe(CsvReadableStream({
        delimiter: ',',
        parseNumbers: true,
        parseBooleans: true,
        trim: true,
        skipHeader: false
      }))
      .on('data', function (row) {
        if (def === false) {
          def = row;
        } else {
          result.push(rowToObject(def, row));
        }
      })
      .on('end', function (data) {
        done()
      });
  });
  it('read the header', () => {
    assert.equal(result.length, 2, 'both rows');
    assert.equal(result[0].name, 'John', 'found it')
  })
});


describe('test header no quotes', () => {
  let fileName = Path.join(__dirname, 'data/no.quotes.csv');
  var inputStream = fs.createReadStream(fileName, 'utf8');

  let result = [];
  before( function(done ) {
    let def = false;
    inputStream
      .pipe(CsvReadableStream({
        delimiter: ',',
        parseNumbers: true,
        parseBooleans: true,
        trim: true,
        skipHeader: false
      }))
      .on('data', function (row) {
        if (def === false) {
          def = row;
        } else {
          result.push(rowToObject(def, row));
        }
      })
      .on('end', function (data) {
        done()
      });
  });
  it('read the header', () => {
    assert.equal(result.length, 2, 'both rows');
    assert.equal(result[0].name, 'John', 'found it')
  })
});
