import { expect } from 'chai'
import Activity from '../src/Activity'
import ActivityRepository from '../src/ActivityRepository'
import dayjs from 'dayjs'

describe.only('Activity Repository', () => {
  let userActivityData1
  let userActivityData2
  let userActivityData3

  let activityUser1
  let activityUser2
  let activityUser3

  let activity1
  let activity2
  let activity3

  let testFilteredData
  let activityRepository

  beforeEach(() => {
    userActivityData1 = {
      date: '2019/06/15',
      numSteps: 3577,
      minutesActive: 140,
      flightsOfStairs: 16
    }

    userActivityData2 = {
      date: '2019/06/15',
      numSteps: 4294,
      minutesActive: 138,
      flightsOfStairs: 10
    }

    userActivityData3 = {
      date: '2019/06/15',
      numSteps: 7402,
      minutesActive: 116,
      flightsOfStairs: 33
    }

    activityUser1 = { 1: [userActivityData1] }
    activityUser2 = { 2: [userActivityData2] }
    activityUser3 = { 3: [userActivityData3] }

    activity1 = new Activity(1, activityUser1)
    activity2 = new Activity(2, activityUser2)
    activity3 = new Activity(3, activityUser3)

    testFilteredData = [activity1, activity2, activity3]
    activityRepository = new ActivityRepository(testFilteredData)
  })
  it('should be a function', () => {
    expect(ActivityRepository).to.be.a('function')
  })

  it('should be an instantiation of the UserRepository class', () => {
    expect(activityRepository).to.be.an.instanceof(ActivityRepository)
  })

  it('should hold all the user data', () => {
    expect(activityRepository.allActivityData).to.deep.equal(testFilteredData)
  })

  it('should have a method to calculate the average flights of stairs by date', () => {
    expect(activityRepository.getAllAvgStairsByDate('2019/06/15')).to.equal(19.67)
  })

  it('should have a method to calculate the average steps taken by date', () => {
    expect(activityRepository.getAllAvgStepsByDate('2019/06/15')).to.equal(5091)
  })

  it('should have a method to calculate the average minutes active by date', () => {
    expect(activityRepository.getAllAvgMinsActiveByDate('2019/06/15')).to.equal(131.33)
  })
})
