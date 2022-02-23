import { expect } from 'chai'
import Activity from '../src/Activity'
import ActivityRepository from '../src/ActivityRepository'
import dayjs from 'dayjs'

describe('Activity Repository', () => {
  let activityUser1;
  let activityUser2;
  let activityUser3;

  let activityRepository

  let userActivityData1
  let userActivityData2
  let userActivityData3

  let testActivityData

  let testFilteredData

  beforeEach (() => {
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
    },

    testActivityData = [{
      1: [userActivityData1],
      2: [userActivityData2],
      3: [userActivityData3]
    }]


    activityUser1 = new Activity(1, userActivityData1)
    activityUser2 = new Activity(2, userActivityData2)
    activityUser3 = new Activity(3, userActivityData3)
    testFilteredData = [activityUser1, activityUser2, activityUser3]
    activityRepository = new ActivityRepository(testFilteredData)
  
  })
  it('should be a function', () => {
    expect(ActivityRepository).to.be.a('function')
  })

  it('should be an instantiation of the UserRepository class', () => {
    expect(activityRepository).to.be.an.instanceof(ActivityRepository)
  })

  it('should hold all the user data', () => {
    expect(activityRepository.allActivityData).to.deep.equal(testActivityData)
  })

  it('should have a method to calculate the average flights of stairs by date', () => {
    expect(activityRepository.getAllAvgStairsByDate('2019/06/15')).to.equal(19.67)
  })

  it('should have a method to calculate the average steps taken by date', () => {
    expect(activityRepository.getAllAvgStepsByDate('2019/06/15')).to.equal(5090.33)
  })

  it('should have a method to calculate the average minutes active by date', () => {
    expect(activityRepository.getAllAvgMinsActiveByDate('2019/06/15')).to.equal(148)
  })
})

