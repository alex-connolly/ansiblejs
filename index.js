'use strict';

var BigNumber = require('bignumber.js');

var getUint = function(bytes, offset, byte_size) {
    var segment = bytes.slice(offset, offset + byte_size);
    // TODO: is there a way without an intermediate conversion
    var hex = bytesToHex(segment);
    return new BigNumber(hex, 16);
};

var getUint8 = function(bytes, offset) {
    return getUint(bytes, offset, 1);
};

var getUint16 = function(bytes, offset) {
    return getUint(bytes, offset, 2);
};

var getUint32 = function(bytes, offset) {
    return getUint(bytes, offset, 4);
};

var getUint64 = function(bytes, offset) {
    return getUint(bytes, offset, 8);
};

var getUint128 = function(bytes, offset) {
    return getUint(bytes, offset, 16);
};

var getUint256 = function(bytes, offset) {
    return getUint(bytes, offset, 32);
};

var getBytes = function(num) {
    var hex = num.toString(16);
    return hexToBytes(hex);
};

var setUint = function(bytes, num, offset, byte_size) {
    var toInsert = getBytes(num);
    bytes.splice(offset, byte_size, ...toInsert);
    return bytes;
};

var setUint8 = function(bytes, num, offset) {
    return setUint(bytes, num, offset, 1);
};

var setUint16 = function(bytes, num, offset) {
    return setUint(bytes, num, offset, 2);
};

var setUint32 = function(bytes, num, offset) {
    return setUint(bytes, num, offset, 4);
};

var setUint64 = function(bytes, num, offset) {
    return setUint(bytes, num, offset, 8);
};

var setUint128 = function(bytes, num, offset) {
    return setUint(bytes, num, offset, 16);
};

var setUint256 = function(bytes, num, offset) {
    return setUint(bytes, num, offset, 32);
};

var getAddress = function(bytes, offset) {
    // addresses are 20-byte hex strings
    var chunk = bytes.slice(offset, offset + 20);
    return bytesToHex(chunk);
};

var setAddress = function(bytes, address, offset) {
    var toInsert = hexToBytes(address);
    bytes.splice(offset, 20, ...toInsert);
    return bytes;
}

// from crypto-js
function bytesToHex(bytes) {
    var hex = [];
    for (var i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
    }
    return hex.join("");
}

function hexToBytes(hex) {
    var bytes = [];
    for (var c = 0; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substr(c, 2), 16));
    }
    return bytes;
}

module.exports = {
    getUint8: getUint8,
    getUint16: getUint16,
    getUint32: getUint32,
    getUint64: getUint64,
    getUint128: getUint128,
    getUint256: getUint256,
    setUint8: setUint8,
    setUint16: setUint16,
    setUint32: setUint32,
    setUint64: setUint64,
    setUint128: setUint128,
    setUint256: setUint256,
    getAddress: getAddress,
    setAddress: setAddress,
    hexToBytes: hexToBytes
};
