'use strict';

var expect = require('chai').expect;
var ansible = require('../index');
var BigNumber = require('bignumber.js');

describe('#ansible', function() {
    it('should get uint8s without offset', function() {
        var state = ansible.hexToBytes("01");
        expect(state.length).to.equal(1);
        var result = ansible.getUint8(state, 0);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should get uint8s with offset', function() {
        var state = ansible.hexToBytes("0001");
        var result = ansible.getUint8(state, 1);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should get uint16s without offset', function() {
        var state = ansible.hexToBytes("0001");
        var result = ansible.getUint16(state, 0);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should get uint32s without offset', function() {
        var state = ansible.hexToBytes("00000001");
        expect(state.length).to.equal(4);
        var result = ansible.getUint32(state, 0);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should get uint64s without offset', function() {
        var state = ansible.hexToBytes("0000000000000001");
        expect(state.length).to.equal(8);
        var result = ansible.getUint64(state, 0);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should get uint128s without offset', function() {
        var state = ansible.hexToBytes("00000000000000000000000000000001");
        expect(state.length).to.equal(16);
        var result = ansible.getUint128(state, 0);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should get uint256s without offset', function() {
        var state = ansible.hexToBytes("0000000000000000000000000000000000000000000000000000000000000001");
        expect(state.length).to.equal(32);
        var result = ansible.getUint256(state, 0);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should set uint8s without offset', function() {
        var state = ansible.hexToBytes("01");
        expect(state.length).to.equal(1);
        var result = ansible.getUint8(state, 0);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should set uint8s with offset', function() {
        var num = new BigNumber(1);
        var state = [];
        state = ansible.setUint8(state, num, 0)
        var result = ansible.getUint8(state, 0);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should set uint16s without offset', function() {
        var num = new BigNumber(1);
        var state = [];
        state = ansible.setUint16(state, num, 0)
        var result = ansible.getUint16(state, 0);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should convert uint32s without offset', function() {
        var num = new BigNumber(1);
        var state = [];
        state = ansible.setUint32(state, num, 0)
        var result = ansible.getUint32(state, 0);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should set uint64s without offset', function() {
        var num = new BigNumber(1);
        var state = [];
        state = ansible.setUint64(state, num, 0)
        var result = ansible.getUint64(state, 0);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should set uint128s without offset', function() {
        var num = new BigNumber(1);
        var state = [];
        state = ansible.setUint128(state, num, 0)
        var result = ansible.getUint128(state, 0);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should set uint256s without offset', function() {
        var num = new BigNumber(1);
        var state = [];
        state = ansible.setUint256(state, num, 0)
        var result = ansible.getUint256(state, 0);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should convert hex strings to bytes', function() {
        var state = ansible.hexToBytes("0000000000000000000000000000000000000000000000000000000000000001");
        expect(state.length).to.equal(32);
    });
    it('should set and get address without offset', function() {
        var address = 'ffffffffffffffffffffffffffffffffffffffff';
        var state = [];
        state = ansible.setAddress(state, address, 0)
        var result = ansible.getAddress(state, 0);

        expect(result).to.deep.equal(address);
    });

    it('should get/set uint8 array of big numbers without offset', function() {
        var state = [];
        var numbers = [new BigNumber(1), new BigNumber(2), new BigNumber(3)];
        ansible.setUint8Array(state, numbers, 0);
        var result = ansible.getUint8Array(state, numbers.length, 0);
        for (var i = 0; i < numbers.length; i++) {
            var res = result[i].toNumber();
            var num = numbers[i].toNumber();
            expect(num).to.equal(res);
        }
    });

    it('should get/set uint8 array of numbers without offset', function() {
        var state = [];
        var numbers = [1, 2, 3];
        ansible.setUint8Array(state, numbers, 0);
        var result = ansible.getUint8Array(state, numbers.length, 0);

        for (var i = 0; i < numbers.length; i++) {
            var num = numbers[i];
            var res = result[i];
            expect(num).to.equal(res.toNumber());
        }
    });

    it('should get/set address array without offset', function() {
        var state = [];
        var addresses = [
            'ffffffffffffffffffffffffffffffffffffffff',
            '0000000000000000000000000000000000000000',
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        ];
        ansible.setAddressArray(state, addresses, 0);
        var result = ansible.getAddressArray(state, addresses.length, 0);
        expect(result).deep.to.equal(addresses);
    });

    it('should get/set address array with offset', function() {
        var state = ansible.hexToBytes("01");
        var addresses = [
            'ffffffffffffffffffffffffffffffffffffffff',
            '0000000000000000000000000000000000000000',
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        ];
        ansible.setAddressArray(state, addresses, 1);
        var result = ansible.getAddressArray(state, addresses.length, 1);
        expect(result).deep.to.equal(addresses);
    });

    it('should append uint8s without offset', function() {
        var num = new BigNumber(1);
        var state = [];
        state = ansible.appendUint8(state, num);
        var result = ansible.getUint8(state, 0);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should append uint16s without offset', function() {
        var num = new BigNumber(1);
        var state = [];
        state = ansible.appendUint16(state, num);
        var result = ansible.getUint16(state, 0);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should append uint32s without offset', function() {
        var num = new BigNumber(1);
        var state = [];
        state = ansible.appendUint32(state, num);
        var result = ansible.getUint32(state, 0);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should append uint64s without offset', function() {
        var num = new BigNumber(1);
        var state = [];
        state = ansible.appendUint64(state, num);
        var result = ansible.getUint64(state, 0);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should append uint128s without offset', function() {
        var num = new BigNumber(1);
        var state = [];
        state = ansible.appendUint128(state, num);
        var result = ansible.getUint128(state, 0);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should append uint256s without offset', function() {
        var num = new BigNumber(1);
        var state = [];
        state = ansible.appendUint256(state, num)
        var result = ansible.getUint256(state, 0);
        expect(result.isEqualTo(1)).to.equal(true);
    });

    it('should append uint8s with offset', function() {
        var num = new BigNumber(1);
        var state = ansible.hexToBytes("02");
        state = ansible.appendUint8(state, num)
        var result = ansible.getUint8(state, 0);
        expect(result.isEqualTo(2)).to.equal(true);
        result = ansible.getUint8(state, 1);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should append uint16s with offset', function() {
        var num = new BigNumber(1);
        var state = ansible.hexToBytes("02");
        state = ansible.appendUint16(state, num)
        var result = ansible.getUint8(state, 0);
        expect(result.isEqualTo(2)).to.equal(true);
        result = ansible.getUint16(state, 1);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should append uint32s with offset', function() {
        var num = new BigNumber(1);
        var state = ansible.hexToBytes("02");
        state = ansible.appendUint32(state, num)
        var result = ansible.getUint8(state, 0);
        expect(result.isEqualTo(2)).to.equal(true);
        result = ansible.getUint32(state, 1);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should append uint64s with offset', function() {
        var num = new BigNumber(1);
        var state = ansible.hexToBytes("02");
        state = ansible.appendUint64(state, num)
        var result = ansible.getUint8(state, 0);
        expect(result.isEqualTo(2)).to.equal(true);
        result = ansible.getUint64(state, 1);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should append uint128s with offset', function() {
        var num = new BigNumber(1);
        var state = ansible.hexToBytes("02");
        state = ansible.appendUint128(state, num)
        var result = ansible.getUint8(state, 0);
        expect(result.isEqualTo(2)).to.equal(true);
        result = ansible.getUint128(state, 1);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should append uint256s with offset', function() {
        var num = new BigNumber(1);
        var state = ansible.hexToBytes("02");
        state = ansible.appendUint256(state, num)
        var result = ansible.getUint8(state, 0);
        expect(result.isEqualTo(2)).to.equal(true);
        result = ansible.getUint256(state, 1);
        expect(result.isEqualTo(1)).to.equal(true);
    });

});
