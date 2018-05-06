'use strict';

var BigNumber = require('bignumber.js');

var getUint = function(bytes, offset, byte_size) {
    var segment = bytes.slice(offset, offset + byte_size);
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

var getAddress = function(bytes, offset) {

};

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
    getAddress: getAddress,
    hexToBytes: hexToBytes
};
