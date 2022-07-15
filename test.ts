import dayts from "./dayts.ts"
let d = dayts()
d = d.nextDay()
console.log(d)
console.log(d.format("yyyyMMdd"))
