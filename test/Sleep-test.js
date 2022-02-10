import { expect } from 'chai'
import Sleep from '../src/Sleep'

describe.only('Sleep', () => {
  let user;
  let userData;
  let sleep

  beforeEach(() => {
    sleep = new Sleep()
    userSleepData1 = {
      date: 'Jun 19 2019',
      hoursSlept: 7.5,
      sleepQuality: 4.1,
    }

    userSleepData2 = {
      date: 'Jun 20 2019',
      hoursSlept: 6.2,
      sleepQuality: 2.1,
    }

    userSleepData3 = {
      date: 'Jun 21 2019',
      hoursSlept: 6.1,
      sleepQuality: 3.4,
    }

    userSleepData4 = {
      date: 'Jun 22 2019',
      hoursSlept: 6.2,
      sleepQuality: 2.4,
    }

    userSleepData5 = {
      date: 'Jun 23 2019',
      hoursSlept: 5.1,
      sleepQuality: 3.4,
    }

    userSleepData6 = {
      date: 'Jun 24 2019',
      hoursSlept: 8.1,
      sleepQuality: 3,
    }

    userSleepData7 = {
        date: 'Jun 25 2019',
        hoursSlept: 2.1,
        sleepQuality: 1,
    }

    userSleepData8 = {
      date: 'Jun 26 2019',
      hoursSlept: 8,
      sleepQuality: 2.1,
    }
  })

  it('should be a function', function () {
    expect(Sleep).to.be.a('function')
  })

  it('should be an instantiation of the UserRepository class', () => {
    let sleep = new Sleep()
    expect(sleep).to.be.an.instanceof(Sleep)
  })

  it('should have an id', () => {
    let sleep = new Sleep()
    expect(sleep).
  })

});
// For a user (identified by their userID), the average number of hours slept per day
// For a user, their average sleep quality per day over all time
// For a user, how many hours they slept for a specific day (identified by a date)
// For a user, their sleep quality for a specific day (identified by a date)
// For a user, how many hours slept each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week
// For a user, their sleep quality each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week
// For all users, the average sleep quality
