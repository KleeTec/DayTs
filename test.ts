import dayts from "./dayts.ts"
let d = dayts({ day: 15 })
d = d.nextDay()
console.log(d)
console.log(d.format("yyyyMMdd"))
d = dayts()

d.nextDay(10)
console.log(d)
console.log()
console.log(d.date.getHours())
console.log(d.format("yyyy-MM-dd HH:mm:ss KK"))