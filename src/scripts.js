// An example of how you tell webpack to use a JS file
import userData from './data/users'
import UserRepository from './UserRepository'
import User from './User'
// An example of how you tell webpack to use a CSS file
import './css/styles.css'
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// query selectors
const welcomeUser = document.querySelector('#welcomeName')

// user card
const userName = document.querySelector('#name')
const userAddress = document.querySelector('#address')
const userEmail = document.querySelector('#email')
const userStrideLength = document.querySelector('#strideLength')
const userDailyStepGoal = document.querySelector('#dailyStepGoal')
const compareUserSteps =  document.querySelector('#compareStepGoal')
//globals
const users = userData.map((person) => {
  return new User(person)
})
const userRepo = new UserRepository(users)

// functions
const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length)
}

const selectRandomUser = () => {
  const randomIndex = getRandomIndex(users)
  return users[randomIndex]
}

const displayRandomUser = () => {
  const randomUser = selectRandomUser()
  welcomeUser.innerText = `Welcome, ${randomUser.returnFirstName()}!`
  userName.innerText = `NAME: ${randomUser.name}`
  userAddress.innerText = `ADDRESS: ${randomUser.address}`
  userEmail.innerText = `EMAIL: ${randomUser.email}`
  userStrideLength.innerText = `STRIDE LENGTH: ${randomUser.strideLength}`
  userDailyStepGoal.innerText = `DAILY STEP GOAL: ${randomUser.dailyStepGoal}`
  compareUserSteps.innerText = `Your step goal is ${((randomUser.dailyStepGoal/userRepo.returnAvgSteps()).toFixed(2))*100}% of the average goal of ${userRepo.returnAvgSteps()}`
}



// event listeners
window.addEventListener('load', displayRandomUser)


