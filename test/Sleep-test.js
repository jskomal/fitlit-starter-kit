import { expect } from 'chai'
import Sleep from '../src/Sleep'
import dayjs from 'dayjs'

describe.only('Sleep', () => {
  let sleep
  let userSleepData1
  let userSleepData2
  let userSleepData3
  let userSleepData4
  let userSleepData5
  let userSleepData6
  let userSleepData7
  let userSleepData8
  let testFilteredData

  beforeEach(() => {

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

    testFilteredData = { 1:[
      userSleepData1,
      userSleepData2,
      userSleepData3,
      userSleepData4,
      userSleepData5,
      userSleepData6,
      userSleepData7,
      userSleepData8
    ]}

    sleep = new Sleep(1, testFilteredData)
  })

  it('should be a function', function () {
    expect(Sleep).to.be.a('function')
  })

  it('should be an instantiation of the UserRepository class', () => {
    expect(sleep).to.be.an.instanceof(Sleep)
  })

  it('should have an id', () => {
    expect(sleep.userID).to.equal(1)
  })

  it('should hold all the users sleep information', () => {
    expect(sleep.sleepData).to.deep.equal([
      {date: dayjs('Jun 19 2019'), hoursSlept: 7.5, sleepQuality: 4.1},
      {date: dayjs('Jun 20 2019'), hoursSlept: 6.2, sleepQuality: 2.1},
      {date: dayjs('Jun 21 2019'), hoursSlept: 6.1, sleepQuality: 3.4},
      {date: dayjs('Jun 22 2019'), hoursSlept: 6.2, sleepQuality: 2.4},
      {date: dayjs('Jun 23 2019'), hoursSlept: 5.1, sleepQuality: 3.4},
      {date: dayjs('Jun 24 2019'), hoursSlept: 8.1, sleepQuality: 3},
      {date: dayjs('Jun 25 2019'), hoursSlept: 2.1, sleepQuality: 1},
      {date: dayjs('Jun 26 2019'), hoursSlept: 8, sleepQuality: 2.1}
    ])
  })

  it('Should have a method to return the average number of hours slept per day', () => {
    expect(sleep.getAvgSleepTime()).to.equal(6.16)
  })

  it('Should have a method to return a user\'s average sleep quality for all time', () => {
    expect(sleep.getAvgSleepQuality()).to.equal(2.69)
  })

  it('shoud have a method that takes in a date and returns the amount of sleep for that day', () => {
    expect(sleep.getSleepTimeByDate('Jun 23 2019')).to.equal(5.1)
  })

  it('shoud have a method that takes in a date and returns the quality of sleep for that day', () => {
    expect(sleep.getSleepQualityByDate('Jun 23 2019')).to.equal(3.4)
  })
});
