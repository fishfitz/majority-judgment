const median = require('./helpers/median.js'),
    indexOfClosest = require('./helpers/indexOfClosest.js');

function substractOne(value, votes) {
    const votesMinusOne = [...votes];
    votesMinusOne.splice(indexOfClosest(value, votes), 1);
    return votesMinusOne;
}

function substractMedian(candidates) {
    return candidates
    .map(c => Object.assign({}, c, { votes: substractOne(c.tieNote, c.votes) }));
}

/*
    Sort candidates by median plus add their respective note
*/
function sortByMedian(candidates, firstCall) {
    return candidates
    .map(c => Object.assign({}, c, {
        note: firstCall ? median(c.votes) : c.note, // Store the first note as the real median note
        tieNote: median(c.votes) // This one will be used to break ties if necessary
    }))
    .sort((a, b) => b.tieNote - a.tieNote);
}

/*
    This function return an array of arrays:
    - Each array contains the candidates with the same note (candidate.tieNote)
    - There is a tie to break if there is more than one candidate in an array
*/
function clusterise(candidates) {
    const clusters = [];
    let currentCluster = [],
        lastNote = candidates[0].tieNote;

    candidates.forEach(c => {
        if (lastNote !== c.tieNote) {
            clusters.push(currentCluster);
            currentCluster = [];
        }
        currentCluster.push(c);
    });
    clusters.push(currentCluster);

    return clusters;
}

/*
    This is the main logical function of the programm
    It takes and return an array of arrays of candidates as returned by clusterise
    It breaks ties inside each cluster if it contains more than one candidate
*/
function sortAndClusterise(clusters, firstCall) {
    return clusters.map(candidates => {
        if (candidates.length === 1) {
            // No more tie there
            return [candidates];
        }

        if (!candidates[0].votes.length) {
            // Perfect tie...
            return candidates.map(c => [Object.assign({}, c, { perfectTie: true })]);
        }

        let candidatesToSort = [...candidates];
        if (!firstCall) {
            // Substract one vote from the median value to break ties
            candidatesToSort = substractMedian(candidates);
        }
        return clusterise(sortByMedian(candidatesToSort, firstCall));
    });
}

function dictatorship(dictator) {
    // Just add his note for consistency
    return [Object.assign({}, dictator, {
        note: median(dictator.votes),
        tieNote: median(dictator.votes),
        dictator: true
    })];
}

function rank(clusters, firstCall = true) {
    if (clusters.filter(c => c.length === 1).length === clusters.length) {
        // Terminal case
        if (firstCall) {
            // Only occurs if there is only one candidate
            return dictatorship(clusters[0][0]);
        }

        // Flatten the array and stop
        return [].concat(...clusters);
    }

    return rank([].concat(...(sortAndClusterise(clusters, firstCall))), false);
}

/*
    Takes an array of already sorted candidates, and just add them a property rank accordingly
    Most of its logic is for perfect tie handling
*/
function writeRanks(candidates) {
    let rank = 0;
    return candidates.map((c, i) => {
        let rankedCandidate = Object.assign({}, c, { rank });

        if (!c.perfectTie || (candidates[i + 1] && !candidates[i + 1].perfectTie)) {
            rank++;
        }

        return rankedCandidate;
    });
}

function majorityJudgment(rawCandidates) {
    // Sort all votes
    const candidates = rawCandidates.map(c => Object.assign({}, c, { votes: c.votes.sort() }));

    // Calculate rank and tieNote of each candidate
    return writeRanks(rank([candidates]));
}

module.exports = majorityJudgment;
