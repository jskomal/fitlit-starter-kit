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
  let testFilteredData
  let hydratedUser

  beforeEach(() => {
    userHydrationData1 = {
        date: '2019/06/15',
        numOunces: 85,
    }

    userHydrationData2 = {
        date: '2019/06/16',
        numOunces: 69,
    }

    userHydrationData3 = {
        date: '2019/06/17',
        numOunces: 54,
    }

    userHydrationData4 = {
        date: '2019/06/18',
        numOunces: 41,
    }

    userHydrationData5 = {
        date: '2019/06/19',
        numOunces: 37
    }

    userHydrationData6 = {
        date: '2019/06/20',
        numOunces: 75
    }

    userHydrationData7 = {
        date: '2019/06/21',
        numOunces: 47
    }

    testFilteredData = {1: [
      userHydrationData1,
      userHydrationData2,
      userHydrationData3,
      userHydrationData4,
      userHydrationData5,
      userHydrationData6,
      userHydrationData7,
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
      { date: dayjs('2019/06/15'), numOunces: 85 },
      { date: dayjs('2019/06/16'), numOunces: 69 },
      { date: dayjs('2019/06/17'), numOunces: 54 },
      { date: dayjs('2019/06/18'), numOunces: 41 },
      { date: dayjs('2019/06/19'), numOunces: 37 },
      { date: dayjs('2019/06/20'), numOunces: 75 },
      { date: dayjs('2019/06/21'), numOunces: 47 },
    ])
  })

  it('should have a method to calculate the total average water consumption per day', () => {
    expect(hydratedUser.getAvgWater()).to.equal(58.29)
  })

  it('should have a method that takes in a date and returns the amount of water they consumed that day', () => {
    expect(hydratedUser.getWaterByDate('2019/06/21')).to.equal(47)
  })

  it('should have a method to return ounces of water drank per day over the course of a week', () => {
    expect(hydratedUser.getWaterInWeek('2019/06/21')).to.deep.equal([
      85, 69, 54, 41, 37, 75, 47,
    ])
  })
})
