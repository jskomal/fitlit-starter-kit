import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

class Hydration {
  constructor(userID, filteredUserData) {
    this.userID = userID
    this.waterData = filteredUserData[userID].map((waterLogEntry) => {
      return {
        date: dayjs(waterLogEntry.date),
        numOunces: waterLogEntry.numOunces,
      }
    })
  }

  getAvgWater() {
    return parseFloat((this.waterData.reduce((acc, waterLogEntry) => {
      return acc + waterLogEntry.numOunces
    },0)/this.waterData.length).toFixed(2))
  }

  getWaterByDate(date) {
    return this.waterData.find(waterLogEntry => {
      return dayjs(date).isSame(waterLogEntry.date)
    }).numOunces
  }

  getWaterInWeek(date) {
    return this.waterData.filter(waterLogEntry => {
      return dayjs(date).isBetween(dayjs(date), dayjs(date).subtract(1, 'week'), null, '[]')
    }).map(waterLogEntry => waterLogEntry.numOunces)
  }
}

export default Hydration
