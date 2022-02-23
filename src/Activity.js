import dayjs from 'dayjs'
import UserRepository from '../src/UserRepository'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

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

  getAvgActivityMinutesPerWeek(date) {
    const weeklyActivity = this.activityData.filter((activityLogEntry) => {
      return dayjs(activityLogEntry.date).isBetween(
        dayjs(date, 'MMM D YYYY').subtract(6, 'day'),
        dayjs(date, 'MMM D YYYY'),
        null,
        '[]'
      )
    })
    const mappedActivity = weeklyActivity.map((activityLogEntry) => {
      return activityLogEntry.minutesActive
    })
    const sum = mappedActivity.reduce((acc, currentMinutesActive) => {
      acc += currentMinutesActive
      return acc
    }, 0)
    return parseFloat((sum / 7).toFixed(2))
  }

  getDailyStepGoalReached(user, date) {
    const todaySteps = this.activityData.find((activityLogEntry) => {
      return dayjs(date).isSame(activityLogEntry.date)
    }).numSteps
    const stepGoal = user.dailyStepGoal
    return todaySteps >= stepGoal ? true : false
  }

  getExceededStepGoalDays(user) {
    const stepGoal = user.dailyStepGoal
    const result = this.activityData.filter((activityLogEntry) => {
      return activityLogEntry.numSteps >= stepGoal
    })
    return result
  }

  getAllTimeStairRecord() {
    const sortedFlights = this.activityData.sort(
      (a, b) => b.flightsOfStairs - a.flightsOfStairs
    )
    const mapFlights = sortedFlights.map(
      (activityLogEntry) => activityLogEntry.flightsOfStairs
    )
    return mapFlights[0]
  }
}

export default Activity
