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

var getUintArray = function(bytes, length, offset, byte_size) {
    var numbers = [];
    for (var i = 0; i < length; i++) {
        var off = offset + (i * byte_size);
        var u = getUint(bytes, off, byte_size);
        numbers.push(u);
    }
    return numbers;
};

var getUint8Array = function(bytes, length, offset) {
    return getUintArray(bytes, length, offset, 1);
};

var getUint16Array = function(bytes, length, offset) {
    return getUintArray(bytes, length, offset, 2);
};

var getUint32Array = function(bytes, length, offset) {
    return getUintArray(bytes, length, offset, 4);
};

var getUint64Array = function(bytes, length, offset) {
    return getUintArray(bytes, length, offset, 8);
};

var getUint128Array = function(bytes, length, offset) {
    return getUintArray(bytes, length, offset, 16);
};

var getUint256Array = function(bytes, length, offset) {
    return getUintArray(bytes, length, offset, 32);
};

var getBytes = function(num) {
    var hex = num.toString(16);
    var bytes = hexToBytes(hex);
    return bytes;
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






var setUintArray = function(bytes, numbers, offset, byte_size) {
    for (var i = 0; i < numbers.length; i++) {
        var off = offset + (i * byte_size);
        bytes = setUint(bytes, numbers[i], off, byte_size);
    }
    return bytes;
};

var setUint8Array = function(bytes, numbers, offset) {
    return setUintArray(bytes, numbers, offset, 1);
};

var setUint16Array = function(bytes, numbers, offset) {
    return setUintArray(bytes, numbers, offset, 2);
};

var setUint32Array = function(bytes, numbers, offset) {
    return setUintArray(bytes, numbers, offset, 4);
};

var setUint64Array = function(bytes, numbers, offset) {
    return setUintArray(bytes, numbers, offset, 8);
};

var setUint128Array = function(bytes, numbers, offset) {
    return setUintArray(bytes, numbers, offset, 16);
};

var setUint256Array = function(bytes, num, offset) {
    return setUintArray(bytes, numbers, offset, 32);
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

var getAddressArray = function(bytes, length, offset) {
    var addresses = [];
    for (var i = 0; i < length; i++) {
        var off = offset + (i * 20);
        var a = getAddress(bytes, off);
        addresses.push(a);
    }
    return addresses;
};

var setAddressArray = function(bytes, addresses, offset) {
    for (var i = 0; i < addresses.length; i++) {
        var off = offset + (i * 20);
        bytes = setAddress(bytes, addresses[i], off);
    }
    return bytes;
};

var appendUint8 = function(bytes, num) {
    return setUint128(bytes, num, bytes.length);
};

var appendUint16 = function(bytes, num) {
    return setUint128(bytes, num, bytes.length);
};

var appendUint32 = function(bytes, num) {
    return setUint128(bytes, num, bytes.length);
};

var appendUint64 = function(bytes, num) {
    return setUint128(bytes, num, bytes.length);
};

var appendUint128 = function(bytes, num) {
    return setUint128(bytes, num, bytes.length);
};

var appendUint256 = function(bytes, num) {
    return setUint256(bytes, num, bytes.length);
};

var appendUint8Array = function(bytes, numbers) {
    return setUint8Array(bytes, numbers, bytes.length);
};

var appendUint16Array = function(bytes, numbers) {
    return setUint16Array(bytes, numbers, bytes.length);
};

var appendUint32Array = function(bytes, numbers) {
    return setUint32Array(bytes, numbers, bytes.length);
};

var appendUint64Array = function(bytes, numbers) {
    return setUint64Array(bytes, numbers, bytes.length);
};

var appendUint128Array = function(bytes, numbers) {
    return setUint128Array(bytes, numbers, bytes.length);
};

var appendUint256Array = function(bytes, numbers) {
    return setUint256Array(bytes, numbers, bytes.length);
};

var appendAddress = function(bytes, address) {
    return setAddress(bytes, address, bytes.length);
}

var appendAddressArray = function(bytes, addresses) {
    return setAddressArray(bytes, addresses, bytes.length);
};

// TODO: check carefully that this is secure/works correctly
// https://github.com/ethereum/web3.js/issues/1490 etc
function getRandomBytes(size) {
    var possibles = "1234567890ABCDEF";
    var hex = "";
    // two hex digits per byte
    for (var i = 0; i < size * 2; i++) {
        hex += possibles[Math.floor(Math.random() * possibles.length)];
    }
    return hexToBytes(hex);
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
    getUint: getUint256,
    getUint8Array: getUint8Array,
    getUint16Array: getUint16Array,
    getUint32Array: getUint32Array,
    getUint64Array: getUint64Array,
    getUint128Array: getUint128Array,
    getUint256Array: getUint256Array,
    getAddress: getAddress,
    getAddressArray: getAddressArray,

    setUint8: setUint8,
    setUint16: setUint16,
    setUint32: setUint32,
    setUint64: setUint64,
    setUint128: setUint128,
    setUint256: setUint256,
    setUint: setUint256,
    setUint8Array: setUint8Array,
    setUint16Array: setUint16Array,
    setUint32Array: setUint32Array,
    setUint64Array: setUint64Array,
    setUint128Array: setUint128Array,
    setUint256Array: setUint256Array,
    setUintArray: setUint256Array,
    setAddress: setAddress,
    setAddressArray: setAddressArray,

    appendUint8: appendUint8,
    appendUint16: appendUint16,
    appendUint32: appendUint32,
    appendUint64: appendUint64,
    appendUint128: appendUint128,
    appendUint256: appendUint256,
    appendUint: appendUint256,
    appendUint8Array: appendUint8Array,
    appendUint16Array: appendUint16Array,
    appendUint32Array: appendUint32Array,
    appendUint64Array: appendUint64Array,
    appendUint128Array: appendUint128Array,
    appendUint256Array: appendUint256Array,
    appendUintArray: appendUint256Array,
    appendAddress: appendAddress,
    appendAddressArray: appendAddressArray,

    getRandomBytes: getRandomBytes,

    hexToBytes: hexToBytes,
    bytesToHex: bytesToHex
};
