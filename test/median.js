// Test the rounded median function

const v = require('./genVotes.js'),
    median = require('../helpers/median.js'),
    assert = require('assert');

describe('Rounded median', function() {
    it('should return the median rounded to the inferior integer', () => {
        assert.equal(median([5, 10]), 7);
        assert.equal(median([1, 2, 3, 4, 5]), 3);
        assert.equal(median([0, 2, 3, 4, 23, 41, 56, 100]), 13);
    });
});
