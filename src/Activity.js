import dayjs from 'dayjs'
import UserRepository from '../src/UserRepository'
import User from '../src/User'

class Activity {
  constructor(userID, activityData) {
    this.userID = userID
    this.activityData = activityData[userID].map((activityLogEntry) => {
      return {
        date: dayjs(activityLogEntry.date),
        numSteps: activityLogEntry.numSteps,
        minutesActive: activityLogEntry.minutesActive,
        flightsOfStairs: activityLogEntry.flightsOfStairs,
      }
    })
  }
  getMileageByDate(date) {
    const dateObj = this.activityData.find((activityLogEntry) => {
      return dayjs(date).isSame(activityLogEntry.date)
    })

    const strideLength = userRepo.find((user) => {
      return user.id === this.userID
    }).strideLength
    return strideLength
    // return parseFloat(
    //   (
    //     this.activityData.find((activityLogEntry) => {
    //       return dayjs(date).isSame(activityLogEntry.date)
    //     }).numSteps / 5280
    //   ).toFixed(2)
    // )
  }
}

export default Activity
