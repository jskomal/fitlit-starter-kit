import dayjs from 'dayjs'
import { expect } from 'chai'
import Hydration from '../src/Hydration'

describe('Hydration', () => {
  let userHydrationData1
  let userHydrationData2
  let userHydrationData3
  let userHydrationData4
  let userHydrationData5
  let userHydrationData6
  let userHydrationData7
  let userHydrationData8
  let testFilteredData
  let hydratedUser

  beforeEach(() => {
    userHydrationData1 = {
      date: 'Jun 19 2019',
      numOunces: 85,
    }

    userHydrationData2 = {
      date: 'Jun 20 2019',
      numOunces: 69,
    }

    userHydrationData3 = {
      date: 'Jun 21 2019',
      numOunces: 54,
    }

    userHydrationData4 = {
      date: 'Jun 22 2019',
      numOunces: 41,
    }

    userHydrationData5 = {
      date: 'Jun 23 2019',
      numOunces: 37,
    }

    userHydrationData6 = {
      date: 'Jun 24 2019',
      numOunces: 75,
    }

    userHydrationData7 = {
        date: 'Jun 25 2019',
        numOunces: 47
    }

    userHydrationData8 = {
      date: 'Jun 26 2019',
      numOunces: 99,
    }

    testFilteredData = {1: [
      userHydrationData1,
      userHydrationData2,
      userHydrationData3,
      userHydrationData4,
      userHydrationData5,
      userHydrationData6,
      userHydrationData7,
      userHydrationData8
    ]}

    hydratedUser = new Hydration(1, testFilteredData)
  })

  it('should be a function', () => {
    expect(Hydration).to.be.a('function')
  })

  it('should instantiate the Hydration class', () => {
    expect(hydratedUser).to.be.an.instanceof(Hydration)
  })

  it('should have an id', () => {
    expect(hydratedUser.userID).to.equal(1)
  })

  it('should have an a property that holds the amount of water per day', () => {
    expect(hydratedUser.waterData).to.deep.equal([
      { date: dayjs('Jun 19 2019'), numOunces: 85 },
      { date: dayjs('Jun 20 2019'), numOunces: 69 },
      { date: dayjs('Jun 21 2019'), numOunces: 54 },
      { date: dayjs('Jun 22 2019'), numOunces: 41 },
      { date: dayjs('Jun 23 2019'), numOunces: 37 },
      { date: dayjs('Jun 24 2019'), numOunces: 75 },
      { date: dayjs('Jun 25 2019'), numOunces: 47 },
      { date: dayjs('Jun 26 2019'), numOunces: 99 },
    ])
  })

  it('should have a method to calculate the total average water consumption per day', () => {
    expect(hydratedUser.getAvgWater()).to.equal(63.38)
  })

  it('should have a method that takes in a date and returns the amount of water they consumed that day', () => {
    expect(hydratedUser.getWaterByDate('2019/06/25')).to.equal(47)
  })

  it('should have a method to return ounces of water drank per day over the course of a week', () => {
    expect(hydratedUser.getWaterInWeek('Jun 19 2019')).to.deep.equal([
      85, 69, 54, 41, 37, 75, 47,
    ])
  })
})
