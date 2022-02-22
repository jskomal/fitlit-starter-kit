import dayjs from 'dayjs'
import { expect } from 'chai'
import Activity from '../src/Activity'


describe('Activity', () => {
  let userActivityData1
  let userActivityData2
  let userActivityData3
  let testActivityData
  let activityUser

  beforeEach(() => {
    userActivityData1 = {
      date: '2019/06/15',
      numSteps: 3577,
      minutesActive: 140,
      flightsOfStairs: 16 
    },
    userActivityData2 = {
      date: '2019/06/16',
      numSteps: 4294,
      minutesActive: 138,
      flightsOfStairs: 10 
    },
    userActivityData3 = {
      date: '2019/06/17',
      numSteps: 7402,
      minutesActive: 116,
      flightsOfStairs: 33 
    } 
    
    testActivityData = {1: [
      userActivityData1,
      userActivityData2,
      userActivityData3
    ]}

    activityUser = new Activity(1, testActivityData)
  })

  it('should be a function', () => {
    expect(Activity).to.be.a('function')
  })

  it('should instantiate the Activity class', () => {
    expect(activityUser).to.be.an.instanceof(Activity)
  })

  it('should have an id', () => {
    expect(activityUser.userID).to.equal(1)
  })

  it('should have a property that holds the activity data', () => {
    expect(activityUser.activityData).to.deep.equal([
      { 
        date: dayjs('2019/06/15'),
        numSteps: 3577,
        minutesActive: 140,
        flightsOfStairs: 16 
      }, 
      {
        date: dayjs('2019/06/16'),
        numSteps: 4294,
        minutesActive: 138,
        flightsOfStairs: 10 
      },
      {
        date: dayjs('2019/06/17'),
        numSteps: 7402,
        minutesActive: 116,
        flightsOfStairs: 33 
      }
    ])
  })

  it('should have a method to calculate a user\'s mileage by a date', () => {
    expect(activityUser.getMileageByDate('2019/06/17')).to.equal(6.03)
  })

  it('should have a method to return minutes active by date', () => {
    expect(activityUser.getMinutesActiveByDate('2019/06/16')).to.equal(138)
  })

  






})