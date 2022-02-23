import dayjs from 'dayjs'
import UserRepository from '../src/UserRepository'

class Activity {
  constructor(userID, activityData) {
    this.userID = userID
    this.activityData = activityData[userID].map((activityLogEntry) => {
      return {
        date: dayjs(activityLogEntry.date),
        numSteps: activityLogEntry.numSteps,
        minutesActive: activityLogEntry.minutesActive,
        flightsOfStairs: activityLogEntry.flightsOfStairs
      }
    })
  }
  getMileageByDate(user, date) {
    const steps = this.activityData.find((activityLogEntry) => {
      return dayjs(date).isSame(activityLogEntry.date)
    }).numSteps
    const strideLength = user.strideLength
    const miles = (strideLength * steps) / 5280
    const result = parseFloat(miles.toFixed(2))
    return result
  }
  getMinutesActiveByDate(date) {
    return this.activityData.find((activityLogEntry) => {
      return dayjs(date).isSame(activityLogEntry.date)
    }).minutesActive
  }
}

export default Activity
