export default function round(num:number, decimals=2) {
    try {
        return Number(num.toFixed(decimals))
    }
    catch {
        console.log('Error rounding number:',num)
        return num
    }
}