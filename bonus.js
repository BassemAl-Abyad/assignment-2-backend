function findKthPositive(arr, k) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const missingCount = arr[mid] - (mid + 1);
        
        if (missingCount < k) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    const i = left - 1;

    if (i < 0) {
        return k;
    }

    const missingCountUpTo_i = arr[i] - (i + 1);
    const remainingSteps = k - missingCountUpTo_i;
    return arr[i] + remainingSteps;
}

console.log(`Example 1 Output: ${findKthPositive([2, 3, 4, 7, 11], 5)}`);
console.log(`Example 2 Output: ${findKthPositive([1, 2, 3, 4], 2)}`);