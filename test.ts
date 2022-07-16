import dayts from "./dayts.ts"
let d = dayts({day:15})
d = d.nextDay()
console.log(d)
console.log(d.format("yyyyMMdd"))
d = dayts()