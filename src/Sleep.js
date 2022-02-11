import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

class Sleep {
  constructor(userID, sleepData) {
    this.userID = userID;
    this.sleepData = sleepData[userID].map((sleepLogEntry) => {
      return {
        date: dayjs(sleepLogEntry.date),
        hoursSlept: sleepLogEntry.hoursSlept,
        sleepQuality: sleepLogEntry.sleepQuality
      }
    })
  }
  getAvgSleepTime() {
    return parseFloat((this.sleepData.reduce((acc, sleepLogEntry) => {
      return acc + sleepLogEntry.hoursSlept
    },0)/this.sleepData.length).toFixed(2))
  }
  getAvgSleepQuality() {
    return parseFloat((this.sleepData.reduce((acc, sleepLogEntry) => {
      return acc + sleepLogEntry.sleepQuality
    },0)/this.sleepData.length).toFixed(2))
  }
  getSleepTimeByDate(date) {
    return this.sleepData.find(sleepLogEntry => {
      return dayjs(date).isSame(sleepLogEntry.date)
    }).hoursSlept
  }
  getSleepQualityByDate(date) {
    return this.sleepData.find(sleepLogEntry => {
      return dayjs(date).isSame(sleepLogEntry.date)
    }).sleepQuality
  }
  getSleepTimeInWeek(date){
    return this.sleepData.filter(sleepLogEntry => {
      return dayjs(date).isBetween(
        dayjs(sleepLogEntry.date, 'MMM D YYYY'),
        dayjs(sleepLogEntry.date, 'MMM D YYYY').subtract(1, 'week'),
        null,
        '[)'
      )
    }).map(sleepLogEntry => sleepLogEntry.hoursSlept)
  }
}


export default Sleep;

// For a user, how many hours slept each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week
// For a user, their sleep quality each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week
// For all users, the average sleep quality
