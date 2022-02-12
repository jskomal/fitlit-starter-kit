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
    const qqq = this.sleepData.filter(sleepLogEntry => {
      return dayjs(date).isBetween(
        dayjs(sleepLogEntry.date, 'MMM D YYYY').subtract(6, 'day'),
        dayjs(sleepLogEntry.date, 'MMM D YYYY'),
        null,
        '[]'
      )
    }).map(sleepLogEntry => sleepLogEntry.hoursSlept)
    console.log(qqq)
    return qqq
  }

  getSleepQualityInWeek(date){
    const zzz = this.sleepData.filter(sleepLogEntry => {
      return dayjs(date).isBetween(
        dayjs((sleepLogEntry.date), 'MMM D YYYY').subtract(6, 'day'),
        dayjs(sleepLogEntry.date, 'MMM D YYYY'),
        null,
        '[]'
      )
    }).map(sleepLogEntry => sleepLogEntry.sleepQuality)
    console.log(zzz)
    return zzz
  }
}
// on change
// .active event listeners?

export default Sleep;
