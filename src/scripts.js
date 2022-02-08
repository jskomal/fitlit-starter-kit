// An example of how you tell webpack to use a JS file
import userData from './data/users'
import UserRepository from './UserRepository'
import User from './User'
import {fetchUserData, fetchSleepData, fetchActivityData, fetchHydrationData} from './apiCalls'
// An example of how you tell webpack to use a CSS file
import './css/styles.css'
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/succulent.svg'
import './images/grey_waves.jpg'


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
// const users = userData.map((person) => {
//   return new User(person)
// })
// const userRepo = new UserRepository(users)

let users;
let userRepo;
let hydrationData;
let sleepData;
let activityData;


// functions
const fetchAllData = () => {
  Promise.all([fetchUserData(), fetchSleepData(), fetchActivityData(), fetchHydrationData()])
  .then(allData => parseAllData(allData))
}

const parseAllData = (allData) => {
  users = allData[0].userData.map(person => new User(person))
  userRepo = new UserRepository(users)
  hydrationData = allData[3].hydrationData
  sleepData = allData[1].sleepData
  activityData = allData[2].activityData
  displayRandomUser()
}

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
window.addEventListener('load', fetchAllData)

