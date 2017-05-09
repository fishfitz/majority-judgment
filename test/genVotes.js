/*
    Simple function to map arrays of arguments like [3, 2, 4] (read: 3 zero, 2 one, 4 two)
    Into corresponding array like [0, 0, 0, 1, 1, 2, 2, 2, 2]
*/

module.exports = function(...votes) {
    return [].concat(...(votes.map((numberOfVoters, note) => {
        return (new Array(numberOfVoters)).fill(note);
    })));
};
