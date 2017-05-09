// Exemple from the english wikipedia

const v = require('./genVotes.js'),
    majorityJudgment = require('../index.js'),
    assert = require('assert');

const candidates = [{
    id: 'memphis',
    votes: v(26 + 15 + 17, 0, 0, 42)
},
{
    id: 'nashville',
    votes: v(0, 15 + 17 + 42, 0, 26)
},
{
    id: 'chattanooga',
    votes: v(42, 26, 17, 15)
},
{
    id: 'knoxville',
    votes: v(42, 26, 15, 17)
}];

describe('Wikipedia en case', function() {
    const sorted = majorityJudgment(candidates);
    console.log(sorted.map(s => { delete s.votes; return s;}) );

    it('should set Nashville first with a note of 1', () => {
        assert.equal(sorted[0].id, 'nashville');
        assert.equal(sorted[0].rank, 0);
        assert.equal(sorted[0].note, 1);
    });
    it('should set Chattanooga second with a note of 1', () => {
        assert.equal(sorted[1].id, 'chattanooga');
        assert.equal(sorted[1].rank, 1);
        assert.equal(sorted[1].note, 1);
    });
    it('should set Knoxville third with a note of 1', () => {
        assert.equal(sorted[2].id, 'knoxville');
        assert.equal(sorted[2].rank, 2);
        assert.equal(sorted[2].note, 1);
    });
    it('should set Memphis last with a note of 0', () => {
        assert.equal(sorted[sorted.length - 1].id, 'memphis');
        assert.equal(sorted[sorted.length - 1].rank, sorted.length - 1);
        assert.equal(sorted[sorted.length - 1].note, 0);
    });
});
