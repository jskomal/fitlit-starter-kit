import dayjs from 'dayjs'
import { expect } from 'chai'
import Activity from '../src/Activity'


describe('Activity', () => {
  let userActivityData1
  let userActivityData2
  let userActivityData3

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
  })

  it('should be a function', () => {
    expect(Activity).to.be.a('function')
  })

  it('should instantiate the Activity class', () => {
    expect(activityUser).to.be.an.instanceof(Activity)
  })






})