import { expect } from 'chai'
import User from '../src/User'
import Hydration from '../src/Hydration'

describe('Hydration', () => {
  let user
  let userData
  let userHydrationData1
  let userHydrationData2
  let userHydrationData3
  let testFilteredData
  let hydratedUser

  beforeEach(() => {
    userData = {
      id: 1,
      name: 'Luisa Hane',
      address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
      email: 'Diana.Hayes1@hotmail.com',
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [16, 4, 8],
    }

    user = new User(userData)

    userHydrationData1 = {
      userID: 1,
      date: '2019/06/15',
      numOunces: 85,
    }

    userHydrationData2 = {
      userID: 1,
      date: '2019/06/16',
      numOunces: 69,
    }

    userHydrationData3 = {
      userID: 1,
      date: '2019/06/22',
      numOunces: 54,
    }

    testFilteredData = [userHydrationData1, userHydrationData2, userHydrationData3]

    hydratedUser = new Hydration(testFilteredData)
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
      { '2019/06/15': 85 },
      { '2019/06/16': 69 },
      { '2019/06/22': 54 },
    ])
  })

  it('should have a method to calculate the total average water consumption per day', () => {
    expect(hydratedUser.getAvgWater()).to.equal(69.33)
  })

  it('should have a method that takes in a date and returns the amount of water they consumed that day', () => {
    expect(hydratedUser.getWaterByDate('2019/06/22')).to.equal(54)
  })
})
