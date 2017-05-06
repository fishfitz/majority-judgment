/*
    Return the index of the closest element from value in array
    Use dichotomia search
*/

module.exports = function(value, array) {
    let low = 0,
        high = array.length - 1;

    while (low < high) {
        let mid = (low + high) / 2 | 0,
            d1 = Math.abs(array[mid] - value),
            d2 = Math.abs(array[mid + 1] - value);
        if (d2 <= d1) {
            low = mid + 1;
        }
        else {
            high = mid;
        }
    }

    return high;
};
