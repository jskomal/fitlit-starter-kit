import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)
import datepicker from 'js-datepicker'
import UserRepository from './UserRepository'
import User from './User'
import {
  fetchUserData,
  fetchSleepData,
  fetchActivityData,
  fetchHydrationData,
} from './apiCalls'

import './css/styles.css'

import './images/succulent.svg'
import './images/grey_waves.jpg'
import Hydration from './Hydration'

// query selectors
const welcomeUser = document.querySelector('#welcomeName')

// user card
const userName = document.querySelector('#name')
const userAddress = document.querySelector('#address')
const userEmail = document.querySelector('#email')
const userStrideLength = document.querySelector('#strideLength')
const userDailyStepGoal = document.querySelector('#dailyStepGoal')
const compareUserSteps = document.querySelector('#compareStepGoal')

// hydration card
const userWaterToday = document.querySelector('#waterToday')
const userWaterThisWeek = document.querySelector('#waterThisWeek')

//globals
let users
let userRepo
let hydrationData
let sleepData
let activityData

const datePicker = datepicker('#calendar', {
  startDate: new Date(2019, 5, 15),
  minDate: new Date(2019, 5, 15),
  maxDate: new Date(2020, 0, 22),
})

// functions
const fetchAllData = () => {
  Promise.all([
    fetchUserData(),
    fetchSleepData(),
    fetchActivityData(),
    fetchHydrationData(),
  ]).then((allData) => parseAllData(allData))
}

const parseHydrationData = (hydrationData) => {
  // input is unfliltered Data
  // need to filter data into only like userIDs
  // then instantiate class on each of those filtered datasets
  const filteredData = {}
  const hydrationUsers = []
  hydrationData.forEach((waterLogEntry) => {
    if (waterLogEntry.userID in filteredData) {
      filteredData[waterLogEntry.userID].push({
        date: waterLogEntry.date,
        numOunces: waterLogEntry.numOunces,
      })
    } else {
      filteredData[waterLogEntry.userID] = [
        {
          date: waterLogEntry.date,
          numOunces: waterLogEntry.numOunces,
        }
      ]
    }
  })
  console.log(filteredData)
  Object.keys(filteredData).forEach(userID => {
    hydrationUsers.push(new Hydration(userID, filteredData))
  })
  console.log(hydrationUsers)
  // const hydratedClassUsers = new Hydration(filteredData)
}

const parseAllData = (allData) => {
  users = allData[0].userData.map((person) => new User(person))
  userRepo = new UserRepository(users)
  hydrationData = allData[3].hydrationData
  parseHydrationData(hydrationData)
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

const updateUserCard = (randomUser) => {
  welcomeUser.innerText = `Welcome, ${randomUser.returnFirstName()}!`
  userName.innerText = `NAME: ${randomUser.name}`
  userAddress.innerText = `ADDRESS: ${randomUser.address}`
  userEmail.innerText = `EMAIL: ${randomUser.email}`
  userStrideLength.innerText = `STRIDE LENGTH: ${randomUser.strideLength}`
  userDailyStepGoal.innerText = `DAILY STEP GOAL: ${randomUser.dailyStepGoal}`
  compareUserSteps.innerText = `Your step goal is ${
    (randomUser.dailyStepGoal / userRepo.returnAvgSteps()).toFixed(2) * 100
  }% of the average goal of ${userRepo.returnAvgSteps()}`
}

const updateHydrationCard = (randomUser) => {}

const displayRandomUser = () => {
  const randomUser = selectRandomUser()
  updateUserCard(randomUser)
  updateHydrationCard(randomUser)
}

// event listeners
window.addEventListener('load', fetchAllData)
