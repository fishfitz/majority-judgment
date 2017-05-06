/*
    Return the median of an array of values
*/

module.exports = function(values) {
    if (values.length === 1) {
        return values[0];
    }

    let index = values.length / 2;
    if (index % 1 === 0) {
        // If index is an integer
        return values[index];
    }

    index = Math.floor(index);
    return Math.floor((values[index] + values[index + 1]) / 2);
};
