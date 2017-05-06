const majorityJudgment = require('../index.js');

function v(...votes) {
    return [].concat(...(votes.reverse().map((numberOfVoters, note) => {
        return (new Array(numberOfVoters)).fill(note);
    })));
}

/*
// Exemple from the french wikipedia
const candidates = [{
    id: 'a',
    votes: v(1742, 2128, 1971, 912, 1763, 1484)
},
{
    id: 'b',
    votes: v(1705, 2073, 1295, 1342, 1158, 2427)
}];
*/

/*
// Exemple from the english wikipedia
const candidates = [{
    id: 'memphis',
    votes: v(42, 0, 0, 58)
},
{
    id: 'nashville',
    votes: v(26, 42, 32, 0)
},
{
    id: 'chattanooga',
    votes: v(15, 43, 42, 0)
},
{
    id: 'knoxville',
    votes: v(17, 15, 26, 42)
}];
*/

const sorted = majorityJudgment(candidates);
console.log(sorted.map(c => {
    delete c.votes;
    return c;
}));
