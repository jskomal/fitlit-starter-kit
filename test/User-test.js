import { expect } from 'chai'
import User from '../src/User'

describe('User', () => {
  beforeEach(() => {
    const userData = {
      id: 1,
      name: 'Luisa Hane',
      address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
      email: 'Diana.Hayes1@hotmail.com',
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [16, 4, 8]
    }

    const user = new User(userData)
  })

  it('should be a function', () => {
    expect(User).to.be.a('function')
  })

  it('should instantiate the User class', () => {
    expect(user).to.be.an.instanceof(User)
  })

  it('should have an id', () => {
    expect(user.id).to.equal(1)
  })

  it('should have a name', () => {
    expect(user.name).to.equal('Lusia Hane')
  })

  it('should have an address', () => {
    expect(user.address).to.equal('15195 Nakia Tunnel, Erdmanport VA 19901-1697')
  })

  it('should have an email', () => {
    expect(user.email).to.equal('Diana.Hayes1@hotmail.com')
  })

  it('should have a strideLength' () => {
    expect(user.strideLength).to.equal(4.3)
  })

  it('should have a dailyStepGoal', () => {
    expect(user.dailyStepGoal).to.equal(10000)
  })

  it('should hold an array of friends', () => {
    expect(user.friends).to.deep.equal([16, 4, 8])
  })
})
