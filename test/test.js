'use strict';

var expect = require('chai').expect;
var ansible = require('../index');
var BigNumber = require('bignumber.js');

describe('#ansible', function() {
    it('should convert uint8s without offset', function() {
        var state = ansible.hexToBytes("01");
        expect(state.length).to.equal(1);
        var result = ansible.getUint8(state, 0);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should convert uint8s with offset', function() {
        var state = ansible.hexToBytes("0001");
        var result = ansible.getUint8(state, 1);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should convert uint16s without offset', function() {
        var state = ansible.hexToBytes("0001");
        var result = ansible.getUint16(state, 0);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should convert uint32s without offset', function() {
        var state = ansible.hexToBytes("00000001");
        expect(state.length).to.equal(4);
        var result = ansible.getUint32(state, 0);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should convert uint64s without offset', function() {
        var state = ansible.hexToBytes("0000000000000001");
        expect(state.length).to.equal(8);
        var result = ansible.getUint64(state, 0);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should convert uint128s without offset', function() {
        var state = ansible.hexToBytes("00000000000000000000000000000001");
        expect(state.length).to.equal(16);
        var result = ansible.getUint128(state, 0);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should convert uint256s without offset', function() {
        var state = ansible.hexToBytes("0000000000000000000000000000000000000000000000000000000000000001");
        expect(state.length).to.equal(32);
        var result = ansible.getUint256(state, 0);
        expect(result.isEqualTo(1)).to.equal(true);
    });
    it('should convert hex strings to bytes', function() {
        var state = ansible.hexToBytes("0000000000000000000000000000000000000000000000000000000000000001");
        expect(state.length).to.equal(32);
    });
});
