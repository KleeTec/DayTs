import * as dateTime from "https://deno.land/std@0.67.0/datetime/mod.ts"
interface customDate {
	date?: Date
	millisecond?: number
	second?: number
	minute?: number
	hour?: number
	day?: number
	month?: number
	year?: number
}

class DayTs {
	date: Date
	millisecond: number
	second: number
	minute: number
	hour: number
	day: number
	dayOfWeek: number
	month: number
	year: number

	constructor(cDate: customDate | undefined) {
		this.date = new Date()
		if (cDate?.date) this.date = cDate.date
		if (cDate?.millisecond) this.date.setMilliseconds(cDate.millisecond)
		if (cDate?.second) this.date.setSeconds(cDate.second)
		if (cDate?.minute) this.date.setMinutes(cDate.minute)
		if (cDate?.hour) this.date.setHours(cDate.hour)
		if (cDate?.day) this.date.setDate(cDate.day)
		if (cDate?.month) this.date.setMonth(cDate.month)
		if (cDate?.year) this.date.setFullYear(cDate.year)
		this.millisecond = this.date.getMilliseconds()
		this.second = this.date.getSeconds()
		this.minute = this.date.getMinutes()
		this.hour = this.date.getHours()
		this.day = this.date.getDate()
		this.dayOfWeek = this.date.getDay()
		this.month = this.date.getMonth()
		this.year = this.date.getFullYear()
	}

	// why not... just use a library :)
	/**
	 * Parse date from string using format string
	 * @param dateString Date string
	 * @param formatString Format string
	 * @return Parsed date
	 */
	parse(dateString: string, formatString: string): DayTs {
		this.date = dateTime.parse(dateString, formatString)
		this.millisecond = this.date.getMilliseconds()
		this.second = this.date.getSeconds()
		this.minute = this.date.getMinutes()
		this.hour = this.date.getHours()
		this.day = this.date.getDate()
		this.dayOfWeek = this.date.getDay()
		this.month = this.date.getMonth()
		this.year = this.date.getFullYear()
		return this
	}

	/**
	  * Format date using format string
	  * @param formatString Format string
	  * @return formatted date string
	  */
	format(formatString: string): string {
		return dateTime.format(this.date, formatString)
	}
	// forward in time
	nextMillisecond(): DayTs {
		if (this.millisecond++ >= 1000) {
			this.nextSecond()
			this.millisecond = 0
		}
		this.date.setMilliseconds(this.millisecond)
		return this
	}
	nextSecond(): DayTs {
		if (this.second++ >= 60) {
			this.nextMinute()
			this.second = 0
		}
		this.date.setSeconds(this.second)
		return this
	}
	nextMinute(): DayTs {
		if (this.minute++ >= 60) {
			this.nextHour()
			this.minute = 0
		}
		this.date.setMinutes(this.minute)
		return this
	}
	nextHour(): DayTs {
		if (this.hour++ >= 24) {
			this.nextDay()
			this.hour = 0
		}
		this.date.setHours(this.hour)
		return this
	}
	nextDay(): DayTs {
		if (this.day++ > daysPerMonth(this.month, this.year)) {
			this.nextDayOfWeek()
			this.nextMonth()
			this.day = 1
		}
		this.date.setDate(this.day)
		return this
	}
	private nextDayOfWeek() {
		if (this.dayOfWeek++ > 7) this.dayOfWeek = 1
	}
	nextMonth(): DayTs {
		if (this.month++ > 12) {
			this.nextYear()
			this.month = 1
		}
		this.date.setMonth(this.month)
		return this
	}
	nextYear(): DayTs {
		this.year++
		this.date.setFullYear(this.year)
		return this
	}
	// back in time
	lastMillisecond(): DayTs {
		if (this.millisecond-- < 0) {
			this.lastSecond()
			this.millisecond = 999
		}
		this.date.setMilliseconds(this.millisecond)
		return this
	}
	lastSecond(): DayTs {
		if (this.second-- < 0) {
			this.lastMinute()
			this.second = 59
		}
		this.date.setSeconds(this.second)
		return this
	}
	lastMinute(): DayTs {
		if (this.minute-- < 0) {
			this.lastHour()
			this.minute = 59
		}
		this.date.setMinutes(this.minute)
		return this
	}
	lastHour(): DayTs {
		if (this.hour-- < 0) {
			this.lastDay()
			this.hour = 23
		}
		this.date.setHours(this.hour)
		return this
	}
	lastDay(): DayTs {
		if (this.day-- < 1) {
			this.lastMonth()
			this.lastDayOfWeek()
			this.day = daysPerMonth(this.month, this.year)
		}
		this.date.setDate(this.day)
		return this
	}
	private lastDayOfWeek() {
		if (this.dayOfWeek-- < 1) this.dayOfWeek = 7
	}
	lastMonth(): DayTs {
		if (this.month-- < 1) {
			this.lastYear()
			this.month = 12
		}
		this.date.setMonth(this.month)
		return this
	}
	lastYear(): DayTs {
		this.year--
		this.date.setFullYear(this.year)
		return this
	}
}

function daysPerMonth(month: number, year: number): number {
	switch (month) {
		case 1:
			return 31
		case 2:
			if (year % 4 === 0 && year % 100 !== 0) return 29
			else return 28
		case 3:
			return 31
		case 4:
			return 30
		case 5:
			return 31
		case 6:
			return 30
		case 7:
			return 31
		case 8:
			return 31
		case 9:
			return 30
		case 10:
			return 31
		case 11:
			return 30
		case 12:
			return 31
	}
	return 0
}

export default function dayts(date?: customDate) {
	return new DayTs(date)
}