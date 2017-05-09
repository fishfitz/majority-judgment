# Majority judgment

This is an implementation of the majority voting-system.

*Majority judgment is a single-winner voting system proposed by Michel Balinski and Rida Laraki. Voters freely grade each candidate in one of several named ranks, for instance from "excellent" to "bad", and the candidate with the highest median grade is the winner. If more than one candidate has the same median grade, a tiebreaker is used which sees the "closest to median" grade.*

More details, see [Wikipedia](https://en.wikipedia.org/wiki/Majority_judgment).

## Implementation details

The original voting-system only provides a single winner. For convenience, this implementation additionally sorts all other candidates using the same method.

The tiebreaker process is described below:

*If several candidates share the same median grade, all other candidates are eliminated. Then, one copy of that grade is removed from each remaining candidate's list of grades (if there is none, the closest grade), and the new median is found, until there is an unambiguous winner.*

**Important note:** this library currently does not perform any sanity check of the provided data. You must ensure yourself that your votes are correct.

## Install
`npm install majority-judgment --save`

## Test
Using [mocha](https://mochajs.org/), in devDependencies:

`npm run test`

## API

The module exposes a single function, taking an array of candidates.

Candidate should be an object with at least the property `votes`. `votes` should be an array of integers, and must have the same length for each candidate.

You probably also want an `id` property to distinguish candidates.

It returns a copy of the provided array, sorted according to the judgment, and with additional keys.

```javascript
{
    votes: [],
    note: Number, // The obtained median value
    tieNote: Number, // The last median used for the tiebreaker,
    rank: Number, // Position given by the majority judgment, starts from 0 (winner)
    perfectTie: Boolean // true if the tie is impossible to break for this candidate, undefined otherwise
    dictator: Boolean // true if only one candidate was provided, undefined otherwise
}
```

## Example
```javascript
const candidates = [{
    id: 'a',
    votes: [0, 0, 0, 1, 1, 2]
},
{
    id: 'b',
    votes: [0, 1, 1, 1, 1, 2]
}];

console.log(majorityJudgment(candidates));

/* =>
[{
        id: 'b',
        votes: [0, 1, 1, 1, 2],
        note: 1,
        tieNote: 1,
        rank: 0
    },
    {
        id: 'a',
        votes: [0, 0, 0, 1, 2],
        note: 1,
        tieNote: 0,
        rank: 1
    }
]
*/
```
