import { expect } from 'chai'
import User from '../src/User'

describe('User', () => {
  beforeEach(() => {
    const testUser = {
      id: 1,
      name: 'Luisa Hane',
      address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
      email: 'Diana.Hayes1@hotmail.com',
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [16, 4, 8],
    }

    const user = new User(testUser)
  })

  it('should be a function', () => {
    expect(User).to.be.a('function')
  })

  it('should instantiate the User class' () => {
    expect(user).to.be.an.instanceof(User)
  })
})
