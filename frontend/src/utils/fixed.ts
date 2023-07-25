// Returns a string
export default function fixed(num: number, decimals=2) {
    return num.toFixed(decimals);
    // return Math.round(num,decimals).toFixed(decimals)
}