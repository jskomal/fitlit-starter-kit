import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

class Hydration {
  constructor(userID, filteredUserData) {
    this.userID = userID
    this.waterData = filteredUserData[userID].map((waterLogEntry) => {
      return {
        date: dayjs(waterLogEntry.date),
        numOunces: waterLogEntry.numOunces
      }
    })
  }

  getAvgWater() {
    return parseFloat(
      (
        this.waterData.reduce((acc, waterLogEntry) => {
          return acc + waterLogEntry.numOunces
        }, 0) / this.waterData.length
      ).toFixed(2)
    )
  }

  getWaterByDate(date) {
    return this.waterData.find((waterLogEntry) => {
      return dayjs(date).isSame(waterLogEntry.date)
    }).numOunces
  }

  getWaterInWeek(date) {
    const weeklyWater = this.waterData.filter((waterLogEntry) => {
      return dayjs(waterLogEntry.date).isBetween(
        dayjs(date, 'MMM D YYYY').subtract(6, 'day'),
        dayjs(date, 'MMM D YYYY'),
        null,
        '[]'
      )
    })
    const mapped = weeklyWater.map((waterLogEntry) => waterLogEntry.numOunces)
    if (mapped.length > 7) mapped.pop()
    return mapped.reverse()
  }
}

export default Hydration
