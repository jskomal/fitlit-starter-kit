import { expect } from 'chai'
import Sleep from '../src/Sleep'
import SleepRepository from '../src/SleepRepository'
import dayjs from 'dayjs'

describe('Sleep Repository', () => {
  let sleep
  let sleepRepository
  let userSleepData1
  let userSleepData2
  let userSleepData3
  let userSleepData4
  let userSleepData5
  let userSleepData6
  let userSleepData7
  let userSleepData8
  let testFilteredData
  let userSleep1
  let userSleep2
  let userSleep3
  let userSleep4
  let sleep1
  let sleep2
  let sleep3
  let sleep4

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

    userSleep1 = {1: [
      userSleepData1,
      userSleepData2,
    ]}

    userSleep2 = {2: [
      userSleepData3,
    userSleepData4
    ]}

    userSleep3 = {3: [
    userSleepData5,
    userSleepData6
    ]}

    userSleep4 = {4: [
    userSleepData7,
    userSleepData8
    ]}


    sleep1 = new Sleep(1, userSleep1)
    sleep2 = new Sleep(2, userSleep2)
    sleep3 = new Sleep(3, userSleep3)
    sleep4 = new Sleep(4, userSleep4)
    testFilteredData = [sleep1, sleep2, sleep3, sleep4]
    sleepRepository = new SleepRepository(testFilteredData)
  })

  it('should be a function', function () {
    expect(SleepRepository).to.be.a('function')
  })

  it('should be an instantiation of the UserRepository class', () => {
    expect(sleepRepository).to.be.an.instanceof(SleepRepository)
  })

  it('should hold all the user data', () => {
    expect(sleepRepository.allSleepData).to.deep.equal(testFilteredData)
  })

  it('should have a method to return the average sleep quality for all users', () => {
    expect(sleepRepository.getAvgAllSleepQuality()).to.equal(2.69)
  })

});
