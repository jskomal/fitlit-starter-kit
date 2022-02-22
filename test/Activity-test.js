import dayjs from 'dayjs'
import { expect } from 'chai'
import Activity from '../src/Activity'


describe('Activity', () => {
  let userActivityData1
  let userActivityData2
  let userActivityData3

  beforeEach(() => {
    userActivityData1 = {
      userID: 1,
      date: "2019/06/15",
      numSteps: 3577,
      minutesActive: 140,
      flightsOfStairs: 16 
    },
    userActivityData2 = {
      userID: 2,
      date: "2019/06/15",
      numSteps: 4294,
      minutesActive: 138,
      flightsOfStairs: 10 
    },
    userActivityData3 = {
      userID: 3,
      date: "2019/06/15",
      numSteps: 7402,
      minutesActive: 116,
      flightsOfStairs: 33 
    } 
  })







})