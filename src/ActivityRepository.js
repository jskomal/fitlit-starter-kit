import dayjs from 'dayjs'
import Activity from '../src/Activity'

class ActivityRepository {
  constructor(allActivityData) {
    this.allActivityData = allActivityData
  }
  getAllAvgStairsByDate(date) {
    const allFlightsByDate = []
    this.allActivityData.forEach((user) => {
      allFlightsByDate.push(
        user.activityData.find((activityLogEntry) => {
          return dayjs(date).isSame(activityLogEntry.date)
        }).flightsOfStairs
      )
    })
    const sum = allFlightsByDate.reduce((acc, currentFlights) => {
      return acc + currentFlights
    }, 0)
    return parseFloat((sum / this.allActivityData.length).toFixed(2))
  }
}

export default ActivityRepository
