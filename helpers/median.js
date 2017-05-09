/*
    Return the median of an array of already sorted values
    Rounded to the inferior integer value
*/

module.exports = function(values) {
    if (values.length === 1) {
        return values[0];
    }

    const half = Math.floor(values.length / 2);
    if (values.length % 2) {
        return values[half];
    }
    return Math.floor((values[half - 1] + values[half]) / 2.0);
};
