import { expect } from 'chai'
import User from '../src/Sleep'

describe('Sleep', () => {
  let user;
  let userData;
  let sleep

  it('should be a function', function () {
    expect(Sleep).to.be.a('function')
  })

  it('should be an instantiation of the UserRepository class', () => {
    expect(sleep).to.be.an.instanceof(Sleep)
  })

// For a user (identified by their userID), the average number of hours slept per day
// For a user, their average sleep quality per day over all time
// For a user, how many hours they slept for a specific day (identified by a date)
// For a user, their sleep quality for a specific day (identified by a date)
// For a user, how many hours slept each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week
// For a user, their sleep quality each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week
// For all users, the average sleep quality
