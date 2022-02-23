import dayjs from 'dayjs'


class Activity {
  constructor(userID, activityData) {
    this.userID = userID;
    this.activityData = activityData[userID].map((activityLogEntry) => {
      return {
        date: dayjs(activityLogEntry.date),
        numSteps: activityLogEntry.numSteps,
        minutesActive: activityLogEntry.minutesActive,
        flightsOfStairs: activityLogEntry.flightsOfStairs,
    }
   })
  }



}



export default Activity