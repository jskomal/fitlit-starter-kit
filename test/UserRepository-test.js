import { expect } from 'chai'
import UserRepository from '../src/UserRepository'
import User from '../src/User'

describe('User Repository', () => {
  beforeEach(() => {
    const user1 = new User({
      id: 1,
      name: 'Luisa Hane',
      address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
      email: 'Diana.Hayes1@hotmail.com',
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [16, 4, 8],
    })
    const user2 = new User({
      id: 2,
      name: 'Jarvis Considine',
      address: '30086 Kathryn Port, Ciceroland NE 07273',
      email: 'Dimitri.Bechtelar11@gmail.com',
      strideLength: 4.5,
      dailyStepGoal: 5000,
      friends: [9, 18, 24, 19],
    })
    const user3 = new User({
      id: 3,
      name: 'Herminia Witting',
      address: '85823 Bosco Fork, East Oscarstad MI 85126-5660',
      email: 'Elwin.Tromp@yahoo.com',
      strideLength: 4.4,
      dailyStepGoal: 5000,
      friends: [19, 11, 42, 33],
    })

    const userData = [user1, user2, user3]

    const userRepository = new UserRepository(userData)
  })
  
  it('should be a function', function () {
    expect(UserRepository).to.be.a('function')
  })

  it('should be an instantiation of the UserRepository class', () => {
    expect(userData).to.be.an.instanceof(UserRepository)
  })

  it('should hold all of the user data in the repository' , () => {
    expect(userData.data).to.eql(userData)
  } )

  it('should have a method to return a user by id', () => {
    expect(userData.returnUserById(1)).to.eql({
      id: 1,
      name: 'Luisa Hane',
      address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
      email: 'Diana.Hayes1@hotmail.com',
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [16, 4, 8],
    })
  })

  
})
