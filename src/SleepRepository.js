import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)
import Sleep from '../src/Sleep'

class SleepRepository{
  constructor(allSleepData) {
    this.allSleepData = allSleepData;
  }
  getAvgAllSleepQuality() {
    return parseFloat((this.allSleepData.reduce((acc, currentUser) => {
      return acc + currentUser.getAvgSleepQuality()
    }, 0)/this.allSleepData.length).toFixed(2))
  }
}



// For all users, the average sleep quality

export default SleepRepository;
