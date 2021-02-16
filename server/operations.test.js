const assert = require('assert');
const operations = require('./operations');


describe('Operation tests', function () {
    it('should multiply two numbers', function () {
        let expected = 15;
        let result = operations.multiply(3, 5);

        assert.strictEqual(result, expected)
    });

    it('should multiply two nums async', function (done) {
        let expected = 15;
        operations.multiplyAsync(3,5, function (result) {
            if(expected !== result) {
                throw new Error(`Expected ${expected} but got ${result}`)
            }
            done();
        })
    });

    it('should add string', function () {
        let str = 'kiskis';
        let expected = str + ' Kiska';
        let result = operations.stringAdd(str);

        assert.strictEqual(expected, result, 'Nihuja ti baklajan')
    });
});
