// Exemple from the french wikipedia

const v = require('./genVotes.js'),
    majorityJudgment = require('../index.js'),
    assert = require('assert');

const candidates = [{
    id: 'A',
    votes: v(1484, 1763, 912, 1971, 2128, 1742)
},
{
    id: 'B',
    votes: v(2427, 1158, 1342, 1295, 2073, 1705)
}];

describe('Wikipedia fr case', () => {
    const sorted = majorityJudgment(candidates);

    it('should set A first', () => {
        assert.equal(sorted[0].id, 'A');
        assert.equal(sorted[0].rank, 0);
    });
    it('should set B second', () => {
        assert.equal(sorted[1].id, 'B');
        assert.equal(sorted[1].rank, 1);
    });
    it('should set a note of 3 for the first candidate', () => {
        assert.equal(sorted[0].note, 3);
    });
    it('should set a note of 3 for the second candidate', () => {
        assert.equal(sorted[1].note, 3);
    });
});
